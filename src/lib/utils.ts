import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SidebarNavItem } from './types/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const flattenNavBarItems = (group: SidebarNavItem) => {
  return group.items.reduce((acc, item) => {
    acc.push(item)
    if (item.items && item.items.length > 0) {
      acc = acc.concat(flattenNavBarItems(item))
    }
    return acc
  }, [] as SidebarNavItem[])
}
