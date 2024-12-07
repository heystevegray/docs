import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenuButton } from '@/components/ui/sidebar'
import { docsConfig } from '@/lib/config/docs'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <Sidebar>
        <SidebarContent>
          {docsConfig.sidebarNav.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              {group.items.map((navItem) => (
                <SidebarMenuButton asChild key={navItem.href}>
                  <a href={navItem.href}>
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
