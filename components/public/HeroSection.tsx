import Link from 'next/link'
import Image from 'next/image'

interface Props {
  nombreTienda: string
  descripcionSeo: string
}

const stats = [
  { value: '500+', label: 'Arreglos creados' },
  { value: '4.9★', label: 'Calificación' },
  { value: '3 años', label: 'De experiencia' },
]

export default function HeroSection({ nombreTienda, descripcionSeo }: Props) {
  return (
    <section className="relative grid min-h-screen md:grid-cols-2">
      {/* Izquierda — contenido editorial */}
      <div
        className="flex flex-col justify-center px-8 py-24 md:px-16 lg:px-20"
        style={{ backgroundColor: '#FFF5F8' }}
      >
        <p
          className="mb-5 font-dancing text-2xl"
          style={{ color: '#FF1B6D' }}
        >
          Arreglos florales artesanales
        </p>

        <h1
          className="font-playfair font-black leading-[1.05] text-5xl lg:text-6xl xl:text-7xl"
          style={{ color: '#1A0A14' }}
        >
          Flores que{' '}
          <em
            className="not-italic font-playfair font-black italic"
            style={{ color: '#FF1B6D' }}
          >
            hablan
          </em>{' '}
          por ti
        </h1>

        <p
          className="mt-6 max-w-md font-nunito text-base font-semibold leading-relaxed"
          style={{ color: 'rgba(26,10,20,0.65)' }}
        >
          {descripcionSeo || 'Diseñamos arreglos únicos llenos de emoción y detalle para cada momento especial de tu vida.'}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/catalogo"
            className="rounded-full px-8 py-3.5 font-nunito text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#FF1B6D' }}
          >
            Ver catálogo
          </Link>
          <Link
            href="#contacto"
            className="rounded-full border-2 border-[#1A0A14] px-8 py-3.5 font-nunito text-sm font-bold text-[#1A0A14] transition-colors hover:bg-[#1A0A14] hover:text-white"
          >
            Contáctanos
          </Link>
        </div>

        {/* Estadísticas separadas por línea horizontal */}
        <div
          className="mt-12 border-t pt-8 flex flex-wrap gap-10"
          style={{ borderColor: 'rgba(26,10,20,0.12)' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span
                className="font-playfair font-black text-3xl"
                style={{ color: '#FF1B6D' }}
              >
                {s.value}
              </span>
              <span
                className="font-nunito text-sm font-semibold"
                style={{ color: 'rgba(26,10,20,0.55)' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Derecha — imagen full-height con overlay gradiente */}
      <div className="relative min-h-[55vw] md:min-h-0">
        <Image
          src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={nombreTienda}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,27,109,0.2) 0%, rgba(26,10,20,0.35) 100%)',
          }}
        />
      </div>
    </section>
  )
}
