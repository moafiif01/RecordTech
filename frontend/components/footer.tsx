import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-primary-foreground px-3 py-2 rounded font-bold text-xl">RT</div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">RecordTech</div>
                <div className="text-muted-foreground text-xs">Solutions professionnelles</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Votre partenaire de confiance pour tous vos besoins en sécurité, informatique et technologies au Maroc.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Systèmes de Sécurité
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Alarmes et Automatisation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Consulting IT
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Formation Informatique
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Gestion de Projets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+212 663 005 390</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:recordtechsarlau@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  recordtechsarlau@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">Rabat, Maroc</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2025 RecordTech SARL. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
