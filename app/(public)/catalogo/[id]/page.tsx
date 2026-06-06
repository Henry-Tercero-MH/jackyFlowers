import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getConfig, getProducto, getProductos } from '@/lib/appsscript'
import ProductCard from '@/components/public/ProductCard'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  const productos = await getProductos()
  return productos.map((p) => ({ id: p.id }))
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
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 3)

  const numero = config.whatsapp.replace(/\D/g, '')
  const mensaje = encodeURIComponent(
    `Hola, me interesa el producto: ${producto.nombre} - Q${producto.precio} 🌸`
  )
  const waHref = `https://wa.me/${numero}?text=${mensaje}`

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: producto.nombre,
            description: producto.descripcion,
            image: producto.imagenUrl,
            offers: {
              '@type': 'Offer',
              price: producto.precio,
              priceCurrency: 'GTQ',
              availability: producto.disponible
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
          }),
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <Link
          href="/catalogo"
          className="mb-8 inline-flex items-center gap-2 text-sm text-rose-600 hover:text-rose-800"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Imagen */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-rose-50">
            <Image
              src={producto.imagenUrl}
              alt={producto.nombre}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <Badge className="w-fit bg-rose-100 text-rose-700 hover:bg-rose-200">
              {producto.categoria}
            </Badge>
            <h1 className="font-playfair text-3xl font-bold text-rose-900">{producto.nombre}</h1>
            <p className="text-3xl font-bold text-rose-600">
              Q{producto.precio.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
            </p>
            <p className="leading-relaxed text-rose-700">{producto.descripcion}</p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-4">
              <Button size="lg" className="w-full gap-2 rounded-full bg-rose-500 hover:bg-rose-600">
                <MessageCircle className="h-5 w-5" />
                Pedir por WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-playfair text-2xl font-bold text-rose-900">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((p) => (
                <ProductCard key={p.id} producto={p} whatsapp={config.whatsapp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
