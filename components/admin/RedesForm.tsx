'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Camera, Users2, Music2, MessageCircle, Pin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { updateRedes } from '@/lib/appsscript'
import type { Red } from '@/types'

const META: { plataforma: Red['plataforma']; label: string; icon: React.ReactNode; placeholder: string }[] = [
  { plataforma: 'instagram', label: 'Instagram', icon: <Camera className="h-4 w-4" />,       placeholder: 'https://instagram.com/tu_usuario' },
  { plataforma: 'facebook',  label: 'Facebook',  icon: <Users2 className="h-4 w-4" />,       placeholder: 'https://facebook.com/tu_pagina' },
  { plataforma: 'tiktok',    label: 'TikTok',    icon: <Music2 className="h-4 w-4" />,       placeholder: 'https://tiktok.com/@tu_usuario' },
  { plataforma: 'whatsapp',  label: 'WhatsApp',  icon: <MessageCircle className="h-4 w-4" />,placeholder: 'https://wa.me/502XXXXXXXX' },
  { plataforma: 'pinterest', label: 'Pinterest', icon: <Pin className="h-4 w-4" />,          placeholder: 'https://pinterest.com/tu_usuario' },
]

interface Props {
  initialRedes: Red[]
}

export default function RedesForm({ initialRedes }: Props) {
  const [redes, setRedes] = useState<Red[]>(() =>
    META.map(({ plataforma }) => {
      const existing = initialRedes.find((r) => r.plataforma === plataforma)
      return existing ?? { plataforma, url: '', activo: false }
    })
  )
  const [loading, setLoading] = useState(false)

  const update = (plataforma: Red['plataforma'], field: keyof Red, value: string | boolean) => {
    setRedes((prev) =>
      prev.map((r) => (r.plataforma === plataforma ? { ...r, [field]: value } : r))
    )
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await updateRedes(redes)
      toast.success('Redes sociales actualizadas')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {META.map(({ plataforma, label, icon, placeholder }) => {
        const red = redes.find((r) => r.plataforma === plataforma)!
        return (
          <div
            key={plataforma}
            className="flex items-center gap-4 rounded-xl border border-rose-100 bg-white p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              {icon}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <Label className="text-rose-800">{label}</Label>
              <Input
                value={red.url}
                onChange={(e) => update(plataforma, 'url', e.target.value)}
                placeholder={placeholder}
                className="border-rose-200 text-sm"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Switch
                checked={red.activo}
                onCheckedChange={(v) => update(plataforma, 'activo', v)}
              />
              <span className="text-xs text-rose-400">{red.activo ? 'Activo' : 'Inactivo'}</span>
            </div>
          </div>
        )
      })}

      <Button
        onClick={handleSave}
        disabled={loading}
        className="mt-2 w-fit rounded-full bg-rose-500 hover:bg-rose-600"
      >
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </div>
  )
}
