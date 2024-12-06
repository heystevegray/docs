export type ComponentProps = {
  href: string
  name: string
  type: 'component' | 'override'
}

export const components: ComponentProps[] = [
  {
    href: 'copyright',
    name: 'Copyright',
    type: 'component',
  },
  {
    href: 'word-cloud',
    name: 'Word Cloud',
    type: 'component',
  },
  {
    href: 'max-width',
    name: 'Max Width',
    type: 'override',
  },
]
