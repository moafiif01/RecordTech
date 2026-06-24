"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, Eye, EyeOff, Search, LayoutDashboard, MessageSquare, LogOut, User, Bell, Menu, CheckCircle2, Phone, Building2, Briefcase, Trash2, Plus, Edit2, Shield, Settings } from "lucide-react"
import { loginAdmin, fetchCurrentAdmin, fetchContacts, logoutAdmin, markMessageAsRead, deleteMessage, fetchServices, createService, updateService, deleteService } from "@/utils/api"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

function MessagesViewer() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const list = await fetchContacts()
        if (mounted) setMessages(list || [])
      } catch (e) {
        // ignore for now
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.message?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleMarkAsRead = async (id: number) => {
    try {
      await markMessageAsRead(id)
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m))
    } catch (e) {
      console.error("Failed to mark as read", e)
    }
  }

  const confirmDelete = async () => {
    if (messageToDelete === null) return;
    setIsDeleting(true);
    try {
      await deleteMessage(messageToDelete)
      setMessages(messages.filter(m => m.id !== messageToDelete))
      setMessageToDelete(null)
    } catch (e) {
      console.error("Failed to delete message", e)
      alert("Erreur lors de la suppression du message.")
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher un message, nom, email..." 
            className="pl-10 bg-background/50 border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm px-3 py-1.5 bg-secondary/20 rounded-full text-muted-foreground whitespace-nowrap border border-border/50">
          Total: <span className="font-semibold text-foreground">{messages.length}</span> messages
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground font-medium">Chargement des messages...</p>
        </div>
      ) : (
        <>
          {filteredMessages.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-secondary/5 rounded-xl border border-dashed border-border/80">
               <Mail className="h-16 w-16 mb-4 opacity-20" />
               <p className="font-medium text-lg">Aucun message trouvé.</p>
               {searchTerm && <p className="text-sm mt-1">Modifiez vos critères de recherche.</p>}
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredMessages.map((m: any) => (
                <div key={m.id} className={`group p-5 sm:p-6 border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${m.is_read ? 'bg-card border-border/50 hover:border-primary/30' : 'bg-primary/5 border-primary/30 hover:border-primary shadow-sm'}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full transition-colors duration-300 ${m.is_read ? 'bg-primary/0 group-hover:bg-primary' : 'bg-primary'}`}></div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-lg border border-primary/10 shadow-inner shrink-0">
                        {m.name ? m.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground text-lg flex items-center gap-2">
                          {m.name}
                          {!m.is_read && <span className="flex h-2.5 w-2.5 rounded-full bg-primary" title="Nouveau message"></span>}
                        </div>
                        <div className="text-sm font-medium text-primary/80 mb-2">
                          <a href={`mailto:${m.email}`} className="hover:underline flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/>{m.email}</a>
                        </div>
                        
                        {(m.phone || m.company || m.service) && (
                          <div className="flex flex-wrap gap-2 mb-3 mt-2">
                            {m.phone && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/10 border border-border/50 px-2 py-1 rounded-md">
                                <Phone className="w-3 h-3" />
                                <a href={`tel:${m.phone}`} className="hover:text-primary transition-colors">{m.phone}</a>
                              </div>
                            )}
                            {m.company && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/10 border border-border/50 px-2 py-1 rounded-md">
                                <Building2 className="w-3 h-3" />
                                {m.company}
                              </div>
                            )}
                            {m.service && (
                              <div className="flex items-center gap-1 text-xs text-primary/70 bg-primary/5 border border-primary/10 px-2 py-1 rounded-md font-medium">
                                <Briefcase className="w-3 h-3" />
                                {m.service}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="text-xs text-muted-foreground sm:hidden mb-3 flex items-center justify-between">
                          <span>{new Date(m.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          <div className="flex space-x-1">
                            {!m.is_read && (
                              <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(m.id)} className="h-7 text-[10px] px-2 bg-primary/10 text-primary hover:bg-primary/20">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Lu
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => setMessageToDelete(m.id)} className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        <div className={`text-sm text-foreground/80 leading-relaxed mt-3 p-4 rounded-xl border border-border/40 whitespace-pre-wrap relative before:content-[''] before:absolute before:-top-2 before:left-4 before:border-8 before:border-transparent ${m.is_read ? 'bg-secondary/10 before:border-b-secondary/10' : 'bg-background before:border-b-background'}`}>
                          {m.message}
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                      <div className="text-xs px-3 py-1.5 bg-secondary/20 rounded-full text-muted-foreground font-medium border border-border/40">
                        {new Date(m.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {!m.is_read && (
                        <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(m.id)} className="h-8 text-xs bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary mt-1">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                          Marquer comme lu
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => setMessageToDelete(m.id)} className="h-8 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive mt-1">
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <AlertDialog open={messageToDelete !== null} onOpenChange={(isOpen) => !isOpen && setMessageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce message ? Cette action est définitive et le message ne pourra pas être récupéré.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => { e.preventDefault(); confirmDelete(); }} 
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Suppression..." : "Supprimer définitivement"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function ServicesManager() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '', icon: 'shield', features: '' })
  
  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setLoading(true)
    try {
      const data = await fetchServices()
      setServices(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (s: any) => {
    setEditingId(s.id)
    let featuresStr = ''
    if (s.features) {
      try {
        const arr = typeof s.features === 'string' ? JSON.parse(s.features) : s.features
        featuresStr = Array.isArray(arr) ? arr.join('\\n') : s.features
      } catch (e) {
        featuresStr = s.features
      }
    }
    setFormData({ title: s.title, description: s.description || '', icon: s.icon || 'shield', features: featuresStr })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const featuresArr = formData.features.split('\\n').map(f => f.trim()).filter(f => f)
    const payload = { ...formData, features: featuresArr }
    
    try {
      if (editingId) {
        await updateService(editingId, payload)
      } else {
        await createService(payload)
      }
      setEditingId(null)
      setFormData({ title: '', description: '', icon: 'shield', features: '' })
      loadServices()
    } catch (err) {
      alert("Erreur lors de la sauvegarde du service")
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer ce service ?")) return
    try {
      await deleteService(id)
      loadServices()
    } catch (e) {
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gestion des Services</h2>
        <Button onClick={() => setEditingId(0)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Service
        </Button>
      </div>

      {editingId !== null && (
        <Card className="bg-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle>{editingId === 0 ? "Nouveau Service" : "Modifier le Service"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Titre</label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Icon (ex: shield, camera, lock)</label>
                  <Input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea className="w-full flex min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fonctionnalités (1 par ligne)</label>
                <textarea className="w-full flex min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} />
              </div>
              <div className="flex space-x-2 pt-2">
                <Button type="submit" className="bg-primary">Sauvegarder</Button>
                <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Annuler</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center p-8"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <Card key={s.id} className="relative group">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(s)} className="h-7 w-7 text-primary bg-primary/10 hover:bg-primary/20"><Edit2 className="w-3.5 h-3.5"/></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="h-7 w-7 text-destructive bg-destructive/10 hover:bg-destructive/20"><Trash2 className="w-3.5 h-3.5"/></Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [admin, setAdmin] = useState<any | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("messages")

  useEffect(() => {
    // check if a browser session already exists
    ;(async () => {
      try {
        const me = await fetchCurrentAdmin()
        if (me) setAdmin(me)
      } catch (e) {
        // ignore — not logged in
      }
    })()
  }, [])

  // If admin is authenticated, show a modern dashboard
  if (admin) {
    return (
      <div className="min-h-screen bg-slate-50/50 dark:bg-background flex font-sans">
        {/* Sidebar (Desktop) */}
        <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col shadow-sm z-10">
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3 text-primary font-bold text-2xl">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-1.5 rounded-lg text-sm shadow-md">RT</div>
              <span className="tracking-tight">Admin<span className="text-foreground">Panel</span></span>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'messages' ? 'bg-primary/10 text-primary border border-primary/10' : 'text-muted-foreground hover:bg-secondary hover:text-foreground group'}`}>
              <MessageSquare className={`h-5 w-5 ${activeTab !== 'messages' && 'group-hover:text-primary transition-colors'}`} />
              <span>Messages</span>
            </button>
            <button onClick={() => setActiveTab('services')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'services' ? 'bg-primary/10 text-primary border border-primary/10' : 'text-muted-foreground hover:bg-secondary hover:text-foreground group'}`}>
              <Settings className={`h-5 w-5 ${activeTab !== 'services' && 'group-hover:text-primary transition-colors'}`} />
              <span>Services</span>
            </button>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl font-medium transition-all group">
              <LayoutDashboard className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span>Statistiques</span>
            </a>
          </nav>
          <div className="p-4 border-t border-border bg-secondary/5">
            <div className="flex items-center space-x-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{admin.name}</p>
                <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-border/50" onClick={async () => { await logoutAdmin(); setAdmin(null); window.location.href = '/admin'; }}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Top Header */}
          <header className="bg-card/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 sm:px-8 shrink-0 sticky top-0 z-20">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                {activeTab === 'messages' ? 'Boîte de réception' : 'Gestion des Services'}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
              </Button>
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={async () => { await logoutAdmin(); setAdmin(null); window.location.href = '/admin'; }}>
                  <LogOut className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </header>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-card border-b border-border z-10 shadow-lg animate-in slide-in-from-top-2">
              <nav className="p-4 space-y-2">
                <button onClick={() => { setActiveTab('messages'); setMobileMenuOpen(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium ${activeTab === 'messages' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                </button>
                <button onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium ${activeTab === 'services' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
                  <Settings className="h-5 w-5" />
                  <span>Services</span>
                </button>
              </nav>
            </div>
          )}

          {/* Content Scrollable */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 scroll-smooth bg-secondary/10">
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {activeTab === 'messages' ? 'Aperçu des demandes' : 'Vos Services'}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                    {activeTab === 'messages' ? 'Consultez et gérez les prises de contact de vos clients en toute simplicité.' : 'Ajoutez ou modifiez les services affichés sur votre site public.'}
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-1 overflow-hidden">
                <div className="p-4 sm:p-6 bg-gradient-to-b from-card to-secondary/5 rounded-xl min-h-[60vh]">
                  {activeTab === 'messages' && <MessagesViewer />}
                  {activeTab === 'services' && <ServicesManager />}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate slight delay for effect
      await new Promise((resolve) => setTimeout(resolve, 600))

      if (!email || !password) {
        setError("Veuillez remplir tous les champs")
        return
      }

      await loginAdmin({ email, password })
      // re-check current user and show dashboard when logged in
      let me = await fetchCurrentAdmin()
      if (!me) {
        window.location.reload()
        return
      }
      setAdmin(me)
    } catch (err) {
      console.error("Login failed with exact error:", err)
      setError("Une erreur est survenue lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
          <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden rounded-2xl">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
            <CardHeader className="text-center pt-8 pb-4">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-5 py-4 rounded-xl font-bold text-3xl shadow-lg shadow-primary/30 transform transition-transform hover:scale-105 duration-300">
                  RT
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Espace Admin</CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Connectez-vous à votre compte administrateur RecordTech
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm font-medium flex items-center animate-in shake">
                    <span className="mr-2">⚠️</span> {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                    Adresse Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-secondary/30 border-border/50 focus:bg-background rounded-xl transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                    Mot de passe
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 bg-secondary/30 border-border/50 focus:bg-background rounded-xl transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 pb-2">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked
                      />
                      <div className="w-4 h-4 rounded border-2 border-muted-foreground peer-checked:border-primary peer-checked:bg-primary transition-all"></div>
                      <svg className="absolute w-3 h-3 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Se souvenir de moi</span>
                  </label>
                  <Link href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      <span>Connexion...</span>
                    </div>
                  ) : "Se connecter"}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl text-center">
                  <p className="text-xs font-medium text-primary/80">
                    <Lock className="inline-block w-3 h-3 mr-1 mb-0.5" />
                    Espace sécurisé réservé aux administrateurs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
              Retourner au site public
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
