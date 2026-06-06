import { NextRequest, NextResponse } from 'next/server'

const APPS_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function POST(req: NextRequest) {
  try {
    console.log('📝 [CREATE-ADMIN] Solicitud recibida')
    const { usuario, contraseña, email } = await req.json()
    console.log('👤 [CREATE-ADMIN] Usuario:', usuario)
    console.log('📧 [CREATE-ADMIN] Email:', email)

    if (!usuario || !contraseña || !email) {
      console.log('❌ [CREATE-ADMIN] Faltan campos')
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const passwordHash = await hashPassword(contraseña)
    console.log('🔑 [CREATE-ADMIN] Hash generado:', passwordHash.slice(0, 16) + '...')

    console.log('📡 [CREATE-ADMIN] Enviando a Apps Script...')
    console.log('📡 [CREATE-ADMIN] URL:', APPS_URL)

    const res = await fetch(APPS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'crearUsuario',
        usuario,
        passwordHash,
        email,
      }),
    })

    const text = await res.text()
    console.log('📡 [CREATE-ADMIN] Respuesta:', text.slice(0, 200))

    // Si es HTML, Apps Script no está configurado
    if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
      console.log('❌ [CREATE-ADMIN] Apps Script devolvió HTML')
      return NextResponse.json(
        { error: 'Apps Script no publicado correctamente. Verifica que esté como Web App.' },
        { status: 400 }
      )
    }

    const data = JSON.parse(text)
    console.log('✓ [CREATE-ADMIN] Respuesta JSON parseada:', data)

    if (data.error) {
      console.log('❌ [CREATE-ADMIN] Error:', data.error)
      return NextResponse.json({ error: data.error }, { status: 400 })
    }

    console.log('✅ [CREATE-ADMIN] Usuario creado exitosamente')
    return NextResponse.json({
      ok: true,
      mensaje: 'Usuario creado exitosamente',
    })
  } catch (err) {
    console.error('❌ [CREATE-ADMIN] Error:', String(err))
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    )
  }
}
