'use client'

import * as React from 'react'
import { CheckIcon, ClipboardIcon, Link2, LucideIcon } from 'lucide-react'

import { absoluteUrl, cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Button, ButtonProps } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'

interface CopyButtonProps extends ButtonProps {
  value: string
  copyButtonVariant?: 'link' | 'code'
  icon?: LucideIcon
  description?: string
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

export function CopyButton({ value, className, copyButtonVariant = 'code', children, ...props }: CopyButtonProps) {
  const path = usePathname()
  const router = useRouter()
  const [hasCopied, setHasCopied] = React.useState(false)
  const isLink = copyButtonVariant === 'link'
  const defaultIcon = props?.icon ? <props.icon /> : <ClipboardIcon />
  const [otherIcon] = React.useState(isLink ? <Link2 /> : defaultIcon)
  let textValue = value
  let description = props.description

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  if (children) {
    return (
      <Button
        variant='outline'
        onClick={() => {
          copyToClipboard(value)
          setHasCopied(true)
        }}
        {...props}
      >
        {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
        <span>{children}</span>
      </Button>
    )
  }

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
