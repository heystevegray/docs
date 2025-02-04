import Container from '@/components/container'
import FakeStreamText from '@/components/fake-stream-text'
import HeaderText from '@/components/header-text'
import ShowDocsButton from '@/components/show-docs-button'

export default function Page() {
  return (
    <Container mt main>
      <HeaderText showIcon variant='center' title='Code snippets for you' description='Not at all inspired by shadcn/ui.'>
        <FakeStreamText text='This is a simulated AI text generation.' />
        <ShowDocsButton />
      </HeaderText>
    </Container>
  )
}
