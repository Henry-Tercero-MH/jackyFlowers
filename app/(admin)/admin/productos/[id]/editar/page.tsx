import { notFound } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { getProducto } from '@/lib/appsscript'

interface Props {
  params: { id: string }
}

export default async function EditarProductoPage({ params }: Props) {
  const producto = await getProducto(params.id).catch(() => null)
  if (!producto) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-dancing text-xl" style={{ color: '#FF1B6D' }}>
          Catálogo
        </p>
        <h1 className="font-playfair font-black text-3xl" style={{ color: '#1A0A14' }}>
          Editar Producto
        </h1>
        <p className="mt-1 max-w-md truncate font-nunito text-sm font-semibold" style={{ color: 'rgba(26,10,20,0.45)' }}>
          {producto.nombre}
        </p>
      </div>

      <div
        className="bg-white p-6 md:p-8"
        style={{ borderRadius: '20px', boxShadow: '0 2px 16px rgba(26,10,20,0.06)' }}
      >
        <h2 className="mb-6 font-playfair font-bold text-lg" style={{ color: '#1A0A14' }}>
          Información del producto
        </h2>
        <ProductForm producto={producto} />
      </div>
    </div>
  )
}
