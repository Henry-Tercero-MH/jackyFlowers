import Link from 'next/link'
import { Package, CheckCircle, Star, Tag, Plus, Share2, Settings } from 'lucide-react'
import { getProductosAdmin } from '@/lib/appsscript'
import SetupButton from '@/components/admin/SetupButton'

export default async function DashboardPage() {
  const productos = await getProductosAdmin()

  const stats = {
    total:       productos.length,
    disponibles: productos.filter((p) => p.disponible).length,
    destacados:  productos.filter((p) => p.destacado).length,
    categorias:  new Set(productos.map((p) => p.categoria)).size,
  }

  const statCards = [
    { label: 'Total productos',  value: stats.total,       icon: Package,     accent: '#FF1B6D' },
    { label: 'Disponibles',      value: stats.disponibles, icon: CheckCircle, accent: '#00C4F0' },
    { label: 'Destacados',       value: stats.destacados,  icon: Star,        accent: '#FFD600' },
    { label: 'Categorías',       value: stats.categorias,  icon: Tag,         accent: '#FF8C00' },
  ]

  const accesos = [
    { href: '/admin/productos',       label: 'Ver productos',   icon: Package,  accent: '#FF1B6D' },
    { href: '/admin/productos/nuevo', label: 'Nuevo producto',  icon: Plus,     accent: '#00C4F0' },
    { href: '/admin/redes',           label: 'Redes sociales',  icon: Share2,   accent: '#FF8C00' },
    { href: '/admin/config',          label: 'Configuración',   icon: Settings, accent: '#FFD600' },
  ]

  return (
    <div className="flex flex-col gap-8">

      {/* Encabezado */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-dancing text-xl" style={{ color: '#FF1B6D' }}>
            Panel de control
          </p>
          <h1 className="font-playfair font-black text-3xl" style={{ color: '#1A0A14' }}>
            Dashboard
          </h1>
          <p className="mt-1 font-nunito text-sm font-semibold" style={{ color: 'rgba(26,10,20,0.45)' }}>
            Resumen general de tu tienda
          </p>
        </div>
        {stats.total === 0 && <SetupButton />}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className="flex flex-col gap-3 bg-white p-5"
            style={{ borderRadius: '16px', boxShadow: '0 2px 16px rgba(26,10,20,0.06)' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-nunito text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(26,10,20,0.45)' }}>
                {label}
              </span>
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${accent}18` }}
              >
                <Icon className="h-4 w-4" style={{ color: accent }} />
              </div>
            </div>
            <span className="font-playfair font-black text-4xl" style={{ color: '#1A0A14' }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div>
        <h2 className="mb-4 font-playfair font-bold text-xl" style={{ color: '#1A0A14' }}>
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {accesos.map(({ href, label, icon: Icon, accent }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-3 bg-white p-5 text-center transition-shadow hover:shadow-md"
              style={{ borderRadius: '16px', boxShadow: '0 2px 12px rgba(26,10,20,0.05)' }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                style={{ backgroundColor: `${accent}18` }}
              >
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </div>
              <span className="font-nunito text-sm font-bold" style={{ color: '#1A0A14' }}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
