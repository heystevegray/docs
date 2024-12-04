import Link from 'next/link'

import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from './icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { MainNav } from './main-nav'

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center space-x-4 px-3 sm:justify-between sm:space-x-0'>
        <MainNav items={siteConfig.mainNav} />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-1'>
            <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
              <div
                className={cn(
                  'rounded-full',
                  buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })
                )}
              >
                <Icons.gitHub className='size-6' />
                <span className='sr-only'>GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
