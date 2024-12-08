import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SidebarNavItem } from './types/types'
import { APP_DESCRIPTION, APP_NAME, APP_URL, MY_WEBSITE_URL } from './config/site'
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const flattenNavBarItems = (group: SidebarNavItem): SidebarNavItem[] => {
  return group.items.reduce((acc, item) => {
    const newItem: SidebarNavItem = { ...item, isParent: item.items && item.items.length > 0 }
    acc.push(newItem)
    if (newItem.isParent) {
      acc = acc.concat(flattenNavBarItems(newItem))
    }
    return acc
  }, [] as SidebarNavItem[])
}

export function constructMetadata({
  title = APP_NAME,
  description = APP_DESCRIPTION,
  image = '/logo.jpg',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      url: new URL(APP_URL),
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: MY_WEBSITE_URL,
    },
    icons,
    metadataBase: new URL(APP_URL),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
