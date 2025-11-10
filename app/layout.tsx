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
    default: "PTBoost | Professional Websites for UK Personal Trainers | £7.99/month",
    template: "%s | PTBoost"
  },
  description:
    "Affordable professional websites for UK personal trainers. Get a custom website in 7 days for just £7.99/month. Stop chasing DMs, start attracting serious clients. Perfect for trainers in London, Manchester, Birmingham. No tech skills needed.",
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
    "cheap personal trainer website",
    "personal trainer website builder",
    "professional trainer website",
    "fitness website UK",
    "personal trainer online presence",
    "PT website design",
    "personal trainer lead generation",
    "fitness business website",
    "personal trainer website cost"
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
    title: "PTBoost | Professional Websites for UK Personal Trainers | £7.99/month",
    description:
      "Affordable professional websites for UK personal trainers. Get a custom website in 7 days for just £7.99/month. Stop chasing DMs, start attracting serious clients. Perfect for trainers in London, Manchester, Birmingham.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PTBoost - Professional Websites for UK Personal Trainers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PTBoost | Professional Websites for UK Personal Trainers | £7.99/month",
    description:
      "Affordable professional websites for UK personal trainers. Get a custom website in 7 days for just £7.99/month. Stop chasing DMs, start attracting serious clients.",
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
