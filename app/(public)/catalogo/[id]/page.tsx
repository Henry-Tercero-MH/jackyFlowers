import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getConfig, getProducto, getProductos } from '@/lib/appsscript'
import ProductCard from '@/components/public/ProductCard'
import type { Metadata } from 'next'

// Use On-Demand ISR instead of static generation to avoid Vercel timeout
export const revalidate = 3600
export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const producto = await getProducto(params.id).catch(() => null)
  if (!producto) return {}
  return {
    title: producto.nombre,
    description: producto.descripcion,
    openGraph: {
      title: producto.nombre,
      description: producto.descripcion,
      images: [{ url: producto.imagenUrl }],
    },
  }
}

export default async function DetalleProductoPage({ params }: Props) {
  const [producto, config, todos] = await Promise.all([
    getProducto(params.id).catch(() => null),
    getConfig(),
    getProductos(),
  ])

  if (!producto) notFound()

  const relacionados = todos
    .filter((p) => p.id !== params.id && p.categoria === producto.categoria)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/catalogo"
          className="mb-6 inline-flex items-center gap-2 text-rose-600 hover:text-rose-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Imagen */}
          <div className="flex items-center justify-center rounded-xl bg-white p-4 shadow-sm">
            <Image
              src={producto.imagenUrl}
              alt={producto.nombre}
              width={400}
              height={400}
              className="h-auto w-full rounded-lg object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">
                {producto.categoria}
              </Badge>
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                {producto.nombre}
              </h1>
              <p className="mb-6 text-xl text-gray-600">{producto.descripcion}</p>

              {producto.precio > 0 && (
                <p className="mb-6 text-3xl font-bold text-rose-600">
                  Q {producto.precio.toFixed(2)}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <a
                href={`https://wa.me/${config?.whatsapp?.replace(/\D/g, '')}?text=Hola%20me%20interesa%20el%20producto:%20${encodeURIComponent(producto.nombre)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                Consultar en WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              Productos Relacionados
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
