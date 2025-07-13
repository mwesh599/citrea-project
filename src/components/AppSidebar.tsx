import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  FileText,
  Trophy,
  Shield,
  Bot,
  Settings,
  Home,
  Layers,
  Sparkles,
  ChevronRight
} from "lucide-react";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Identity", url: "/identity", icon: User },
  { title: "Credentials", url: "/credentials", icon: FileText },
  { title: "Reputation", url: "/reputation", icon: Trophy },
  { title: "zkLogin", url: "/zklogin", icon: Shield },
];

const toolsItems = [
  { title: "AI Assistant", url: "/ai-assistant", icon: Bot, badge: "New" },
  { title: "zkProofs", url: "/zkproofs", icon: Layers },
  { title: "Developer", url: "/developer", icon: Sparkles },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground shadow-primary font-medium hover:bg-gradient-dark" 
      : "hover:bg-accent hover:text-accent-foreground transition-colors";

  return (
    <Sidebar
      className={`${isCollapsed ? "w-14" : "w-64"} bg-gradient-card border-r border-border/50 shadow-card transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SatoshiID
              </h1>
              <p className="text-xs text-muted-foreground">zkIdentity Platform</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-3">
            {!isCollapsed && "Core Features"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-transform group-hover:scale-110`} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-3">
            {!isCollapsed && "Tools & Features"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-transform group-hover:scale-110`} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} transition-transform group-hover:scale-110`} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapse Toggle */}
        {!isCollapsed && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-muted-foreground">Powered by Citrea</span>
              <SidebarTrigger className="w-6 h-6 hover:bg-accent rounded-md" />
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}