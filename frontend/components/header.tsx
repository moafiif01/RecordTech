"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+212 663 005 390</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>recordtechsarlau@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OonUddYpSQDsCIca820WlD1NxNAE2k.png"
              alt="RecordTech Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="text-sm">
              <div className="font-semibold text-foreground text-lg">RecordTech</div>
              <div className="text-muted-foreground text-xs">Solutions professionnelles</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Accueil
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              À propos
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
            <Link href="/admin" className="text-foreground hover:text-primary transition-colors font-medium">
              Admin
            </Link>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Nous contacter</Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Accueil
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                À propos
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary transition-colors font-medium">
                Services
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              <Link href="/admin" className="text-foreground hover:text-primary transition-colors font-medium">
                Admin
              </Link>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">Nous contacter</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
