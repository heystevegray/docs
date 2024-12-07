'use client'

import Container from '@/components/container'
import HeaderText from '@/components/header-text'
import { capitalizeFirstLetter } from '@/lib/utils'
import { allDocs } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx-components'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DocPageProps {
  params: {
    slug: string[]
  }
}

const DocPage = ({ params }: DocPageProps) => {
  const slug = params.slug?.join('/') || ''
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return (
      <Container>
        <HeaderText title='Sad face' description='This document could not be found.'>
          <Link href='/'>
            <Button>Go Home</Button>
          </Link>
        </HeaderText>
      </Container>
    )
  }

  return (
    <article>
      <Container>
        <HeaderText hideIcon title={doc.title} description={doc.description} badge={capitalizeFirstLetter(doc.kind)} left />
        <Mdx code={doc.body.code} />
      </Container>
    </article>
  )
}

export default DocPage
