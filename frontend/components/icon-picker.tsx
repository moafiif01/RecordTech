"use client"

import React, { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Shield, Camera, Lock, Users, Wrench, Music, Headphones, Mic, Disc, Zap, Star, Globe
} from 'lucide-react'

type IconDef = { name: string; label: string; Icon: React.ComponentType<any> }

const ICONS: IconDef[] = [
  { name: 'shield', label: 'Shield', Icon: Shield },
  { name: 'camera', label: 'Camera', Icon: Camera },
  { name: 'lock', label: 'Lock', Icon: Lock },
  { name: 'fire', label: 'Fire', Icon: Zap },
  { name: 'users', label: 'Users', Icon: Users },
  { name: 'wrench', label: 'Wrench', Icon: Wrench },
  { name: 'music', label: 'Music', Icon: Music },
  { name: 'headphones', label: 'Headphones', Icon: Headphones },
  { name: 'mic', label: 'Mic', Icon: Mic },
  { name: 'vinyl', label: 'Vinyl', Icon: Disc },
  { name: 'bolt', label: 'Bolt', Icon: Zap },
  { name: 'star', label: 'Star', Icon: Star },
  { name: 'globe', label: 'Globe', Icon: Globe },
]

export default function IconPicker({ value, onChange }: { value?: string, onChange: (name: string) => void }) {
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(0)

  const list = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return ICONS
    return ICONS.filter(i => i.name.includes(query) || i.label.toLowerCase().includes(query))
  }, [q])

  return (
    <div className="w-full">
      <Input placeholder="Search icons..." value={q} onChange={(e)=>setQ(e.target.value)} className="mb-2" />
      <div className="grid grid-cols-4 gap-2" role="listbox" aria-label="Icon picker">
        {list.map((i, idx) => {
          const Icon = i.Icon
          const isFocused = idx === focused
          return (
            <button
              key={i.name}
              role="option"
              aria-selected={value === i.name}
              onClick={() => onChange(i.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(i.name) }
                if (e.key === 'ArrowRight') setFocused((f) => Math.min(f + 1, list.length - 1))
                if (e.key === 'ArrowLeft') setFocused((f) => Math.max(f - 1, 0))
                if (e.key === 'ArrowDown') setFocused((f) => Math.min(f + 4, list.length - 1))
                if (e.key === 'ArrowUp') setFocused((f) => Math.max(f - 4, 0))
              }}
              className={"flex items-center gap-2 justify-start p-2 rounded " + (isFocused ? 'ring-2 ring-primary' : '')}
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span className="text-sm">{i.label}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-2 text-xs text-muted-foreground">Current: {value || 'None'}</div>
    </div>
  )
}
