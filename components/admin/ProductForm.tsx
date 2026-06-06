'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ImageUpload from './ImageUpload'
import { crearProducto, actualizarProducto, subirImagen } from '@/lib/appsscript'
import { CATEGORIAS, type CategoriaProducto, type Producto } from '@/types'

type FormData = {
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  disponible: boolean
  destacado: boolean
}

interface Props {
  producto?: Producto
}

export default function ProductForm({ producto }: Props) {
  const router = useRouter()
  const isEdit = Boolean(producto)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState(producto?.imagenUrl ?? '')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nombre:      producto?.nombre      ?? '',
      descripcion: producto?.descripcion ?? '',
      precio:      producto?.precio      ?? 0,
      categoria:   producto?.categoria   ?? '',
      disponible:  producto?.disponible  ?? true,
      destacado:   producto?.destacado   ?? false,
    },
  })

  const disponible = watch('disponible')
  const destacado  = watch('destacado')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      let finalImageUrl = imageUrl

      if (imageFile) {
        const res = await subirImagen(imageFile)
        finalImageUrl = res.imagenUrl
      }

      if (!finalImageUrl) {
        toast.error('Debés subir una imagen para el producto')
        setLoading(false)
        return
      }

      const payload = {
        nombre:      data.nombre,
        descripcion: data.descripcion,
        precio:      Number(data.precio),
        categoria:   data.categoria as CategoriaProducto,
        imagenUrl:   finalImageUrl,
        disponible:  data.disponible,
        destacado:   data.destacado,
      }

      if (isEdit && producto) {
        await actualizarProducto(producto.id, payload)
        toast.success('Producto actualizado')
      } else {
        await crearProducto(payload)
        toast.success('Producto creado')
      }

      router.push('/admin/productos')
      router.refresh()
    } catch {
      toast.error('Ocurrió un error. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <Label>Imagen del producto</Label>
        <ImageUpload
          currentUrl={imageUrl}
          onFileSelect={(file) => setImageFile(file)}
          onClear={() => { setImageFile(null); setImageUrl('') }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nombre">Nombre *</Label>
        <Input
          id="nombre"
          placeholder="Ramo de rosas rojas"
          {...register('nombre', { required: 'Requerido' })}
        />
        {errors.nombre && <p className="text-xs text-red-500">{errors.nombre.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          rows={3}
          placeholder="Describe el arreglo..."
          {...register('descripcion')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="precio">Precio (Q) *</Label>
          <Input
            id="precio"
            type="number"
            step="0.01"
            min="0"
            {...register('precio', {
              required: 'Requerido',
              min: { value: 0, message: 'Debe ser ≥ 0' },
              valueAsNumber: true,
            })}
          />
          {errors.precio && <p className="text-xs text-red-500">{errors.precio.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Categoría *</Label>
          <Select
            defaultValue={producto?.categoria}
            onValueChange={(val) => setValue('categoria', val ?? '')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIAS.map((c: CategoriaProducto) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoria && <p className="text-xs text-red-500">{errors.categoria.message}</p>}
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex items-center gap-3">
          <Switch
            id="disponible"
            checked={disponible}
            onCheckedChange={(v) => setValue('disponible', v)}
          />
          <Label htmlFor="disponible">Disponible</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="destacado"
            checked={destacado}
            onCheckedChange={(v) => setValue('destacado', v)}
          />
          <Label htmlFor="destacado">Destacado en home</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/productos')}
          className="rounded-full"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="rounded-full bg-rose-500 hover:bg-rose-600"
        >
          {loading ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
        </Button>
      </div>
    </form>
  )
}
