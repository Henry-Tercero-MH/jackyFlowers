'use client'

import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa'

interface Props {
  whatsapp: string
  facebook?: string
  instagram?: string
}

export default function FloatingButtons({ whatsapp, facebook, instagram }: Props) {
  const numero = whatsapp.replace(/\D/g, '')
  const waHref = `https://wa.me/${numero}?text=${encodeURIComponent('Hola, me gustaría hacer un pedido 🌸')}`

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: '#25D366' }}
      >
        <FaWhatsapp className="h-6 w-6 text-white" />
      </a>

      {/* Facebook */}
      {facebook && (
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visitar página de Facebook"
          className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
          style={{ backgroundColor: '#1877F2' }}
        >
          <FaFacebook className="h-6 w-6 text-white" />
        </a>
      )}

      {/* Instagram */}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visitar perfil de Instagram"
          className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
          style={{
            background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
          }}
        >
          <FaInstagram className="h-6 w-6 text-white" />
        </a>
      )}
    </div>
  )
}
