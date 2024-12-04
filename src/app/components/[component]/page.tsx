import Container from '@/components/container'
import FileViewer from '@/components/file-viewer'
import WordCloud from '@/components/word-cloud'
import fs from 'fs'
import Copyright from '../../../../framer/components/copyright'
import HeaderText from '@/components/header-text'
import { Cloud, Copyright as CopyrightIcon } from 'lucide-react'

type SupportedComponents = keyof typeof components

export const components = {
  'word-cloud': {
    icon: Cloud,
    name: 'Word Cloud',
    component: <WordCloud />,
    description: 'The word cloud component displays a set of words in a in a messy way, then reveals text behind it',
  },
  copyright: {
    icon: CopyrightIcon,
    name: 'Copyright',
    component: <Copyright text='My LLC' />,
    description: 'A copyright component that always updates the year to the current year',
  },
}

export default async function Page({ params }: { params: Promise<{ component: SupportedComponents }> }) {
  const searchParams = await params
  const component = components[searchParams.component]

  const file = component ? fs.readFileSync(`framer/components/${searchParams.component}.tsx`, 'utf8') : null

  if (!component || !file)
    return (
      <Container>
        <h1>Component not found</h1>
      </Container>
    )

  return (
    <Container className='flex flex-col space-y-4'>
      <HeaderText title={component.name} description={component.description} icon={<component.icon className='text-background' />}>
        <div className='border-border rounded-md'>{component.component}</div>
      </HeaderText>
      <FileViewer file={file} />
    </Container>
  )
}
