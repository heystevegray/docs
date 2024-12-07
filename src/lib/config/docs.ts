import { SidebarNavItem } from '../types/types'

export interface DocsConfig {
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: 'Components',
      items: [
        {
          href: '/copyright',
          title: 'Copyright',
          items: [],
        },
        {
          href: '/word-cloud',
          title: 'Word Cloud',
          items: [],
        },
      ],
    },
    {
      title: 'Overrides',
      items: [
        {
          href: '/max-width',
          title: 'Max Width',
          items: [],
        },
      ],
    },
  ],
}
