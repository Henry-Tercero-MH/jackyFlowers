import { getRedes } from '@/lib/appsscript'
import RedesForm from '@/components/admin/RedesForm'

export default async function RedesPage() {
  const redes = await getRedes()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-dancing text-xl" style={{ color: '#FF1B6D' }}>
          Presencia digital
        </p>
        <h1 className="font-playfair font-black text-3xl" style={{ color: '#1A0A14' }}>
          Redes Sociales
        </h1>
        <p className="mt-1 font-nunito text-sm font-semibold" style={{ color: 'rgba(26,10,20,0.45)' }}>
          Administrá los links de tus redes
        </p>
      </div>
      <div className="max-w-xl">
        <RedesForm initialRedes={redes} />
      </div>
    </div>
  )
}
