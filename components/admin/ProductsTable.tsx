'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DeleteDialog from './DeleteDialog'
import { actualizarProducto } from '@/lib/appsscript'
import { CATEGORIAS, type Producto } from '@/types'

interface Props {
  initialProductos: Producto[]
}

export default function ProductsTable({ initialProductos }: Props) {
  const [productos, setProductos] = useState(initialProductos)
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [, startTransition] = useTransition()

  const filtrados = productos.filter((p) => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoria === 'todas' || p.categoria === categoria
    return matchSearch && matchCat
  })

  const toggleDisponible = async (p: Producto) => {
    const nuevo = !p.disponible
    setProductos((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, disponible: nuevo } : x))
    )
    startTransition(async () => {
      try {
        await actualizarProducto(p.id, { disponible: nuevo })
        toast.success(nuevo ? `"${p.nombre}" activado` : `"${p.nombre}" desactivado`)
      } catch {
        setProductos((prev) =>
          prev.map((x) => (x.id === p.id ? { ...x, disponible: p.disponible } : x))
        )
        toast.error('Error al actualizar disponibilidad')
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs border-rose-200"
        />
        <Select value={categoria} onValueChange={(val) => setCategoria(val ?? 'todas')}>
          <SelectTrigger className="w-48 border-rose-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorías</SelectItem>
            {CATEGORIAS.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="self-center text-sm text-rose-500">
          {filtrados.length} producto{filtrados.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-rose-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-rose-50">
              <TableHead className="w-14">Img</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Disponible</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-rose-50">
                    <Image src={p.imagenUrl} alt={p.nombre} fill sizes="40px" className="object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-rose-900 max-w-[200px] truncate">{p.nombre}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-rose-100 text-rose-700">{p.categoria}</Badge>
                </TableCell>
                <TableCell className="text-rose-700 font-semibold">Q{p.precio.toFixed(2)}</TableCell>
                <TableCell>
                  <Switch checked={p.disponible} onCheckedChange={() => toggleDisponible(p)} aria-label="Disponible" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/productos/${p.id}/editar`}>
                      <Button variant="ghost" size="icon" className="text-rose-600 hover:bg-rose-50">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteDialog
                      id={p.id}
                      nombre={p.nombre}
                      onDeleted={() => setProductos((prev) => prev.filter((x) => x.id !== p.id))}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-rose-400">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
