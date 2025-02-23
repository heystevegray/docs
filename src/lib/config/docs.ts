import { SidebarNavItem } from '../types'

export interface DocsConfig {
  sidebarNav: SidebarNavItem[]
}

export const config: DocsConfig = {
  sidebarNav: [
    {
      title: 'Framer',
      href: '/framer',
      items: [
        {
          title: 'Framer Components',
          href: '/framer/components',
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
          href: '/framer/overrides',
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
          title: 'Components',
          href: '/react/components',
          items: [
            {
              href: '/react/header-text',
              title: 'Header Text',
              items: [],
            },
            {
              href: '/react/container',
              title: 'Container',
              items: [],
            },
            {
              href: '/react/footer',
              title: 'Footer',
              items: [],
            },
            {
              href: '/react/copy-button',
              title: 'Copy Button',
              items: [],
            },
            {
              href: '/react/header',
              title: 'Header',
              items: [],
            },
            {
              href: '/react/dropzone-image',
              title: 'Dropzone Image',
              items: [],
            },
            {
              href: '/react/avatar',
              title: 'Avatar',
              items: [],
            },
            {
              href: '/react/avatar-group',
              title: 'Avatar Group',
              items: [],
            },
            {
              href: '/react/tailwind-indicator',
              title: 'Tailwind Indicator',
              items: [],
            },
            {
              href: '/react/fake-stream-text',
              title: 'Fake Stream Text',
              label: 'New',
              items: [],
            },
          ],
        },
        {
          title: 'Utility',
          href: '/react/utility',
          items: [
            {
              href: '/react/utils',
              title: 'Utils',
              items: [],
            },
          ],
        },
        {
          title: 'Types',
          href: '/react/types',
          items: [
            {
              href: '/react/class-name',
              title: 'ClassName',
              items: [],
            },
          ],
        },
      ],
    },
  ],
}

// Sort all keys alphabetically
const sortDocsConfig = (config: DocsConfig): DocsConfig => {
  const sortItems = (items: SidebarNavItem[]): SidebarNavItem[] => {
    return items
      .map((item) => ({
        ...item,
        items: item.items ? sortItems(item.items) : [],
      }))
      .sort((a, b) => a.title.localeCompare(b.title))
  }

  return {
    ...config,
    sidebarNav: sortItems(config.sidebarNav),
  }
}

export const docsConfig = sortDocsConfig(config)
