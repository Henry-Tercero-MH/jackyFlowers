import ProductSkeleton from '@/components/public/ProductSkeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
