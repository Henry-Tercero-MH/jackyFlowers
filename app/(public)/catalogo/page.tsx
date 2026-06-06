import { Suspense } from 'react'
import { getConfig, getProductos } from '@/lib/appsscript'
import ProductCard from '@/components/public/ProductCard'
import ProductSkeleton from '@/components/public/ProductSkeleton'
import CategoryFilter from '@/components/public/CategoryFilter'
import type { Metadata } from 'next'
import type { CategoriaProducto } from '@/types'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig()
  return {
    title: `Catálogo | ${config.nombreTienda}`,
    description: `Explora todos los arreglos florales de ${config.nombreTienda}`,
  }
}

interface Props {
  searchParams: { categoria?: string }
}

export default async function CatalogoPage({ searchParams }: Props) {
  const [config, productos] = await Promise.all([getConfig(), getProductos()])

  const categoria = searchParams.categoria as CategoriaProducto | undefined
  const filtrados = categoria
    ? productos.filter((p) => p.categoria === categoria)
    : productos

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="mb-2 font-playfair text-4xl font-bold text-rose-900">Catálogo</h1>
      <p className="mb-8 text-rose-600">
        {filtrados.length} arreglo{filtrados.length !== 1 ? 's' : ''} disponible{filtrados.length !== 1 ? 's' : ''}
        {categoria && <span className="ml-1 font-medium">· {categoria}</span>}
      </p>

      <Suspense>
        <div className="mb-8">
          <CategoryFilter />
        </div>
      </Suspense>

      {filtrados.length === 0 ? (
        <p className="py-16 text-center text-rose-500">
          No hay productos en esta categoría aún.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((p) => (
            <ProductCard key={p.id} producto={p} whatsapp={config.whatsapp} />
          ))}
        </div>
      )}
    </div>
  )
}

