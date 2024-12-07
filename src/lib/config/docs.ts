import { SidebarNavItem } from '../types/types'

export interface DocsConfig {
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: 'Framer',
      href: '/framer',
      items: [
        {
          title: 'Framer Components',
          href: '/fraemr/components',
          items: [
            {
              href: '/framer/components/copyright',
              title: 'Copyright',
              items: [],
            },
            {
              href: '/framer/components/word-cloud',
              title: 'Word Cloud',
              items: [],
              // label: 'New',
            },
          ],
        },
        {
          title: 'Framer Overrides',
          href: '/fraemr/overrides',
          items: [
            {
              href: '/framer/overrides/max-width',
              title: 'Max Width',
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: 'VS Code',
      href: '/vs-code',
      items: [
        {
          href: '/vs-code/dark-theme',
          title: 'Dark Theme',
          items: [],
        },
        {
          href: '/vs-code/window-title',
          title: 'Window Title',
          items: [],
        },
      ],
    },
    {
      title: 'GitKraken',
      href: '/gitkraken',

      items: [
        {
          href: '/gitkraken/dark-theme',
          title: 'Dark Theme',
          items: [],
        },
      ],
    },
    {
      title: 'React',
      href: '/react',

      items: [
        {
          href: '/react/footer',
          title: 'Footer',
          items: [],
        },
      ],
    },
  ],
}
