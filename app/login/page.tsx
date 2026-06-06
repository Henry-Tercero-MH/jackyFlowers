'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormData = {
  username: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })
    setLoading(false)

    if (result?.error) {
      toast.error('Usuario o contraseña incorrectos')
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  const createTestUser = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: 'jacky',
          contraseña: '123456',
          email: 'jacky@flores.com',
        }),
      })
      const data = await res.json()
      if (data.ok) {
        toast.success('Usuario creado: jacky / 123456')
      } else {
        toast.error(data.error || 'Error al crear usuario')
      }
    } catch (err) {
      toast.error('Error: ' + String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">

      {/* Izquierda — identidad de marca */}
      <div
        className="hidden flex-col justify-between p-12 md:flex md:w-1/2"
        style={{ background: 'linear-gradient(160deg, #1A0A14 0%, #2D0A22 100%)' }}
      >
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span className="font-playfair font-black text-3xl" style={{ color: '#FFF5F8' }}>
            Jacky
          </span>
          <span className="font-dancing text-2xl" style={{ color: '#FF1B6D', lineHeight: '1.2' }}>
            Flores &amp; Detalles
          </span>
        </div>

        {/* Cita central */}
        <div>
          <p className="font-playfair font-black text-4xl leading-tight" style={{ color: '#FFF5F8' }}>
            Cada flor cuenta{' '}
            <em className="not-italic italic" style={{ color: '#FF1B6D' }}>
              una historia
            </em>
          </p>
          <p className="mt-4 font-nunito text-sm font-semibold leading-relaxed" style={{ color: 'rgba(255,245,248,0.45)' }}>
            Panel de administración exclusivo para gestionar tu tienda floral.
          </p>
        </div>

        {/* Pie */}
        <p className="font-nunito text-xs font-semibold" style={{ color: 'rgba(255,245,248,0.25)' }}>
          © {new Date().getFullYear()} Jacky Flores y Detalles
        </p>
      </div>

      {/* Derecha — formulario */}
      <div
        className="flex w-full flex-col items-center justify-center px-6 py-12 md:w-1/2"
        style={{ backgroundColor: '#FFF5F8' }}
      >
        <div className="w-full max-w-sm">

          {/* Header móvil */}
          <div className="mb-2 block md:hidden">
            <span className="font-playfair font-black text-2xl" style={{ color: '#1A0A14' }}>Jacky</span>
            <span className="ml-2 font-dancing text-xl" style={{ color: '#FF1B6D' }}>Flores &amp; Detalles</span>
          </div>

          <h1 className="mb-1 font-playfair font-black text-3xl" style={{ color: '#1A0A14' }}>
            Bienvenida de vuelta
          </h1>
          <p className="mb-8 font-nunito text-sm font-semibold" style={{ color: 'rgba(26,10,20,0.45)' }}>
            Ingresa tus credenciales para continuar
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="font-nunito text-xs font-bold uppercase tracking-widest" style={{ color: '#1A0A14' }}>
                Usuario
              </Label>
              <Input
                id="username"
                placeholder="tu_usuario"
                className="rounded-xl border-0 bg-white font-nunito font-semibold shadow-sm ring-1 ring-inset focus-visible:ring-[#FF1B6D]"
                style={{ '--tw-ring-color': 'rgba(26,10,20,0.12)' } as React.CSSProperties}
                {...register('username', { required: 'El usuario es requerido' })}
              />
              {errors.username && (
                <p className="font-nunito text-xs font-semibold text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="font-nunito text-xs font-bold uppercase tracking-widest" style={{ color: '#1A0A14' }}>
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="rounded-xl border-0 bg-white font-nunito font-semibold shadow-sm ring-1 ring-inset pr-10 focus-visible:ring-[#FF1B6D]"
                  style={{ '--tw-ring-color': 'rgba(26,10,20,0.12)' } as React.CSSProperties}
                  {...register('password', { required: 'La contraseña es requerida' })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(26,10,20,0.35)' }}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar contraseña"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="font-nunito text-xs font-semibold text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-full py-3 font-nunito text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#FF1B6D' }}
            >
              {loading ? 'Verificando...' : 'Ingresar al panel'}
            </button>
          </form>

          <div className="mt-3">
            <button
              type="button"
              onClick={createTestUser}
              disabled={loading}
              className="w-full rounded-full border-2 py-3 font-nunito text-sm font-bold transition-all hover:bg-[#1A0A14] hover:text-white disabled:opacity-60"
              style={{ borderColor: '#1A0A14', color: '#1A0A14' }}
            >
              Crear usuario de prueba
            </button>
          </div>

          <p className="mt-8 text-center font-nunito text-xs font-semibold" style={{ color: 'rgba(26,10,20,0.3)' }}>
            Acceso restringido solo al equipo autorizado
          </p>
        </div>
      </div>
    </div>
  )
}
