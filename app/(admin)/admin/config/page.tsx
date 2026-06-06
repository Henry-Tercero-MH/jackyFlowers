import { getConfig } from '@/lib/appsscript'
import ConfigForm from '@/components/admin/ConfigForm'

export default async function ConfigPage() {
  const config = await getConfig()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-dancing text-xl" style={{ color: '#FF1B6D' }}>
          Ajustes
        </p>
        <h1 className="font-playfair font-black text-3xl" style={{ color: '#1A0A14' }}>
          Configuración
        </h1>
        <p className="mt-1 font-nunito text-sm font-semibold" style={{ color: 'rgba(26,10,20,0.45)' }}>
          Datos generales de tu tienda
        </p>
      </div>
      <ConfigForm initialConfig={config} />
    </div>
  )
}
