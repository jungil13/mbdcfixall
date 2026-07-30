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
  title: "MBDC FIX ALL | Cebu Construction & Facility Services",
  description:
    "MBDC FIX ALL delivers world-class construction, property repair, maintenance, and facility services across Cebu — on time, on budget, and built to last.",
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
    title: "MBDC FIX ALL",
    description:
      "Cebu's trusted builder and facility services provider since 1999.",
    type: "website",
    locale: "en_PH",
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
