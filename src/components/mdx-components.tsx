'use client'

import * as React from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'

import { cn } from '@/lib/utils'
import Copyright from './framer/components/copyright'
import WordCloud from './framer/components/word-cloud'
import { MaxWidth } from './framer/overrides/max-width'
import { CopyButton } from './copy-button'
import Footer from './footer'
import HeaderText from './header-text'
import Container from './container'
import { HeaderBasic } from './header'
import DropzoneImage from './dropzone-image'
import Avatar from './avatar'
import AvatarGroup from './avatar-group'
import { TailwindIndicator } from './tailwind-indicator'
import FakeTextStream from './fake-stream-text'

const linkRightOfHeaderClassName = 'flex flex-row-reverse gap-2 items-center justify-end'

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={cn('font-heading mt-2 scroll-m-20 text-4xl font-bold', linkRightOfHeaderClassName, className)} {...props} />,
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={cn('font-heading mt-12 scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0', linkRightOfHeaderClassName, className)} {...props} />,
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={cn('pb-2 font-heading mt-8 scroll-m-20 text-xl font-normal tracking-tight', linkRightOfHeaderClassName, className)} {...props} />,
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className={cn('pb-2 font-heading mt-8 scroll-m-20 text-lg font-normal tracking-tight', linkRightOfHeaderClassName, className)} {...props} />,
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h5 className={cn('pb-2 mt-8 scroll-m-20 text-lg font-normal tracking-tight', linkRightOfHeaderClassName, className)} {...props} />,
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h6 className={cn('pb-2 mt-8 scroll-m-20 text-base font-normal tracking-tight', linkRightOfHeaderClassName, className)} {...props} />,
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement> & { href?: string }) => {
    if (typeof props.children === 'string') {
      return <a className={cn('font-medium underline underline-offset-4', className)} {...props} />
    }

    return props.href ? <CopyButton value={props.href ?? ''} copyButtonVariant='link' className='relative' /> : null
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={cn('leading-7 [&:not(:first-child)]:mt-0', className)} {...props} />,
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />,
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />,
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <li className={cn('my-1', className)} {...props} />,
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />,
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => <hr className='my-4 md:my-8' {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 w-full overflow-y-auto'>
      <table className={cn('relative w-full overflow-hidden border-none text-sm', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => <tr className={cn('last:border-b-none m-0 border-b', className)} {...props} />,
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <th className={cn('px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right', className)} {...props} />,
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <td className={cn('px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right', className)} {...props} />,
  figcaption: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <figcaption className={cn('text-sm mt-4 mb-2 text-muted-foreground', className)} {...props} />,
  pre: ({ className, sourceCodeText, ...props }: React.HTMLAttributes<HTMLPreElement> & { sourceCodeText?: string }) => {
    return (
      <div className='relative'>
        <pre className={cn('max-h-[650px] mb-4 overflow-x-auto rounded-lg border py-4', className)} {...props} />
        {sourceCodeText ? <CopyButton value={sourceCodeText} className='absolute right-4 top-4' /> : null}
      </div>
    )
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <code className={cn('relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm', className)} {...props} />,
  // Demo Components
  Copyright,
  WordCloud,
  MaxWidth,
  Footer,
  HeaderText,
  Container,
  CopyButton,
  HeaderBasic,
  DropzoneImage,
  Avatar,
  AvatarGroup,
  TailwindIndicator,
  FakeTextStream,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className='mdx'>
      <Component components={components} />
    </div>
  )
}
