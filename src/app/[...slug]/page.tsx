import Container from '@/components/container'
import HeaderText from '@/components/header-text'
import { capitalizeFirstLetter, constructMetadata } from '@/lib/utils'
import { allDocs } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx-components'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HeartCrack } from 'lucide-react'
import { docsConfig } from '@/lib/config/docs'
import { Metadata } from 'next'

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams({ params }: DocPageProps) {
  const slugParam = params.slug?.join('/') || ''
  const slug = `/${slugParam}`
  const doc = allDocs.find((doc) => doc.slug === slug)

  if (!doc) {
    return null
  }

  return { doc, slug }
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const docFromParams = await getDocFromParams({ params })

  if (!docFromParams) {
    return {}
  }

  return constructMetadata({
    title: docFromParams.doc.title,
    description: docFromParams.doc.description,
  })
}

const DocPage = async ({ params }: DocPageProps) => {
  const docFromParams = await getDocFromParams({ params })
  const doc = docFromParams?.doc
  const slug = docFromParams?.slug

  const category = docsConfig.sidebarNav.flatMap((group) => group.items).filter((item) => item.href === slug)
  const subItem = category[0]
  const items = category.flatMap((item) => item.items)

  if (!doc && items.length > 0) {
    return (
      <Container>
        <HeaderText title={subItem.title}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className='underline dark:hover:text-green-400 hover:text-green-700'>
              <span>{item.title}</span>
            </Link>
          ))}
        </HeaderText>
      </Container>
    )
  }

  if (!doc) {
    return (
      <Container>
        <HeaderText title='Sad face' description='This document could not be found.' icon={<HeartCrack />}>
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
        <HeaderText hideIcon title={doc.title} description={doc.description} badge={capitalizeFirstLetter(doc.kind)} variant='left' />
        <Mdx code={doc.body.code} />
      </Container>
    </article>
  )
}

export default DocPage
