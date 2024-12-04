import Container from '@/components/container'
import HeaderText from '@/components/header-text'
import Link from 'next/link'

export default function Home() {
  return (
    <Container>
      <HeaderText title='Welcome To My Framer Library' />
      <div className='flex gap-2 justify-center'>
        <Link href='/components'>Components</Link>
        <Link href='/overrides'>Overrides</Link>
      </div>
    </Container>
  )
}
