import * as React from 'react'
import Link from 'next/link'

import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'

import { NavItem } from '@/lib/types'
import { Icons } from './icons'

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className='flex gap-6'>
      <div className='flex flex-row items-center gap-2'>
        <Link href='/' className='flex items-center space-x-2'>
          <Icons.logo className='size-4 fill-foreground' />
          <span className='inline-block font-bold'>{siteConfig.name}</span>
        </Link>
      </div>
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map(
            (item, index) =>
              item.href && (
                <Link key={index} href={item.href} className={cn('flex items-center gap-2 text-sm font-medium text-muted-foreground', item.disabled && 'cursor-not-allowed opacity-80')}>
                  <div className={cn('flex items-center gap-2')}>
                    <item.icon className='size-4' />
                    {item.title}
                  </div>
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
