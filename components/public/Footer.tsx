import Link from 'next/link'
import type { Config, Red } from '@/types'

interface Props {
  config: Config
  redes: Red[]
}

const redesIcons: Record<string, string> = {
  instagram: 'fab fa-instagram',
  facebook: 'fab fa-facebook-f',
  tiktok: 'fab fa-tiktok',
  whatsapp: 'fab fa-whatsapp',
  pinterest: 'fab fa-pinterest-p',
}

export default function Footer({ config, redes }: Props) {
  return (
    <footer style={{ backgroundColor: '#0D0409' }}>
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* Marca */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col leading-none">
              <span
                className="font-playfair font-black text-2xl"
                style={{ color: '#FFF5F8' }}
              >
                {config.nombreTienda.split(' ')[0]}
              </span>
              <span
                className="font-dancing text-xl"
                style={{ color: '#FF1B6D', lineHeight: '1.4' }}
              >
                Flores &amp; Detalles
              </span>
            </div>
            <p
              className="font-nunito text-sm font-semibold leading-relaxed"
              style={{ color: 'rgba(255,245,248,0.45)' }}
            >
              {config.descripcionSeo}
            </p>
            <div className="mt-1 flex gap-3">
              {redes.filter((r) => r.url).map((r) => (
                <a
                  key={r.plataforma}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.plataforma}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:border-[#FF1B6D]"
                  style={{
                    border: '1px solid rgba(255,245,248,0.2)',
                    color: 'rgba(255,245,248,0.65)',
                  }}
                >
                  <i className={`${redesIcons[r.plataforma] ?? 'fas fa-link'} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h3 className="font-playfair text-lg font-bold" style={{ color: '#FFF5F8' }}>
              Contacto
            </h3>
            {config.ciudad && (
              <div
                className="flex items-start gap-3 font-nunito text-sm font-semibold"
                style={{ color: 'rgba(255,245,248,0.55)' }}
              >
                <i className="fas fa-map-marker-alt mt-0.5 text-xs" style={{ color: '#FF1B6D' }} />
                <span>{config.ciudad}</span>
              </div>
            )}
            {config.whatsapp && (
              <a
                href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 font-nunito text-sm font-semibold transition-colors hover:text-white"
                style={{ color: 'rgba(255,245,248,0.55)' }}
              >
                <i className="fas fa-phone mt-0.5 text-xs" style={{ color: '#FF1B6D' }} />
                <span>{config.whatsapp}</span>
              </a>
            )}
            {config.horarios && (
              <div
                className="flex items-start gap-3 font-nunito text-sm font-semibold"
                style={{ color: 'rgba(255,245,248,0.55)' }}
              >
                <i className="fas fa-clock mt-0.5 text-xs" style={{ color: '#FF1B6D' }} />
                <span className="whitespace-pre-line">{config.horarios}</span>
              </div>
            )}
          </div>

          {/* Explorar */}
          <div className="flex flex-col gap-4">
            <h3 className="font-playfair text-lg font-bold" style={{ color: '#FFF5F8' }}>
              Explorar
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/catalogo', label: 'Catálogo' },
                { href: '/catalogo?categoria=Bodas', label: 'Bodas' },
                { href: '/catalogo?categoria=Cumpleaños', label: 'Cumpleaños' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-nunito text-sm font-semibold transition-colors hover:text-white"
                  style={{ color: 'rgba(255,245,248,0.55)' }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Créditos */}
        <div
          className="mt-12 border-t pt-6 flex flex-col items-center gap-2 text-center font-nunito text-xs font-semibold sm:flex-row sm:justify-between"
          style={{ borderColor: 'rgba(255,245,248,0.08)', color: 'rgba(255,245,248,0.3)' }}
        >
          <span>© {new Date().getFullYear()} {config.nombreTienda}. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors hover:text-white"
              style={{ borderColor: 'rgba(255,245,248,0.15)', color: 'rgba(255,245,248,0.3)' }}
            >
              <i className="fas fa-user text-xs" />
              <span>Admin</span>
            </Link>
            <span>
              Desarrollado por{' '}
              <a
                href="https://www.linkedin.com/in/henry-misael-tercero-hernandez-b1bb0b191"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold transition-colors hover:text-white"
                style={{ color: 'rgba(255,245,248,0.55)' }}
              >
                Hemisterhe4G
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
