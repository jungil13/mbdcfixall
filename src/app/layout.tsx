import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MightyBee Development Corp. | Cebu Construction & Facility Services',
  description:
    'Mightybee Development Corp. delivers world-class construction, property repair, maintenance, and facility services across Cebu — on time, on budget, and built to last.',
  robots: 'index, follow',
  icons: {
    icon: '/mightyb_logo.png',
    apple: '/mightyb_logo.png',
  },
  openGraph: {
    title: 'MightyBee Development Corp.',
    description: "Cebu's trusted builder and facility services provider since 1999.",
    type: 'website',
    locale: 'en_PH',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

