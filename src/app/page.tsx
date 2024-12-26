import Container from '@/components/container'
import HeaderText from '@/components/header-text'
import ShowDocsButton from '@/components/show-docs-button'

export default function Home() {
  return (
    <Container mt main>
      <HeaderText showIcon variant='center' title='Code snippets for you' description='Not at all inspired by shadcn/ui.'>
        <ShowDocsButton />
      </HeaderText>
    </Container>
  )
}
