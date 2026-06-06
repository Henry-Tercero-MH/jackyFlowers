'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface LogItem {
  tipo: 'progreso' | 'ok' | 'error' | 'aviso' | 'completo'
  indice?: number
  total?: number
  nombre?: string
  conImagen?: boolean
  msg?: string
  cargados?: number
  errores?: number
}

export default function SetupButton() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [logs, setLogs] = useState<LogItem[]>([])
  const [stats, setStats] = useState({ cargados: 0, errores: 0, total: 0 })

  const handleSetup = async () => {
    setLoading(true)
    setOpen(true)
    setLogs([])
    setStats({ cargados: 0, errores: 0, total: 0 })

    try {
      const res = await fetch('/api/setup')
      if (!res.ok) throw new Error('Setup failed')

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6)) as LogItem
              setLogs(prev => [...prev, data])

              if (data.tipo === 'ok' && data.indice) {
                setStats(prev => ({ ...prev, cargados: prev.cargados + 1 }))
              } else if (data.tipo === 'error') {
                setStats(prev => ({ ...prev, errores: prev.errores + 1 }))
              } else if (data.tipo === 'completo') {
                setStats({
                  cargados: data.cargados ?? 0,
                  errores: data.errores ?? 0,
                  total: data.total ?? 0,
                })
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      }

      toast.success(`✅ Cargados ${stats.cargados}/${stats.total} productos`)
    } catch (err) {
      toast.error('Error: ' + String(err))
    } finally {
      setLoading(false)
    }
  }

  const progress = stats.total > 0 ? Math.round((stats.cargados / stats.total) * 100) : 0

  return (
    <>
      <Button
        onClick={handleSetup}
        disabled={loading}
        className="gap-2 bg-rose-500 hover:bg-rose-600"
      >
        <Upload className="h-4 w-4" />
        {loading ? 'Cargando...' : 'Cargar catálogo completo'}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-96 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cargando catálogo</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {/* Barra de progreso */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {stats.cargados} / {stats.total}
                </span>
                <span className="text-rose-600">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-rose-100">
                <div
                  className="h-full bg-rose-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Log scrollable */}
            <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg bg-rose-50 p-3 font-mono text-sm">
              {logs.length === 0 ? (
                <p className="text-rose-400">Iniciando...</p>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {log.tipo === 'ok' && <span className="text-green-600">✓</span>}
                    {log.tipo === 'error' && <span className="text-red-600">✕</span>}
                    {log.tipo === 'aviso' && <span className="text-yellow-600">⚠</span>}
                    {log.tipo === 'progreso' && <span className="text-blue-600">⟳</span>}
                    {log.tipo === 'log' && <span className="text-gray-600">•</span>}
                    {log.tipo === 'completo' && <span className="text-green-600">✓</span>}
                    <span className="flex-1 break-words">
                      {log.nombre && (
                        <>
                          <strong>{log.nombre}</strong>
                          {log.conImagen === false && ' (sin imagen)'}
                        </>
                      )}
                      {log.msg && <em className="text-rose-500">{log.msg}</em>}
                      {log.tipo === 'completo' && (
                        <span>
                          {' '}
                          — {log.cargados}/{log.total} productos cargados
                          {log.errores ? ` (${log.errores} errores)` : ''}
                        </span>
                      )}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                <X className="mr-2 h-4 w-4" />
                {stats.cargados === stats.total && stats.total > 0 ? 'Cerrar' : 'Cancelar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
