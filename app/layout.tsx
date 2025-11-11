import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "sonner"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ptboost.co.uk"),
  title: {
    default: "PTBoost | PT Websites with 1‑Month Free Trial, then £7.99/month | No Agency Prices",
    template: "%s | PTBoost"
  },
  description:
    "You train clients. We handle everything else. Done-for-you websites for UK personal trainers. 1‑month free trial, then £7.99/month. Live in 7 days. Hosting and maintenance included. AI editor for easy updates. Lead capture. Mobile-first. Local SEO. Cancel anytime.",
  keywords: [
    "personal trainer website",
    "UK personal trainer",
    "personal trainer website UK",
    "affordable personal trainer website",
    "personal trainer website design",
    "personal trainer near me",
    "PT website",
    "fitness trainer website",
    "personal trainer website London",
    "personal trainer website Manchester",
    "personal trainer website Birmingham",
    "personal trainer website Leeds",
    "personal trainer website Liverpool",
    "personal trainer website Bristol",
    "personal trainer website Edinburgh",
    "personal trainer website Glasgow",
    "cheap personal trainer website",
    "personal trainer website builder",
    "professional trainer website",
    "fitness website UK",
    "personal trainer online presence",
    "PT website design",
    "personal trainer lead generation",
    "fitness business website",
    "personal trainer website cost",
    "budget personal trainer website",
    "personal trainer website £7.99",
    "personal trainer website monthly",
    "done for you personal trainer website",
    "personal trainer website no tech skills",
    "personal trainer website 7 days",
    "local personal trainer website",
    "personal trainer website for beginners",
    "affordable fitness website",
    "personal trainer website service",
    "UK fitness website design",
    "personal trainer website agency alternative",
    "personal trainer website without coding",
    "personal trainer website mobile first",
    "personal trainer website SEO",
    "personal trainer website lead capture"
  ],
  authors: [{ name: "PTBoost" }],
  creator: "PTBoost",
  publisher: "PTBoost",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ptboost.co.uk",
    siteName: "PTBoost",
    title: "PTBoost | PT Websites with 1‑Month Free Trial, then £7.99/month | No Agency Prices",
    description:
      "You train clients. We handle everything else. Done-for-you websites for UK personal trainers. 1‑month free trial, then £7.99/month. Live in 7 days. Hosting and maintenance included. AI editor for easy updates. Lead capture. Mobile-first. Local SEO. Cancel anytime.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PTBoost - PT Websites with 1‑Month Free Trial, then £7.99/month | No Agency Prices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PTBoost | PT Websites with 1‑Month Free Trial, then £7.99/month",
    description:
      "Affordable professional websites for UK personal trainers. 1‑month free trial, then £7.99/month. Get a custom website in 7 days. Stop chasing DMs, start attracting serious clients. Perfect for budget-conscious trainers. No tech skills needed.",
    images: ["/og-image.jpg"],
    creator: "@ptboost",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://ptboost.co.uk",
  },
  category: "Fitness & Personal Training",
  classification: "Business Service",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <body className={`font-sans antialiased`}>
        <StructuredData />
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  )
}
