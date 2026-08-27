import nodemailer from 'nodemailer'

export interface InquiryEmailData {
  name: string
  email: string
  phone?: string | null
  service?: string | null
  message: string
}

function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT || '465', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    console.warn('[Email] SMTP credentials not configured (SMTP_USER / SMTP_PASS). Skipping email dispatch.')
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587 / other ports
    auth: {
      user,
      pass,
    },
  })
}

/**
 * Sends a notification email to the business admin with the customer's inquiry details.
 */
export async function sendAdminInquiryNotification(data: InquiryEmailData) {
  const transporter = getTransporter()
  if (!transporter) return { success: false, reason: 'SMTP_NOT_CONFIGURED' }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
  const senderEmail = process.env.SMTP_USER

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #121212; color: #ffffff; margin: 0; padding: 20px; }
        .card { background-color: #1a1a1a; border: 1px solid #333333; border-radius: 8px; max-width: 600px; margin: 0 auto; overflow: hidden; }
        .header { background-color: #E8A020; color: #111111; padding: 20px 24px; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
        .content { padding: 24px; color: #e0e0e0; line-height: 1.6; }
        .field-group { margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; }
        .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #E8A020; font-weight: 700; margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #ffffff; }
        .message-box { background-color: #222222; border-left: 3px solid #E8A020; padding: 14px; margin-top: 8px; border-radius: 4px; white-space: pre-wrap; font-size: 14px; }
        .footer { padding: 16px 24px; font-size: 12px; color: #777777; text-align: center; border-top: 1px solid #282828; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>New Website Inquiry Received</h1>
        </div>
        <div class="content">
          <div class="field-group">
            <div class="field-label">Customer Name</div>
            <div class="field-value">${escapeHtml(data.name)}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${escapeHtml(data.email)}" style="color: #E8A020; text-decoration: none;">${escapeHtml(data.email)}</a></div>
          </div>
          <div class="field-group">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${escapeHtml(data.phone || 'Not provided')}</div>
          </div>
          <div class="field-group">
            <div class="field-label">Service Requested</div>
            <div class="field-value">${escapeHtml(data.service || 'General Inquiry')}</div>
          </div>
          <div class="field-group" style="border-bottom: none;">
            <div class="field-label">Project Description / Message</div>
            <div class="message-box">${escapeHtml(data.message)}</div>
          </div>
        </div>
        <div class="footer">
          Sent automatically from Mighty Bee Dev Corp Website Contact Form
        </div>
      </div>
    </body>
  </html>
  `

  return transporter.sendMail({
    from: `"MBDC Website Inquiries" <${senderEmail}>`,
    to: adminEmail,
    replyTo: data.email,
    subject: `[New Inquiry] ${data.name} - ${data.service || 'General'}`,
    text: `New inquiry from ${data.name} (${data.email}, Phone: ${data.phone || 'N/A'}):\n\nService: ${data.service || 'General'}\n\nMessage:\n${data.message}`,
    html: htmlContent,
  })
}

/**
 * Sends a confirmation email to the user acknowledging receipt of their inquiry.
 */
export async function sendUserInquiryConfirmation(data: InquiryEmailData) {
  const transporter = getTransporter()
  if (!transporter) return { success: false, reason: 'SMTP_NOT_CONFIGURED' }

  const senderEmail = process.env.SMTP_USER

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #121212; color: #ffffff; margin: 0; padding: 20px; }
        .card { background-color: #1a1a1a; border: 1px solid #333333; border-radius: 8px; max-width: 600px; margin: 0 auto; overflow: hidden; }
        .header { background-color: #111111; border-bottom: 2px solid #E8A020; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.05em; color: #ffffff; text-transform: uppercase; }
        .header h1 span { color: #E8A020; }
        .content { padding: 28px 24px; color: #d0d0d0; line-height: 1.6; }
        .greeting { font-size: 16px; color: #ffffff; margin-bottom: 16px; font-weight: 600; }
        .message-summary { background-color: #222222; border-left: 3px solid #E8A020; padding: 14px; margin: 20px 0; border-radius: 4px; font-size: 14px; color: #cccccc; }
        .contact-box { background-color: #151515; border: 1px solid #2a2a2a; border-radius: 6px; padding: 16px; margin-top: 24px; font-size: 13px; color: #aaaaaa; }
        .contact-box a { color: #E8A020; text-decoration: none; }
        .footer { padding: 16px 24px; font-size: 12px; color: #666666; text-align: center; border-top: 1px solid #222222; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>MIGHTY BEE <span>DEV CORP</span></h1>
        </div>
        <div class="content">
          <div class="greeting">Hi ${escapeHtml(data.name)},</div>
          <p>Thank you for reaching out to Mighty Bee Dev Corp! We have successfully received your project inquiry.</p>
          <p>Our team is currently reviewing your details and will get back to you within <strong>1 business day</strong>.</p>
          
          <div class="message-summary">
            <strong style="color: #E8A020; display: block; margin-bottom: 6px;">Summary of Your Inquiry:</strong>
            ${data.service ? `<p style="margin: 4px 0;"><strong>Service:</strong> ${escapeHtml(data.service)}</p>` : ''}
            <p style="margin: 4px 0; white-space: pre-wrap;"><strong>Message:</strong><br/>${escapeHtml(data.message)}</p>
          </div>

          <div class="contact-box">
            <strong style="color: #ffffff; display: block; margin-bottom: 6px;">Need immediate assistance?</strong>
            📞 Phone: (032) 342 2202<br/>
            ✉️ Email: <a href="mailto:mbdcfixall@gmail.com">mbdcfixall@gmail.com</a><br/>
            📍 Office: 8WX7+H64, Gov. M. Cuenco Ave, Cebu City, 6000 Cebu (Mon–Fri 8:00 AM – 5:00 PM)
          </div>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Mighty Bee Dev Corp. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `

  return transporter.sendMail({
    from: `"Mighty Bee Dev Corp" <${senderEmail}>`,
    to: data.email,
    subject: `We received your inquiry - Mighty Bee Dev Corp`,
    text: `Hi ${data.name},\n\nThank you for reaching out to Mighty Bee Dev Corp! We have received your inquiry regarding "${data.service || 'our services'}" and will respond within 1 business day.\n\nBest regards,\nMighty Bee Dev Corp Team`,
    html: htmlContent,
  })
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
