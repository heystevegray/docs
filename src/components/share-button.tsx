'use client'

import { usePathname } from 'next/navigation'
import { absoluteUrl } from '@/lib/utils'
import { Share2 } from 'lucide-react'
import { Button } from './ui/button'
import { useIsMobile } from '@/lib/hooks/use-mobile'
import { copyToClipboard } from './copy-button'

const ShareButton = () => {
  const pathname = usePathname()
  const url = absoluteUrl(pathname)
  const isMobile = useIsMobile()
  //   const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''

  return (
    <Button
      variant='ghost'
      size='icon'
      aria-label='Share'
      onClick={async () => {
        try {
          if (isMobile) {
            await navigator.share({
              // title: document.title,
              // text: description,
              url,
            })
          } else {
            await copyToClipboard(url, url)
          }
        } catch {}
      }}
    >
      <Share2 />
    </Button>
  )
}

export default ShareButton
