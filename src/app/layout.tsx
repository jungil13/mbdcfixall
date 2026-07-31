import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaInstaller from "@/components/PwaInstaller";
import AppSplashScreen from "@/components/AppSplashScreen";

export const viewport: Viewport = {
  themeColor: "#E8A020",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mbdcfixall.com"),
  title: {
    default: "Property Repair & Maintenance Services in Cebu | MBDC FIX ALL",
    template: "%s | MBDC FIX ALL",
  },
  description:
    "MBDC FIX ALL provides trusted property repair, home maintenance, and facility services across Cebu. Fast response, skilled professionals, and transparent pricing.",
  keywords: [
    "property repair Cebu",
    "home repair Cebu",
    "handyman Cebu",
    "maintenance services Cebu",
    "facility services Cebu",
    "building maintenance Cebu",
    "plumbing services Cebu",
    "electrical repair Cebu",
    "carpentry services Cebu",
    "painting services Cebu",
    "roof repair Cebu",
    "home renovation Cebu",
    "commercial maintenance Cebu",
    "property maintenance Cebu",
    "MBDC FIX ALL",
  ],
  alternates: {
    canonical: "/",
  },
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: "/mightyb_logo.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MBDC FIX ALL",
  },
  openGraph: {
    title: "Property Repair & Maintenance Services in Cebu | MBDC FIX ALL",
    description:
      "MBDC FIX ALL provides trusted property repair, home maintenance, and facility services across Cebu. Fast response, skilled professionals, and transparent pricing.",
    type: "website",
    locale: "en_PH",
    url: "https://mbdcfixall.com",
    siteName: "MBDC FIX ALL",
    images: [
      {
        url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "MBDC FIX ALL Property Repair Cebu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Repair & Maintenance Services in Cebu | MBDC FIX ALL",
    description:
      "MBDC FIX ALL provides trusted property repair, home maintenance, and facility services across Cebu. Fast response, skilled professionals, and transparent pricing.",
    images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <AppSplashScreen />
        {children}
        <PwaInstaller />
      </body>
    </html>
  );
}
