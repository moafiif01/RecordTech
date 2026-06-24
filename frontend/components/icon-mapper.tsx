"use client"

import React from "react"
import { Shield, Camera, Lock, BookOpen, Briefcase, Wrench, Zap, Star, Globe, Users, Mic, Disc, Music } from "lucide-react"

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  shield: Shield,
  camera: Camera,
  lock: Lock,
  "book-open": BookOpen,
  bookopen: BookOpen,
  briefcase: Briefcase,
  wrench: Wrench,
  zap: Zap,
  // map common names to Zap when a direct icon isn't available in this lucide build
  fire: Zap,
  bolt: Zap,
  star: Star,
  globe: Globe,
  users: Users,
  mic: Mic,
  disc: Disc,
  vinyl: Disc,
  music: Music,
}

export default function IconMapper({ name, className, size = 24 }: { name?: string | null; className?: string; size?: number }) {
  const key = (name || "").toLowerCase()
  const Icon = ICON_MAP[key] || Shield
  // lucide-react components accept `size` and className
  return <Icon className={className} size={size} aria-hidden />
}
