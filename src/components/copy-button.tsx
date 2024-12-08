'use client'

import * as React from 'react'
import { CheckIcon, ClipboardIcon, Link2 } from 'lucide-react'

import { absoluteUrl, cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Button, ButtonProps } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'

interface CopyButtonProps extends ButtonProps {
  value: string
  copyButtonVariant?: 'link' | 'code'
}

export async function copyToClipboard(value: string, description?: string) {
  try {
    navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard', {
      description,
    })
  } catch (error) {
    toast.error('Failed to copy to clipboard')
    console.error(error)
  }
}

export function CopyButton({ value, className, copyButtonVariant = 'code', ...props }: CopyButtonProps) {
  const path = usePathname()
  const router = useRouter()
  const [hasCopied, setHasCopied] = React.useState(false)
  const isLink = copyButtonVariant === 'link'
  const [otherIcon] = React.useState(isLink ? <Link2 /> : <ClipboardIcon />)
  let textValue = value
  let description = ''

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  if (isLink) {
    // Example: baseURl/path#headerID
    textValue = absoluteUrl(`${path}${value}`)
    description = textValue
  }

  return (
    <Button
      size='icon'
      variant={isLink ? 'ghost' : 'outline'}
      className={cn('relative z-10 size-8 [&_svg]:size-4', className)}
      onClick={() => {
        if (isLink) {
          router.push(textValue, {
            scroll: false,
          })
        }
        copyToClipboard(textValue, description)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className='sr-only'>Copy</span>
      {hasCopied ? <CheckIcon /> : otherIcon}
    </Button>
  )
}
