import Link from 'next/link'

import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from './icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { MainNav } from './main-nav'
import { SidebarTrigger } from './ui/sidebar'
import { CommandMenu } from './command-menu'

export const HeaderBasic = () => (
  <header className='sticky top-0 z-40 w-full border-b bg-background'>
    <div className='flex h-16 items-center space-x-4 px-3 sm:justify-between sm:space-x-0'>
      <div className='flex flex-row items-center gap-2'>
        <Link href='/' className='flex items-center space-x-2'>
          <span className='inline-block font-bold'>{siteConfig.name}</span>
        </Link>
      </div>
      <div className='flex flex-1 items-center justify-end md:space-x-4'>
        <nav className='flex items-center'>
          <ThemeToggle />
        </nav>
      </div>
    </div>
  </header>
)

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center space-x-4 px-3 sm:justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <SidebarTrigger />
          <MainNav items={siteConfig.mainNav} />
        </div>
        <div className='flex flex-1 items-center justify-end md:space-x-4'>
          <CommandMenu />
          <nav className='flex items-center'>
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
