"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/212663005390"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-40"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  )
}
