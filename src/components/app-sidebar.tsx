import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenuButton } from '@/components/ui/sidebar'
import { docsConfig } from '@/lib/config/docs'
import { Badge } from './ui/badge'
import { cn, flattenNavBarItems } from '@/lib/utils'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <Sidebar>
        <SidebarContent>
          {docsConfig.sidebarNav.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              {flattenNavBarItems(group).map((navItem) => (
                <SidebarMenuButton asChild key={navItem.href}>
                  <a href={navItem.href} className={cn(!navItem.isParent && 'ml-4 border-l rounded-none mb-1')}>
                    {navItem.label && <Badge>{navItem.label}</Badge>}
                    <span>{navItem.title}</span>
                  </a>
                </SidebarMenuButton>
              ))}
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarFooter />
    </Sidebar>
  )
}
