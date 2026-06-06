export type CategoriaProducto =
  | 'Bodas'
  | 'Cumpleaños'
  | 'Corporativo'
  | 'Condolencias'
  | 'Decoración'
  | 'Ocasiones especiales'

export const CATEGORIAS: CategoriaProducto[] = [
  'Bodas',
  'Cumpleaños',
  'Corporativo',
  'Condolencias',
  'Decoración',
  'Ocasiones especiales',
]

export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: CategoriaProducto
  imagenUrl: string
  disponible: boolean
  destacado: boolean
  fechaCreacion: string
}

export type ProductoForm = Omit<Producto, 'id' | 'fechaCreacion'>

export interface Red {
  plataforma: 'instagram' | 'facebook' | 'tiktok' | 'whatsapp' | 'pinterest'
  url: string
  activo: boolean
}

export interface Config {
  nombreTienda: string
  whatsapp: string
  descripcionSeo: string
  horarios: string
  ciudad: string
  emailContacto: string
}
