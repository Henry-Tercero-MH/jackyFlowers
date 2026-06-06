import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        const passwordHash = await hashPassword(credentials.password as string)
        const username = credentials.username as string

        try {
          // Intenta con Apps Script
          const res = await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'login',
              usuario: username,
              passwordHash,
            }),
          })

          const text = await res.text()

          if (!text.startsWith('<!DOCTYPE') && !text.startsWith('<html')) {
            const data = JSON.parse(text)
            if (data.ok) {
              return {
                id: username,
                name: username,
                email: data.email as string,
              }
            }
          }
        } catch (err) {
          // Fall through to local auth
        }

        // Fallback: verificar en admins.json local
        try {
          const baseDir = process.env.PWD || process.cwd()
          const adminsPath = join(baseDir, 'public', 'admins.json')
          console.log('🔐 [AUTH] Leyendo:', adminsPath)
          const adminData = await readFile(adminsPath, 'utf-8')
          const admins = JSON.parse(adminData) as Record<string, { passwordHash: string; email: string }>
          const admin = admins[username]

          if (admin && admin.passwordHash === passwordHash) {
            console.log('✅ [AUTH] OK -', username)
            return {
              id: username,
              name: username,
              email: admin.email,
            }
          }
          console.log('❌ [AUTH] Credenciales inválidas o usuario no existe')
        } catch (err) {
          console.error('❌ [AUTH] Error:', String(err).slice(0, 100))
        }

        return null
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  pages: { signIn: '/login' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.username = user.name
        token.email = user.email
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.name = token.username as string
        session.user.email = token.email as string
      }
      return session
    },
  },
})
