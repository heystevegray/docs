import { PropsWithChildren, ReactNode } from 'react'

import { ClassName } from '@/lib/types'
import { cn } from '@/lib/utils'

import Container from './container'
import { Icons } from './icons'
import { Badge } from './ui/badge'

export type EmptyScreenProps = {
  title?: string
  description?: string
  hideIcon?: boolean
  badge?: string
  icon?: ReactNode
  left?: boolean
} & ClassName &
  PropsWithChildren

const HeaderText = ({ title, description, icon, children = null, hideIcon = false, badge = '', left = false, className }: EmptyScreenProps) => {
  return (
    <div className='py-6'>
      <Container
        className={cn(
          'flex w-full items-center justify-center',
          {
            'justify-start items-start': left,
          },
          className
        )}
      >
        <div
          className={cn('flex flex-col space-y-4 items-center justify-center w-full', {
            'items-start': left,
          })}
        >
          <div
            className={cn('flex justify-center items-center fill-background bg-foreground rounded-full w-fit p-4', {
              hidden: hideIcon,
            })}
          >
            {icon ?? <Icons.logo className='size-8' />}
          </div>
          <Badge
            className={cn('mx-auto w-fit', {
              'mx-0': left,
              hidden: !badge,
            })}
          >
            {badge}
          </Badge>
          <h2 className='m-0 p-0 text-2xl md:text-3xl'>{title ?? null}</h2>
          {description ? <p className='text-lg leading-normal text-muted-foreground'>{description}</p> : null}
          {children}
        </div>
      </Container>
    </div>
  )
}

export default HeaderText
