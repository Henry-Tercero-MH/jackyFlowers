import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

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
    const { username, password } = await req.json()

    // Calculate hash
    const passwordHash = await hashPassword(password)
    console.log('🔐 [DEBUG] Hash de "' + password + '":', passwordHash)

    // Read admins.json
    const adminsPath = join(process.cwd(), 'public', 'admins.json')
    console.log('📂 [DEBUG] Ruta:', adminsPath)
    console.log('📂 [DEBUG] cwd:', process.cwd())

    const adminData = await readFile(adminsPath, 'utf-8')
    console.log('📄 [DEBUG] Contenido leído')

    const admins = JSON.parse(adminData) as Record<string, { passwordHash: string; email: string }>
    console.log('📋 [DEBUG] Admins en archivo:', Object.keys(admins))

    const admin = admins[username]
    console.log('👤 [DEBUG] Admin encontrado:', !!admin)

    if (admin) {
      console.log('🔑 [DEBUG] Hash esperado:', passwordHash)
      console.log('🔑 [DEBUG] Hash en archivo:', admin.passwordHash)
      console.log('✓ [DEBUG] Match:', admin.passwordHash === passwordHash)
    }

    return NextResponse.json({
      username,
      password,
      passwordHash,
      adminExists: !!admin,
      adminData: admin || null,
      match: admin ? admin.passwordHash === passwordHash : false,
    })
  } catch (err) {
    console.error('❌ [DEBUG]:', err)
    return NextResponse.json({
      error: String(err),
    }, { status: 500 })
  }
}
