import Link from 'next/link'
import Image from 'next/image'
import { getConfig, getProductos } from '@/lib/appsscript'
import HeroSection from '@/components/public/HeroSection'
import FadeUp from '@/components/public/FadeUp'
import ProductCardEditorial from '@/components/public/ProductCardEditorial'

export const revalidate = 3600

const stripPoints = [
  {
    num: '01',
    titulo: 'Flores Siempre Frescas',
    desc: 'Seleccionamos cada flor con cuidado para garantizar la máxima frescura en cada arreglo.',
  },
  {
    num: '02',
    titulo: 'Diseño Artesanal',
    desc: 'Cada arreglo es una obra única, creada a mano con amor y atención al detalle.',
  },
  {
    num: '03',
    titulo: 'Entrega Especial',
    desc: 'Llevamos tu arreglo con el mismo cuidado con que fue creado, directo a quien lo merece.',
  },
]

const testimonios = [
  {
    texto: 'Los arreglos son simplemente hermosos. Jacky tiene una habilidad especial para capturar exactamente lo que quieres expresar.',
    nombre: 'María José',
    inicial: 'M',
    color: '#FF8C00',
  },
  {
    texto: 'Pedí un arreglo para el cumpleaños de mi mamá y quedó encantada. La calidad y frescura de las flores es increíble.',
    nombre: 'Carlos Rodríguez',
    inicial: 'C',
    color: '#00C4F0',
  },
  {
    texto: 'Para nuestra boda Jacky creó algo mágico. Cada detalle fue perfecto y las flores duraron muchísimo tiempo.',
    nombre: 'Ana & Roberto',
    inicial: 'A',
    color: '#FF1B6D',
  },
]

const galeriaImages = [
  {
    src: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=800&auto=format&fit=crop&q=80',
    alt: 'Arreglo floral principal',
  },
  {
    src: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80',
    alt: 'Ramo de flores',
  },
  {
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=80',
    alt: 'Flores decorativas',
  },
  {
    src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
    alt: 'Arreglo de bodas',
  },
  {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80',
    alt: 'Flores frescas',
  },
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
    alt: 'Bouquet artesanal',
  },
]

