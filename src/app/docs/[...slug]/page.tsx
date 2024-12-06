'use client'

import Container from '@/components/container'
import HeaderText from '@/components/header-text'
import { Button } from '@/components/ui/button'
import { capitalizeFirstLetter } from '@/lib/utils'
import { allDocs } from 'contentlayer/generated'
import { Copy } from 'lucide-react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { toast } from 'sonner'

interface DocPageProps {
  params: {
    slug: string[]
  }
}

const DocPage = ({ params }: DocPageProps) => {
  const slug = params.slug?.join('/') || ''
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(doc ? doc.body.code : '')

  const handleCopyToClipBoard = async () => {
    try {
      if (doc?.body?.code) {
        const removedCodeBlockTicks = doc.body.raw.replace(/```.*$/gm, '').trim()
        await navigator.clipboard.writeText(removedCodeBlockTicks)
        toast.success('Copied to clipboard')
      } else {
        toast.error('Failed to copy to clipboard')
      }
    } catch (error) {
      toast.error('Failed to copy to clipboard')
      console.log(error)
    }
  }

  if (!doc) {
    return <HeaderText title='Sad face' description='This document could not be found.' />
  }

  return (
    <article>
      <Container>
        <HeaderText hideIcon title={doc.title} description={doc.description} badge={capitalizeFirstLetter(doc.kind)} />
        <div className='border-border rounded-md border break-all flex flex-col gap-2 relative p-4'>
          <div className='absolute top-4 right-4'>
            <Button variant='outline' onClick={handleCopyToClipBoard}>
              <Copy />
            </Button>
          </div>
          <MDXContent />
        </div>
      </Container>
    </article>
  )
}

export default DocPage
