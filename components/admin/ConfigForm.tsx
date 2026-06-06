'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateConfig } from '@/lib/appsscript'
import type { Config } from '@/types'

const schema = z.object({
  nombreTienda:   z.string().min(1, 'Requerido'),
  whatsapp:       z.string().min(1, 'Requerido'),
  descripcionSeo: z.string(),
  horarios:       z.string(),
  ciudad:         z.string(),
  emailContacto:  z.string(),
})

type FormData = z.infer<typeof schema>

interface Props {
  initialConfig: Config
}

export default function ConfigForm({ initialConfig }: Props) {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombreTienda:   initialConfig.nombreTienda   ?? '',
      whatsapp:       initialConfig.whatsapp       ?? '',
      descripcionSeo: initialConfig.descripcionSeo ?? '',
      horarios:       initialConfig.horarios       ?? '',
      ciudad:         initialConfig.ciudad         ?? '',
      emailContacto:  initialConfig.emailContacto  ?? '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await updateConfig(data)
      toast.success('Configuración guardada')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-xl">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nombreTienda">Nombre de la tienda *</Label>
        <Input id="nombreTienda" {...register('nombreTienda')} />
        {errors.nombreTienda && <p className="text-xs text-red-500">{errors.nombreTienda.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="whatsapp">WhatsApp *</Label>
        <Input id="whatsapp" placeholder="+50249200595" {...register('whatsapp')} />
        {errors.whatsapp && <p className="text-xs text-red-500">{errors.whatsapp.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="emailContacto">Email de contacto</Label>
        <Input id="emailContacto" type="email" {...register('emailContacto')} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ciudad">Ciudad / Dirección</Label>
        <Input id="ciudad" placeholder="Quetzaltenango, Guatemala" {...register('ciudad')} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="horarios">Horarios de atención</Label>
        <Textarea id="horarios" rows={3} placeholder="Lun–Sáb: 8:00–18:00" {...register('horarios')} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="descripcionSeo">Descripción SEO</Label>
        <Textarea id="descripcionSeo" rows={3} placeholder="Arreglos florales artesanales..." {...register('descripcionSeo')} />
      </div>

      <Button type="submit" disabled={loading} className="w-fit rounded-full bg-rose-500 hover:bg-rose-600">
        {loading ? 'Guardando...' : 'Guardar configuración'}
      </Button>
    </form>
  )
}
