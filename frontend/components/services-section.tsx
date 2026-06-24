"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchServices } from "@/utils/api"
import IconMapper from "@/components/icon-mapper"

type Service = {
  id: number
  title: string
  description?: string
  icon?: string
  features?: string[]
}

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const list: any[] = await fetchServices()
        if (!mounted) return
        // normalize features: backend sometimes returns JSON string for features
        const normalized = (list || []).map((s) => {
          let features: string[] = []
          if (s.features) {
            if (Array.isArray(s.features)) features = s.features
            else if (typeof s.features === 'string') {
              try { features = JSON.parse(s.features) } catch { features = [s.features] }
            }
          }
          return { id: s.id, title: s.title, description: s.description, icon: s.icon, features }
        })
        setServices(normalized.slice(0, 4)) // top 4
      } catch (err) {
        // ignore and keep empty
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Nos Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Des solutions complètes en sécurité, informatique et technologies adaptées à vos besoins
          </p>
        </div>

        {loading ? (
          <p className="text-center">Chargement des services…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <IconMapper name={service.icon} className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href={`/services/${service.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        En savoir plus
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Découvrir tous nos services
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
