'use client'

import * as React from 'react'
import { CheckIcon, ClipboardIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Button, ButtonProps } from './ui/button'

interface CopyButtonProps extends ButtonProps {
  value: string
}

export async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
  toast.success('Copied to clipboard')
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size='icon'
      variant='outline'
      className={cn('relative z-10 size-8 [&_svg]:size-4', className)}
      onClick={() => {
        copyToClipboard(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className='sr-only'>Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  )
}