export default async function HomePage() {
  const [config, productos] = await Promise.all([getConfig(), getProductos()])
  const destacados = productos.filter((p) => p.destacado).slice(0, 6)

  return (
    <>
      {/* Hero split */}
      <HeroSection nombreTienda={config.nombreTienda} descripcionSeo={config.descripcionSeo} />

      {/* Strip horizontal oscuro — gradiente hot pink a oscuro */}
      <section
        className="px-6 py-20 md:px-12"
        style={{ background: 'linear-gradient(135deg, #FF1B6D 0%, #1A0A14 100%)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeUp>
              <p className="mb-3 font-dancing text-xl" style={{ color: 'rgba(255,245,248,0.7)' }}>
                Por qué elegirnos
              </p>
              <h2
                className="font-playfair font-black text-4xl leading-tight md:text-5xl"
                style={{ color: '#FFF5F8' }}
              >
                Cada flor cuenta
                <br />
                <span className="italic" style={{ color: '#FFD600' }}>
                  una historia
                </span>
              </h2>
            </FadeUp>

            <div className="flex flex-col gap-8">
              {stripPoints.map((p, i) => (
                <FadeUp key={p.num} delay={i * 100}>
                  <div className="flex items-start gap-5">
                    <span
                      className="shrink-0 font-playfair font-black text-5xl leading-none"
                      style={{ color: 'rgba(255,245,248,0.12)' }}
                    >
                      {p.num}
                    </span>
                    <div>
                      <h3
                        className="mb-1 font-playfair font-bold text-xl"
                        style={{ color: '#FFF5F8' }}
                      >
                        {p.titulo}
                      </h3>
                      <p
                        className="font-nunito text-sm font-semibold leading-relaxed"
                        style={{ color: 'rgba(255,245,248,0.58)' }}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grilla de productos — 3 columnas */}
      {destacados.length > 0 && (
        <section className="px-6 py-24 md:px-12" style={{ backgroundColor: '#FFF5F8' }}>
          <div className="mx-auto max-w-7xl">
            <FadeUp>
              <p className="mb-2 text-center font-dancing text-2xl" style={{ color: '#FF1B6D' }}>
                Nuestro menú
              </p>
              <h2
                className="mb-3 text-center font-playfair font-black text-4xl md:text-5xl"
                style={{ color: '#1A0A14' }}
              >
                Arreglos{' '}
                <span className="italic" style={{ color: '#FF1B6D' }}>
                  destacados
                </span>
              </h2>
              <p
                className="mb-14 text-center font-nunito text-base font-semibold"
                style={{ color: 'rgba(26,10,20,0.5)' }}
              >
                Los favoritos de nuestros clientes
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destacados.map((p, i) => (
                <FadeUp key={p.id} delay={i * 80}>
                  <ProductCardEditorial producto={p} whatsapp={config.whatsapp} />
                </FadeUp>
              ))}
            </div>

            <FadeUp>
              <div className="mt-14 text-center">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 rounded-full border-2 px-10 py-4 font-nunito text-sm font-bold tracking-wider transition-all hover:bg-[#FF1B6D] hover:text-white hover:border-[#FF1B6D]"
                  style={{ borderColor: '#FF1B6D', color: '#FF1B6D' }}
                >
                  Ver catálogo completo
                  <i className="fas fa-arrow-right text-xs" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* Banner editorial — Nuestra historia */}
      <section className="px-6 py-24 md:px-12" style={{ backgroundColor: '#FFF5F8' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 md:grid-cols-2">

            {/* Imagen con badge flotante */}
            <FadeUp>
              <div className="relative">
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ borderRadius: '24px' }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1603830187457-a7fecda877bc?q=80&w=800&auto=format&fit=crop"
                    alt="Nuestra historia"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Badge dato clave flotante */}
                <div
                  className="absolute bottom-6 right-6 rounded-2xl px-5 py-4 shadow-2xl"
                  style={{ backgroundColor: '#FF1B6D' }}
                >
                  <span className="block font-playfair font-black text-3xl text-white">3+</span>
                  <span
                    className="block font-nunito text-xs font-bold text-white"
                    style={{ opacity: 0.9 }}
                  >
                    años creando
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* Texto + lista de features */}
            <FadeUp delay={150}>
              <p className="mb-3 font-dancing text-2xl" style={{ color: '#FF1B6D' }}>
                Nuestra historia
              </p>
              <h2
                className="mb-6 font-playfair font-black text-4xl leading-tight md:text-5xl"
                style={{ color: '#1A0A14' }}
              >
                Pasión que florece en cada{' '}
                <span className="italic" style={{ color: '#FF1B6D' }}>
                  creación
                </span>
              </h2>
              <p
                className="mb-8 font-nunito text-base font-semibold leading-relaxed"
                style={{ color: 'rgba(26,10,20,0.62)' }}
              >
                Jacky es una emprendedora apasionada, inspirada desde pequeña en el amor por la
                naturaleza. Cada arreglo que crea es más que flores: es una obra de arte llena de
                emociones, diseñada para transmitir amor, alegría y gratitud.
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  'Flores frescas seleccionadas a mano',
                  'Diseños únicos para cada ocasión',
                  'Atención personalizada siempre',
                  'Entrega puntual y con cuidado',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: '#FF1B6D' }}
                    />
                    <span
                      className="font-nunito text-sm font-semibold"
                      style={{ color: 'rgba(26,10,20,0.72)' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section
        className="px-6 py-24 md:px-12"
        style={{ background: 'linear-gradient(135deg, #FFF5F8 0%, #FFE4EF 100%)' }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className="mb-2 text-center font-dancing text-2xl" style={{ color: '#FF1B6D' }}>
              Lo que dicen nuestros clientes
            </p>
            <h2
              className="mb-14 text-center font-playfair font-black text-4xl md:text-5xl"
              style={{ color: '#1A0A14' }}
            >
              Palabras que nos{' '}
              <span className="italic" style={{ color: '#FF1B6D' }}>
                inspiran
              </span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonios.map((t, i) => (
              <FadeUp key={t.nombre} delay={i * 100}>
                <div
                  className="flex flex-col gap-4 bg-white p-8"
                  style={{
                    borderRadius: '20px',
                    boxShadow: '0 4px 24px rgba(255,27,109,0.07)',
                  }}
                >
                  {/* Comilla tipográfica grande en Playfair */}
                  <span
                    className="font-playfair font-black text-7xl leading-none"
                    style={{ color: '#FFD6E7' }}
                  >
                    &ldquo;
                  </span>
                  <p
                    className="font-playfair italic text-base leading-relaxed"
                    style={{ color: 'rgba(26,10,20,0.72)' }}
                  >
                    {t.texto}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-playfair font-black text-base text-white"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.inicial}
                    </div>
                    <span className="font-nunito text-sm font-bold" style={{ color: '#1A0A14' }}>
                      {t.nombre}
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Galería bento — 6 columnas / 2 filas, primera imagen ocupa 2×2 */}
      <section className="px-6 py-24 md:px-12" style={{ backgroundColor: '#1A0A14' }}>
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className="mb-2 text-center font-dancing text-2xl" style={{ color: '#FF1B6D' }}>
              Nuestra galería
            </p>
            <h2
              className="mb-12 text-center font-playfair font-black text-4xl md:text-5xl"
              style={{ color: '#FFF5F8' }}
            >
              Arte en cada{' '}
              <span className="italic" style={{ color: '#FFD600' }}>
                pétalo
              </span>
            </h2>
          </FadeUp>

          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridTemplateRows: 'repeat(2, 220px)',
            }}
          >
            {galeriaImages.map((img, i) => (
              <div
                key={img.alt}
                className="relative overflow-hidden"
                style={{
                  borderRadius: '16px',
                  gridColumn: i === 0 ? 'span 2' : 'span 1',
                  gridRow: i === 0 ? 'span 2' : 'span 1',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto — fondo oscuro gradiente morado, split 50/50 */}
      <section
        id="contacto"
        className="px-6 py-24 md:px-12"
        style={{ background: 'linear-gradient(135deg, #1A0A14 0%, #2D0A22 100%)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* Izquierda: título + CTA */}
            <FadeUp>
              <p className="mb-3 font-dancing text-2xl" style={{ color: '#FF1B6D' }}>
                Estamos para ti
              </p>
              <h2
                className="mb-6 font-playfair font-black text-4xl leading-tight md:text-5xl"
                style={{ color: '#FFF5F8' }}
              >
                ¿Listo para crear algo{' '}
                <span className="italic" style={{ color: '#FF1B6D' }}>
                  especial?
                </span>
              </h2>
              <p
                className="mb-8 font-nunito text-base font-semibold leading-relaxed"
                style={{ color: 'rgba(255,245,248,0.58)' }}
              >
                Cuéntanos tu idea y juntos crearemos el arreglo perfecto para tu momento especial.
              </p>
              <a
                href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-nunito text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#FF1B6D' }}
              >
                <i className="fab fa-whatsapp text-lg" />
                Escribir por WhatsApp
              </a>
            </FadeUp>

            {/* Derecha: tarjetas de info con icono en caja coloreada semitransparente */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: 'fas fa-map-marker-alt',
                  color: '#FF1B6D',
                  label: 'Ubicación',
                  value: config.ciudad || 'Guatemala',
                },
                {
                  icon: 'fas fa-phone',
                  color: '#FF8C00',
                  label: 'WhatsApp',
                  value: config.whatsapp,
                },
                {
                  icon: 'fas fa-clock',
                  color: '#00C4F0',
                  label: 'Horarios',
                  value: config.horarios || 'Lunes a Sábado 8:00 – 18:00',
                },
              ].map((item, i) => (
                <FadeUp key={item.label} delay={i * 80}>
                  <div
                    className="flex items-center gap-4 p-5"
                    style={{
                      backgroundColor: 'rgba(255,245,248,0.04)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,245,248,0.07)',
                    }}
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${item.color}22` }}
                    >
                      <i className={`${item.icon} text-base`} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p
                        className="mb-0.5 font-nunito text-xs font-bold uppercase tracking-widest"
                        style={{ color: 'rgba(255,245,248,0.38)' }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="font-nunito text-sm font-semibold whitespace-pre-line"
                        style={{ color: '#FFF5F8' }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
