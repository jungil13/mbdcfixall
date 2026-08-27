import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import {
  sendAdminInquiryNotification,
  sendUserInquiryConfirmation,
  InquiryEmailData,
} from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const trimmedData: InquiryEmailData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      service: service || null,
      message: message.trim(),
    }

    const { error } = await supabase.from('inquiries').insert({
      name: trimmedData.name,
      email: trimmedData.email,
      phone: trimmedData.phone,
      service: trimmedData.service,
      message: trimmedData.message,
    })

    if (error) {
      console.error('[Supabase] insert error:', error.message)
      return NextResponse.json(
        { error: 'Failed to save your inquiry. Please try again.' },
        { status: 500 }
      )
    }

    // Send emails in background (both to user confirmation and admin notification)
    try {
      const results = await Promise.allSettled([
        sendAdminInquiryNotification(trimmedData),
        sendUserInquiryConfirmation(trimmedData),
      ])

      results.forEach((res, index) => {
        const recipient = index === 0 ? 'Admin' : 'User'
        if (res.status === 'rejected') {
          console.error(`[Email] Error sending to ${recipient}:`, res.reason)
        } else if (res.value && !('reason' in res.value)) {
          console.log(`[Email] Successfully sent to ${recipient}`)
        }
      })
    } catch (mailErr) {
      console.error('[Email] Unexpected mail dispatch error:', mailErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[API] /api/contact error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

