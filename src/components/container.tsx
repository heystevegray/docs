import { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

const Container = ({ children, className }: { className?: string } & PropsWithChildren) => {
  return <div className={cn('mx-auto w-full p-2 md:p-6 md:py-2 max-w-3xl lg:max-w-6xl', className)}>{children}</div>
}

export default Container
