import type { PropsWithChildren, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import Container from '@/components/container'
import { type ClassName } from '@/lib/types'
import { Badge } from './ui/badge'
import { Icons } from './icons'

export type BaseHeaderTextProps = {
  title?: string
  description?: ReactNode | string
}

export type HeaderTextVariant = { variant?: 'center' | 'left' | 'small' }

export type HeaderTextProps = {
  showIcon?: boolean
  icon?: ReactNode
  badge?: string
  variant?: 'center' | 'left' | 'small'
} & ClassName &
  PropsWithChildren &
  BaseHeaderTextProps &
  HeaderTextVariant

const HeaderText = ({ title, description, icon, children = null, showIcon = false, variant = 'left', badge = '', className }: HeaderTextProps) => {
  const descriptionContent =
    typeof description === 'string' ? (
      <p
        className={cn('text-base leading-normal text-muted-foreground', {
          'text-xs': variant === 'small',
        })}
      >
        {description}
      </p>
    ) : (
      description
    )

  return (
    <div className='w-full'>
      <Container
        className={cn(
          'flex w-full flex-col items-center justify-center space-y-4 p-0 md:p-0 text-foreground',
          {
            'justify-start items-start': variant === 'left',
            'items-start': variant === 'left' || variant === 'small',
          },
          className
        )}
      >
        <Badge
          variant='outline'
          className={cn('mx-auto w-fit', {
            'mx-0': variant === 'left',
            hidden: !badge,
          })}
        >
          {badge}
        </Badge>
        <div
          className={cn('justify-center items-center text-background fill-background bg-foreground rounded-full w-fit p-2 hidden', {
            flex: showIcon,
          })}
        >
          {icon ?? <Icons.logo className='text-background' />}
        </div>
        <div
          className={cn('flex flex-col space-y-2', {
            'text-center': variant === 'center',
          })}
        >
          {title ? (
            <h2
              className={cn('text-2xl', {
                'text-lg': variant === 'small',
              })}
            >
              {title}
            </h2>
          ) : null}
          {descriptionContent ? descriptionContent : null}
        </div>
        {children ? children : null}
      </Container>
    </div>
  )
}

export default HeaderText
