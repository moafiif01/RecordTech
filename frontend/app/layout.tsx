import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "RecordTech | Sécurité, Informatique et Technologies",
  description:
    "RecordTech propose des solutions de sécurité, systèmes d'alarme, formation informatique et services technologiques professionnels au Maroc.",
  keywords:
    "sécurité, systèmes d'alarme, informatique, gardiennage, RecordTech, Rabat, Maroc, vidéosurveillance, sécurité électronique",
  authors: [{ name: "RecordTech SARL" }],
  openGraph: {
    title: "RecordTech | Solutions de sécurité et technologie",
    description:
      "RecordTech propose des solutions de sécurité, systèmes d'alarme, formation informatique et services technologiques professionnels au Maroc.",
    type: "website",
    locale: "fr_FR",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${poppins.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
