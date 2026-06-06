import type { Config, Producto, ProductoForm, Red } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? ''

const MOCK_CONFIG: Config = {
  nombreTienda: 'Jacky Flores y Detalles',
  whatsapp: '+50249200595',
  descripcionSeo: 'Arreglos florales artesanales hechos con amor para cada ocasión especial.',
  horarios: 'Lun–Sáb: 8:00–18:00\nDom: 9:00–14:00',
  ciudad: 'Aldea San Marcos, El Palmar, Quetzaltenango',
  emailContacto: '',
}

const MOCK_REDES: Red[] = [
  { plataforma: 'whatsapp',  url: 'https://wa.me/50249200595',                                                                     activo: true },
  { plataforma: 'facebook',  url: 'https://www.facebook.com/share/1FTb4meVci/?mibextid=wwXIfr',                                    activo: true },
  { plataforma: 'instagram', url: 'https://www.instagram.com/arriolajackelline?igsh=aHpnNmVldnB5aWpn&utm_source=qr',               activo: true },
]

const isConfigured = BASE_URL && !BASE_URL.includes('TU_ID')

async function get<T>(action: string, params: Record<string, string> = {}): Promise<T> {
  if (!isConfigured) {
    console.warn('⚠ Apps Script no configurado, usando mock data')
    if (action === 'getProductos' || action === 'getProductosAdmin') return [] as T
    if (action === 'getRedes') return MOCK_REDES as T
    if (action === 'getConfig') return MOCK_CONFIG as T
    throw new Error('Apps Script no configurado')
  }

  const url = new URL(BASE_URL)
  url.searchParams.set('action', action)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  // Import dinámico: fetchIpv4 usa node:https y solo debe correr server-side.
  const { fetchIpv4 } = await import('./fetchIpv4')
  const { text } = await fetchIpv4(url.toString())

  // Si es HTML, devuelve mock data
  if (text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
    console.warn('⚠ Apps Script no responde correctamente, usando mock data')
    if (action === 'getProductos') return [] as T
    if (action === 'getProductosAdmin') return [] as T
    if (action === 'getRedes') return MOCK_REDES as T
    if (action === 'getConfig') return MOCK_CONFIG as T
    throw new Error('Mock data no disponible para ' + action)
  }

  try {
    const json = JSON.parse(text)
    if (json.error) throw new Error(json.error)
    return json as T
  } catch {
    throw new Error(`Respuesta inválida del servidor: ${text.slice(0, 100)}`)
  }
}

async function post<T>(body: Record<string, unknown>): Promise<T> {
  // Llama al proxy Next.js (/api/appsscript) para evitar CORS.
  // El proxy reenvía la petición a Apps Script server-side.
  const proxyUrl = typeof window !== 'undefined'
    ? '/api/appsscript'
    : `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/appsscript`

  const res = await fetch(proxyUrl, {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json as T
}

// ── Públicas ────────────────────────────────────────────────

export async function getProductos(): Promise<Producto[]> {
  if (!isConfigured) return []
  return get<Producto[]>('getProductos')
}

export async function getProductosAdmin(): Promise<Producto[]> {
  if (!isConfigured) return []
  return get<Producto[]>('getProductosAdmin')
}

export async function getProducto(id: string): Promise<Producto> {
  return get<Producto>('getProducto', { id })
}

export async function getRedes(): Promise<Red[]> {
  if (!isConfigured) return MOCK_REDES
  try {
    return await get<Red[]>('getRedes')
  } catch (err) {
    console.warn('⚠ No se pudo obtener redes, usando mock data')
    return MOCK_REDES
  }
}

export async function getConfig(): Promise<Config> {
  if (!isConfigured) return MOCK_CONFIG
  try {
    return await get<Config>('getConfig')
  } catch (err) {
    console.warn('⚠ No se pudo obtener config, usando mock data')
    return MOCK_CONFIG
  }
}

// ── Admin ───────────────────────────────────────────────────

export async function crearProducto(data: ProductoForm): Promise<{ id: string }> {
  return post({ action: 'crearProducto', ...data })
}

export async function actualizarProducto(id: string, data: Partial<ProductoForm>): Promise<{ ok: boolean }> {
  return post({ action: 'actualizarProducto', id, ...data })
}

export async function eliminarProducto(id: string): Promise<{ ok: boolean }> {
  return post({ action: 'eliminarProducto', id })
}

export async function subirImagen(file: File): Promise<{ imagenUrl: string }> {
  const base64 = await fileToBase64(file)
  return post({
    action: 'subirImagen',
    base64,
    nombreArchivo: file.name,
    mimeType: file.type,
  })
}

export async function updateRedes(redes: Red[]): Promise<{ ok: boolean }> {
  return post({ action: 'updateRedes', redes })
}

export async function updateConfig(config: Partial<Config>): Promise<{ ok: boolean }> {
  return post({ action: 'updateConfig', config })
}

// ── Helper ──────────────────────────────────────────────────

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
