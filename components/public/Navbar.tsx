'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'INICIO' },
  { href: '/catalogo', label: 'CATÁLOGO' },
  { href: '/#contacto', label: 'CONTACTO' },
]

interface Props {
  nombreTienda: string
}

export default function Navbar({ nombreTienda }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const nombre = nombreTienda.split(' ')[0] || nombreTienda

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255,245,248,0.88)',
        borderBottom: '1px solid rgba(255,27,109,0.12)',
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">

        {/* Logo tipográfico — dos líneas */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="font-playfair font-black text-2xl tracking-tight"
            style={{ color: '#1A0A14' }}
          >
            {nombre}
          </span>
          <span
            className="font-dancing text-base"
            style={{ color: '#FF1B6D', lineHeight: '1.2' }}
          >
            Flores &amp; Detalles
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-nunito text-xs font-bold tracking-widest transition-colors hover:text-[#FF1B6D]"
              style={{ color: pathname === l.href ? '#FF1B6D' : '#1A0A14' }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/catalogo"
            className="rounded-full px-6 py-2.5 font-nunito text-xs font-bold tracking-widest text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#1A0A14' }}
          >
            VER TIENDA
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
            style={{ backgroundColor: '#1A0A14' }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${open ? 'opacity-0' : ''}`}
            style={{ backgroundColor: '#1A0A14' }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}
            style={{ backgroundColor: '#1A0A14' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="px-6 pb-6 md:hidden"
          style={{ borderTop: '1px solid rgba(255,27,109,0.1)' }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-nunito text-xs font-bold tracking-widest transition-colors"
              style={{ color: pathname === l.href ? '#FF1B6D' : '#1A0A14' }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/catalogo"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full px-6 py-3 text-center font-nunito text-xs font-bold tracking-widest text-white"
            style={{ backgroundColor: '#1A0A14' }}
          >
            VER TIENDA
          </Link>
        </nav>
      )}
    </header>
  )
}
