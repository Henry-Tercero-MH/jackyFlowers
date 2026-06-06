import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Producto } from '@/types'

interface Props {
  producto: Producto
  whatsapp: string
}

export default function ProductCard({ producto, whatsapp }: Props) {
  const numero = whatsapp.replace(/\D/g, '')
  const mensaje = encodeURIComponent(
    `Hola, me interesa el producto: ${producto.nombre} 🌸`
  )
  const waHref = `https://wa.me/${numero}?text=${mensaje}`

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-rose-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/catalogo/${producto.id}`} className="relative block h-56 overflow-hidden bg-rose-50">
        <Image
          src={producto.imagenUrl}
          alt={producto.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Badge variant="secondary" className="w-fit bg-rose-100 text-rose-700 hover:bg-rose-200">
          {producto.categoria}
        </Badge>

        <Link href={`/catalogo/${producto.id}`}>
          <h3 className="font-playfair text-base font-semibold text-rose-900 line-clamp-2 hover:text-rose-600">
            {producto.nombre}
          </h3>
        </Link>

        <p className="text-lg font-bold text-rose-600">
          Q{producto.precio.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
        </p>

        <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-auto">
          <Button className="w-full gap-2 rounded-full bg-rose-500 hover:bg-rose-600">
            <MessageCircle className="h-4 w-4" />
            Pedir por WhatsApp
          </Button>
        </a>
      </div>
    </article>
  )
}
