import Image from 'next/image'
import Link from 'next/link'
import type { Producto } from '@/types'

interface Props {
  producto: Producto
  whatsapp: string
}

export default function ProductCardEditorial({ producto, whatsapp }: Props) {
  const numero = whatsapp.replace(/\D/g, '')
  const mensaje = encodeURIComponent(`Hola, me interesa el producto: ${producto.nombre} 🌸`)
  const waHref = `https://wa.me/${numero}?text=${mensaje}`

  return (
    <article
      className="group flex flex-col overflow-hidden bg-white"
      style={{ borderRadius: '20px', boxShadow: '0 4px 32px rgba(26,10,20,0.07)' }}
    >
      <Link href={`/catalogo/${producto.id}`} className="relative block h-64 overflow-hidden">
        <Image
          src={producto.imagenUrl}
          alt={producto.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge esquina superior izquierda — fondo oscuro */}
        <div
          className="absolute left-4 top-4 rounded-full px-3 py-1 font-nunito text-xs font-bold text-white"
          style={{ backgroundColor: '#1A0A14' }}
        >
          {producto.categoria}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <Link href={`/catalogo/${producto.id}`}>
          <h3
            className="font-playfair text-lg font-bold leading-tight transition-opacity hover:opacity-75"
            style={{ color: '#1A0A14' }}
          >
            {producto.nombre}
          </h3>
        </Link>

        {producto.descripcion && (
          <p
            className="line-clamp-2 font-nunito text-sm font-semibold leading-relaxed"
            style={{ color: 'rgba(26,10,20,0.5)' }}
          >
            {producto.descripcion}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span
            className="font-playfair font-black text-2xl"
            style={{ color: '#FF1B6D' }}
          >
            Q{producto.precio.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
          </span>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 px-5 py-2 font-nunito text-xs font-bold tracking-wide transition-all hover:bg-[#FF1B6D] hover:text-white"
            style={{ borderColor: '#FF1B6D', color: '#FF1B6D' }}
          >
            Pedir ahora
          </a>
        </div>
      </div>
    </article>
  )
}
