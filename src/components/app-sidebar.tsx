import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { ComponentProps, components } from '@/lib/components'

const ComponentLink = (component: ComponentProps) => {
  return (
    <a href={`/docs/${component.href}`}>
      <span>{component.name}</span>
    </a>
  )
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {components
                  .filter((component) => component.type === 'component')
                  .map((component) => (
                    <SidebarMenuItem key={component.href}>
                      <SidebarMenuButton asChild>
                        <ComponentLink {...component} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Overrides</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {components
                  .filter((component) => component.type === 'override')
                  .map((component) => (
                    <SidebarMenuItem key={component.href}>
                      <SidebarMenuButton asChild>
                        <ComponentLink {...component} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarFooter />
    </Sidebar>
  )
}
