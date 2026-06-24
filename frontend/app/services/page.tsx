"use client"

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchServices } from "@/utils/api";
import { Shield, Camera, Lock, Users, Wrench, Music, Headphones, Mic, Disc, Zap, Star, Globe } from 'lucide-react'
import Link from "next/link";

function renderIcon(name: string) {
  switch (name) {
    case 'shield': return <Shield className="h-6 w-6" aria-hidden />
    case 'camera': return <Camera className="h-6 w-6" aria-hidden />
    case 'lock': return <Lock className="h-6 w-6" aria-hidden />
  case 'fire': return <Zap className="h-6 w-6" aria-hidden />
    case 'users': return <Users className="h-6 w-6" aria-hidden />
    case 'wrench': return <Wrench className="h-6 w-6" aria-hidden />
    case 'music': return <Music className="h-6 w-6" aria-hidden />
    case 'headphones': return <Headphones className="h-6 w-6" aria-hidden />
    case 'mic': return <Mic className="h-6 w-6" aria-hidden />
    case 'vinyl': return <Disc className="h-6 w-6" aria-hidden />
    case 'bolt': return <Zap className="h-6 w-6" aria-hidden />
    case 'star': return <Star className="h-6 w-6" aria-hidden />
    case 'globe': return <Globe className="h-6 w-6" aria-hidden />
    default: return <Shield className="h-6 w-6" aria-hidden />
  }
}

const servicesPlaceholder: any[] = []

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>(servicesPlaceholder)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const list = await fetchServices()
        if (mounted) setServices(list || [])
      } catch (e) {
        // fallback to placeholder
      }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-muted to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Nos Services de Sécurité
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Des solutions complètes et personnalisées pour répondre à tous vos besoins en matière de sécurité
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center">
                        {renderIcon(service.icon)}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-card-foreground">{service.title}</CardTitle>
                        {/* price removed */}
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {service.features && service.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start space-x-3 text-sm text-muted-foreground">
                          <span className="h-4 w-4 text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex space-x-3">
                      <Link href="/contact" className="flex-1">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                          Demander un devis
                        </Button>
                      </Link>
                      <Link href={`/services/${service.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent w-full"
                        >
                          En savoir plus
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
