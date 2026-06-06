import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getProductosAdmin } from '@/lib/appsscript'
import ProductsTable from '@/components/admin/ProductsTable'

export default async function ProductosPage() {
  const productos = await getProductosAdmin()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-dancing text-xl" style={{ color: '#FF1B6D' }}>
            Gestión
          </p>
          <h1 className="font-playfair font-black text-3xl" style={{ color: '#1A0A14' }}>
            Productos
          </h1>
          <p className="mt-1 font-nunito text-sm font-semibold" style={{ color: 'rgba(26,10,20,0.45)' }}>
            {productos.length} productos en total
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-nunito text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#FF1B6D' }}
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </div>

      <ProductsTable initialProductos={productos} />
    </div>
  )
}
