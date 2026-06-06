import type { MetadataRoute } from 'next'
import { getProductos } from '@/lib/appsscript'

const BASE_URL = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productos = await getProductos().catch(() => [])

  const static_: MetadataRoute.Sitemap = [
    { url: BASE_URL,            lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/catalogo`, lastModified: new Date(), priority: 0.9 },
  ]

  const dynamic: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${BASE_URL}/catalogo/${p.id}`,
    lastModified: new Date(p.fechaCreacion || Date.now()),
    priority: 0.7,
  }))

  return [...static_, ...dynamic]
}
