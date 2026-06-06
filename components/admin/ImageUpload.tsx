'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

interface Props {
  currentUrl?: string
  onFileSelect: (file: File) => void
  onClear: () => void
}

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_MB = 5

export default function ImageUpload({ currentUrl, onFileSelect, onClear }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processFile = useCallback(
    (file: File) => {
      setError(null)
      if (!ACCEPTED.includes(file.type)) {
        setError('Solo se aceptan JPG, PNG o WebP')
        return
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`El archivo no puede superar ${MAX_MB} MB`)
        return
      }
      const url = URL.createObjectURL(file)
      setPreview(url)
      onFileSelect(file)
    },
    [onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleClear = () => {
    setPreview(null)
    setError(null)
    onClear()
  }

  const displayUrl = preview ?? currentUrl

  return (
    <div className="flex flex-col gap-2">
      {displayUrl ? (
        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-rose-200 bg-rose-50">
          <Image src={displayUrl} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow hover:bg-red-50"
            aria-label="Quitar imagen"
          >
            <X className="h-4 w-4 text-red-500" />
          </button>
        </div>
      ) : (
        <label
          className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
            dragging ? 'border-rose-500 bg-rose-50' : 'border-rose-200 bg-white hover:border-rose-400 hover:bg-rose-50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <Upload className="mb-3 h-8 w-8 text-rose-400" />
          <p className="text-sm font-medium text-rose-700">Arrastrá o hacé clic para subir</p>
          <p className="mt-1 text-xs text-rose-400">JPG, PNG, WebP · máx {MAX_MB} MB</p>
          <input
            type="file"
            accept={ACCEPTED.join(',')}
            className="sr-only"
            onChange={handleInput}
          />
        </label>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
