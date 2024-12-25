export type ClassName = { className?: string }

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  label?: string
  isParent?: boolean
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export type MainNavItem = NavItem

export type SidebarNavItem = NavItemWithChildren
