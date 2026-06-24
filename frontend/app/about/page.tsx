import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Target, Users, Zap, Shield, Briefcase, Wrench } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 to-background py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                À propos de
                <span className="text-primary"> RecordTech</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Depuis plus de 10 ans, RecordTech est votre partenaire de confiance pour les solutions de sécurité,
                informatique et technologies au Maroc.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-balance">Notre Histoire</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                RecordTech a été fondée avec une vision claire : fournir des solutions de sécurité, d'informatique et de
                technologies de classe mondiale aux entreprises marocaines. Au fil des années, nous avons construit une
                réputation solide basée sur l'excellence, l'innovation et le service client exceptionnel.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Aujourd'hui, nous servons plus de 200 clients satisfaits à travers le Maroc, en fournissant des
                solutions intégrées qui protègent leurs actifs, modernisent leurs opérations et les aident à atteindre
                leurs objectifs commerciaux.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">Notre Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Fournir des solutions de sécurité, informatique et technologiques innovantes et fiables qui protègent
                  les entreprises marocaines et les aident à prospérer dans l'ère numérique.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">Notre Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Être le leader reconnu des solutions de sécurité et de technologie au Maroc, connu pour notre
                  excellence, notre innovation et notre engagement envers la satisfaction client.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center text-balance">
                Notre Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <Shield className="h-6 w-6 text-primary mr-3" />
                      <CardTitle>Sécurité Professionnelle</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Systèmes de sécurité complets, vidéosurveillance, alarmes et automatisation pour protéger vos
                      locaux et vos biens.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <Users className="h-6 w-6 text-primary mr-3" />
                      <CardTitle>Formation IT</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Programmes de formation informatique certifiants et ateliers pratiques pour développer les
                      compétences de votre équipe.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <Briefcase className="h-6 w-6 text-primary mr-3" />
                      <CardTitle>Consulting IT</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Audit IT, stratégie digitale et gestion de projets technologiques pour moderniser votre
                      infrastructure.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <Wrench className="h-6 w-6 text-primary mr-3" />
                      <CardTitle>Maintenance & Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Services de maintenance 24/7, import/export et support technique pour assurer la continuité de vos
                      opérations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center text-balance">
                Nos Valeurs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Excellence",
                    description: "Nous nous engageons à fournir des services de la plus haute qualité.",
                  },
                  {
                    title: "Innovation",
                    description: "Nous adoptons les dernières technologies pour rester à l'avant-garde.",
                  },
                  {
                    title: "Intégrité",
                    description: "Nous agissons avec honnêteté et transparence dans toutes nos relations.",
                  },
                  {
                    title: "Fiabilité",
                    description: "Nos clients peuvent compter sur nous pour un support constant et fiable.",
                  },
                ].map((value, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
                Prêt à travailler avec nous?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Contactez-nous dès aujourd'hui pour discuter de vos besoins en sécurité et technologie.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
