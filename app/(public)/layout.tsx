import { getConfig, getRedes } from '@/lib/appsscript'
import type { Red, Config } from '@/types'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import FloatingButtons from '@/components/public/FloatingButtons'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  console.log('📄 [LAYOUT] Iniciando PublicLayout')

  let config = {
    nombreTienda: 'Jacky Flores y Detalles',
    whatsapp: '+50249200595',
    descripcionSeo: 'Arreglos florales artesanales',
    horarios: '',
    ciudad: '',
    emailContacto: '',
  }

  let redes: Red[] = [
    { plataforma: 'whatsapp', url: 'https://wa.me/50249200595', activo: true },
    { plataforma: 'facebook', url: '', activo: true },
    { plataforma: 'instagram', url: '', activo: true },
  ]

  try {
    console.log('📡 [LAYOUT] Obteniendo config y redes...')
    const [c, r] = await Promise.all([getConfig(), getRedes()])
    console.log('✓ [LAYOUT] Config obtenido:', c.nombreTienda)
    console.log('✓ [LAYOUT] Redes obtenidas:', r.length)
    config = c
    redes = r
  } catch (err) {
    console.error('❌ [LAYOUT] Error loading config/redes:', String(err).slice(0, 200))
  }

  console.log('✓ [LAYOUT] Layout renderizado exitosamente')

  const facebook  = redes.find(r => r.plataforma === 'facebook')?.url
  const instagram = redes.find(r => r.plataforma === 'instagram')?.url

  return (
    <>
      <Navbar nombreTienda={config.nombreTienda} />
      <main>{children}</main>
      <Footer config={config} redes={redes} />
      <FloatingButtons
        whatsapp={config.whatsapp}
        facebook={facebook}
        instagram={instagram}
      />
    </>
  )
}
