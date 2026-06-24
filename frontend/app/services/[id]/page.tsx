"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Camera, Lock, Users, Wrench, Music, Headphones, Mic, Disc, Zap, Star, Globe, ArrowLeft, CheckCircle2 } from "lucide-react"

function renderIcon(name: string, className = "h-12 w-12") {
  switch (name) {
    case 'shield': return <Shield className={className} aria-hidden />
    case 'camera': return <Camera className={className} aria-hidden />
    case 'lock': return <Lock className={className} aria-hidden />
    case 'fire': return <Zap className={className} aria-hidden />
    case 'users': return <Users className={className} aria-hidden />
    case 'wrench': return <Wrench className={className} aria-hidden />
    case 'music': return <Music className={className} aria-hidden />
    case 'headphones': return <Headphones className={className} aria-hidden />
    case 'mic': return <Mic className={className} aria-hidden />
    case 'vinyl': return <Disc className={className} aria-hidden />
    case 'bolt': return <Zap className={className} aria-hidden />
    case 'star': return <Star className={className} aria-hidden />
    case 'globe': return <Globe className={className} aria-hidden />
    default: return <Shield className={className} aria-hidden />
  }
}

export default function ServiceDetailPage() {
  const params = useParams()
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/services/${params.id}`)
        const data = await res.json()
        if (mounted) {
          // Parse features if it's a JSON string
          let features = data.features || []
          if (typeof features === 'string') {
            try { features = JSON.parse(features) } catch { features = [features] }
          }
          setService({ ...data, features })
        }
      } catch (e) {
        console.error("Failed to fetch service details", e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [params.id])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : !service ? (
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Service introuvable</h1>
            <p className="text-muted-foreground mb-8">Nous n'avons pas pu trouver les détails de ce service.</p>
            <Link href="/services">
              <Button>Retour aux services</Button>
            </Link>
          </div>
        ) : (
          <>
            <section className="bg-gradient-to-br from-secondary/10 to-background py-16 lg:py-24">
              <div className="container mx-auto px-4">
                <Link href="/services" className="inline-flex items-center text-primary hover:underline mb-8 font-medium">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux services
                </Link>
                
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="bg-primary/10 p-8 rounded-2xl flex-shrink-0 text-primary">
                    {renderIcon(service.icon, "h-24 w-24")}
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{service.title}</h1>
                    <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 bg-card border-t border-border/50">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-8">Ce qui est inclus</h2>
                    {service.features && service.features.length > 0 ? (
                      <ul className="space-y-4">
                        {service.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start bg-background p-4 rounded-lg border border-border/50 shadow-sm">
                            <CheckCircle2 className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                            <span className="text-foreground/80 font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">Aucun détail supplémentaire disponible pour le moment.</p>
                    )}
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center sticky top-24">
                    <h3 className="text-2xl font-bold mb-4">Prêt à sécuriser votre entreprise ?</h3>
                    <p className="text-muted-foreground mb-8">
                      Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé pour notre service de {service.title.toLowerCase()}.
                    </p>
                    <Link href="/contact" className="w-full block">
                      <Button size="lg" className="w-full text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        Demander un devis
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
