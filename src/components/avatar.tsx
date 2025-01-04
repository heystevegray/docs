'use client'

import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type ClassName } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function Avatar({
  size = 40,
  src = '',
  alt = '',
  showFullAltText = false,
  className = '',
  fallbackClassName = '',
}: {
  size?: number
  src?: string | null
  alt?: string | null
  showFullAltText?: boolean
  fallbackClassName?: string
} & ClassName) {
  const name = alt || ''
  const imageSource = src || ''

  return (
    <ShadAvatar
      className={cn('ring-background ring-2', className)}
      style={{
        width: size,
        height: size,
      }}
    >
      <AvatarImage src={imageSource} alt={name} />
      <AvatarFallback className={fallbackClassName}> {showFullAltText ? alt : name.slice(0, 1)}</AvatarFallback>
    </ShadAvatar>
  )
}
