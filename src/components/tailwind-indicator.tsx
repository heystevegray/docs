import { ClassName } from '@/lib/types'
import { cn } from '@/lib/utils'

export function TailwindIndicator({ className }: ClassName) {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className={cn('fixed bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-background p-3 font-mono text-xs text-foreground', className)}>
      <div className='block sm:hidden'>xs</div>
      <div className='hidden sm:block md:hidden'>sm</div>
      <div className='hidden md:block lg:hidden'>md</div>
      <div className='hidden lg:block xl:hidden'>lg</div>
      <div className='hidden xl:block 2xl:hidden'>xl</div>
      <div className='hidden 2xl:block'>2xl</div>
    </div>
  )
}
