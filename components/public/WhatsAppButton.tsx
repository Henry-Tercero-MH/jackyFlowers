'use client'

import { MessageCircle } from 'lucide-react'

interface Props {
  whatsapp: string
  mensaje?: string
}

export default function WhatsAppButton({ whatsapp, mensaje }: Props) {
  const numero = whatsapp.replace(/\D/g, '')
  const texto = encodeURIComponent(mensaje ?? 'Hola, me gustaría hacer un pedido 🌸')
  const href = `https://wa.me/${numero}?text=${texto}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </a>
  )
}
