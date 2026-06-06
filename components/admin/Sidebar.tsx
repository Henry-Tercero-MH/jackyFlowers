'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Package,
  Share2,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/admin',           label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos',       icon: Package },
  { href: '/admin/redes',     label: 'Redes Sociales',  icon: Share2 },
  { href: '/admin/config',    label: 'Configuración',   icon: Settings },
]

interface Props {
  userName: string
  userEmail: string
}

function SidebarContent({ userName, userEmail, onClose }: Props & { onClose?: () => void }) {
  const pathname = usePathname()
  const initials = userName.slice(0, 2).toUpperCase()

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: '#1A0A14' }}>

      {/* Logo */}
      <div
        className="flex flex-col px-6 py-6 leading-none"
        style={{ borderBottom: '1px solid rgba(255,245,248,0.07)' }}
      >
        <span className="font-playfair font-black text-xl" style={{ color: '#FFF5F8' }}>
          Jacky
        </span>
        <span className="font-dancing text-base" style={{ color: '#FF1B6D', lineHeight: '1.3' }}>
          Panel Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-nunito text-sm font-semibold transition-colors"
              style={{
                backgroundColor: active ? 'rgba(255,27,109,0.15)' : 'transparent',
                color: active ? '#FF1B6D' : 'rgba(255,245,248,0.6)',
              }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Usuario */}
      <div
        className="p-4"
        style={{ borderTop: '1px solid rgba(255,245,248,0.07)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-playfair font-black text-sm text-white"
            style={{ backgroundColor: '#FF1B6D' }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-nunito text-sm font-bold" style={{ color: '#FFF5F8' }}>
              {userName}
            </p>
            <p className="truncate font-nunito text-xs font-semibold" style={{ color: 'rgba(255,245,248,0.4)' }}>
              {userEmail}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="shrink-0 rounded-lg p-1.5 transition-colors"
            style={{ color: 'rgba(255,245,248,0.4)' }}
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ userName, userEmail }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-60 shrink-0 md:flex md:flex-col" style={{ backgroundColor: '#1A0A14' }}>
        <SidebarContent userName={userName} userEmail={userEmail} />
      </aside>

      {/* Botón hamburger móvil */}
      <button
        className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl md:hidden"
        style={{ backgroundColor: '#1A0A14', color: '#FFF5F8' }}
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Drawer móvil */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-60 shadow-2xl" style={{ backgroundColor: '#1A0A14' }}>
            <button
              className="absolute right-3 top-3 rounded-lg p-1.5"
              style={{ color: 'rgba(255,245,248,0.5)' }}
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent
              userName={userName}
              userEmail={userEmail}
              onClose={() => setMobileOpen(false)}
            />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  )
}
