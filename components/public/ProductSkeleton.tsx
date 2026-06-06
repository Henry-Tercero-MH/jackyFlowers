import { Skeleton } from '@/components/ui/skeleton'

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-rose-100 bg-white shadow-sm">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-2 h-9 w-full rounded-full" />
      </div>
    </div>
  )
}
