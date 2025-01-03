import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SidebarNavItem } from './types'
import { MY_WEBSITE_URL, siteConfig } from './config/site'
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const isDevelopmentEnvironment = () => process?.env?.NODE_ENV === 'development'

export function absoluteUrl(path: string) {
  return isDevelopmentEnvironment() ? `http://localhost:3000${path}` : `${siteConfig.appURL}${path}`
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
  title = siteConfig.name,
  description = siteConfig.description,
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
      url: new URL(siteConfig.appURL),
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
    metadataBase: new URL(siteConfig.appURL),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
