import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'

export const metadata = {
  robots: 'noindex, nofollow',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F2F5' }}>
      <Sidebar
        userName={session.user?.name ?? 'Admin'}
        userEmail={session.user?.email ?? ''}
      />
      <div className="flex-1 overflow-auto">
        <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  )
}
