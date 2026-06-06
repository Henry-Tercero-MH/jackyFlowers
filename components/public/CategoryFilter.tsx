'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { CATEGORIAS, type CategoriaProducto } from '@/types'

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoriaActual = searchParams.get('categoria') ?? 'todas'

  const setCategoria = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (cat === 'todas') {
        params.delete('categoria')
      } else {
        params.set('categoria', cat)
      }
      router.push(`/catalogo?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={categoriaActual === 'todas' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setCategoria('todas')}
        className={
          categoriaActual === 'todas'
            ? 'rounded-full bg-rose-500 hover:bg-rose-600'
            : 'rounded-full border-rose-200 text-rose-700 hover:bg-rose-50'
        }
      >
        Todas
      </Button>
      {CATEGORIAS.map((cat: CategoriaProducto) => (
        <Button
          key={cat}
          variant={categoriaActual === cat ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCategoria(cat)}
          className={
            categoriaActual === cat
              ? 'rounded-full bg-rose-500 hover:bg-rose-600'
              : 'rounded-full border-rose-200 text-rose-700 hover:bg-rose-50'
          }
        >
          {cat}
        </Button>
      ))}
    </div>
  )
}
