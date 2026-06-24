"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { postContact } from "@/utils/api"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    postContact({ 
      name: formData.name, 
      email: formData.email, 
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      message: formData.message 
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch((err) => {
        console.error(err)
        alert("Erreur: " + err.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">Contactez-nous</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Notre équipe d'experts RecordTech est à votre disposition pour répondre à vos questions et vous
                accompagner dans vos projets de sécurité et technologie
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-card-foreground">Demande de devis</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitted && (
                      <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded">Merci — votre message a été envoyé.</div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Nom complet *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-input border-border"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Téléphone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-input border-border"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          Entreprise
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-input border-border"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        Service souhaité
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Sélectionnez un service</option>
                        <option value="systemes-securite">Systèmes de Sécurité</option>
                        <option value="videosurveillance">Vidéosurveillance</option>
                        <option value="alarmes-automatisation">Alarmes et Automatisation</option>
                        <option value="formation-it">Formation Informatique</option>
                        <option value="consulting-it">Consulting IT et Gestion de Projets</option>
                        <option value="maintenance">Maintenance et Services</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-input border-border"
                        placeholder="Décrivez votre projet ou vos besoins en détail..."
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-card-foreground">Informations de contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Téléphone</h3>
                        <p className="text-muted-foreground">+212 663 005 390</p>
                        <p className="text-muted-foreground">Support 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <a
                          href="mailto:recordtechsarlau@gmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          recordtechsarlau@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Adresse</h3>
                        <p className="text-muted-foreground">Rabat, Maroc</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Horaires</h3>
                        <p className="text-muted-foreground">
                          Lun - Ven: 8h00 - 18h00
                          <br />
                          Sam: 9h00 - 13h00
                          <br />
                          Urgences: 24h/24 et 7j/7
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-card-foreground">Pourquoi nous choisir ?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Plus de 10 ans d'expérience</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Équipe de techniciens certifiés</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Support technique 24/7</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Solutions intégrées et personnalisées</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Devis gratuit sous 24h</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
