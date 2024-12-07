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
          href: '/docs/copyright',
          title: 'Copyright',
          items: [],
        },
        {
          href: '/docs/word-cloud',
          title: 'Word Cloud',
          items: [],
        },
      ],
    },
    {
      title: 'Overrides',
      items: [
        {
          href: '/docs/max-width',
          title: 'Max Width',
          items: [],
        },
      ],
    },
  ],
}
