import Link from 'next/link'
import { components } from './[component]/page'
import HeaderText from '@/components/header-text'
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from '@/components/ui/card'

const Page = () => {
  return (
    <HeaderText title='Custom Components' description='Framer Components Ive built'>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(components).map(([key, value]) => (
          <Link key={key} href={`/components/${key}`}>
            <Card className='text-start max-w-md h-full'>
              <CardContent className='min-h-16'>{value.component}</CardContent>
              <CardHeader className='flex flex-col justify-start items-start'>
                <CardTitle className='flex flex-row gap-1'>
                  {<value.icon />}
                  {value.name}
                </CardTitle>
                <CardDescription>{value.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </HeaderText>
  )
}

export default Page
