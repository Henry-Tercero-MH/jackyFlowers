import { NextRequest, NextResponse } from 'next/server'
import { fetchIpv4 } from '@/lib/fetchIpv4'

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? ''

// GET — diagnóstico: verifica que Apps Script responda correctamente
export async function GET() {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ ok: false, error: 'NEXT_PUBLIC_APPS_SCRIPT_URL no está definida en .env.local' })
  }

  try {
    const url = new URL(APPS_SCRIPT_URL)
    url.searchParams.set('action', 'ping')
    const { text } = await fetchIpv4(url.toString())

    if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
      return NextResponse.json({
        ok: false,
        error: 'Apps Script devuelve HTML — publicalo como Web App con acceso "Anyone" (sin cuenta de Google requerida)',
        hint: 'Implementar → Administrar implementaciones → editar → "Quién tiene acceso: Anyone"',
      })
    }

    return NextResponse.json({ ok: true, response: JSON.parse(text) })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) })
  }
}

// POST — proxy: reenvía peticiones del cliente a Apps Script (evita CORS)
export async function POST(req: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ error: 'NEXT_PUBLIC_APPS_SCRIPT_URL no está definida en .env.local' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  let text: string
  try {
    const upstream = await fetchIpv4(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    text = upstream.text
  } catch (err) {
    return NextResponse.json(
      { error: 'Sin conexión con Apps Script: ' + String(err) },
      { status: 502 }
    )
  }

  if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
    return NextResponse.json(
      {
        error: 'Apps Script requiere autenticación. Publicalo con acceso "Anyone" en lugar de "Anyone with Google account".',
        hint: 'Implementar → Administrar implementaciones → editar → cambiar acceso',
      },
      { status: 502 }
    )
  }

  try {
    const json = JSON.parse(text)
    return NextResponse.json(json)
  } catch {
    return NextResponse.json(
      { error: 'Respuesta inesperada de Apps Script', raw: text.slice(0, 200) },
      { status: 502 }
    )
  }
}
