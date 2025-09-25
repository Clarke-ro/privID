import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Wallet, Trophy, MessageSquare, User, LogOut, Shield, Crown, ScanLine } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
const navigation = [{
  title: 'Dashboard',
  url: '/',
  icon: LayoutDashboard
}, {
  title: 'Activity',
  url: '/activity',
  icon: Activity
}, {
  title: 'Wallet',
  url: '/wallet',
  icon: Wallet
}, {
  title: 'Leaderboard',
  url: '/leaderboard',
  icon: Crown
}, {
  title: 'Explore',
  url: '/explore',
  icon: Trophy
}, {
  title: 'Messages',
  url: '/messages',
  icon: MessageSquare
}, {
  title: 'Verify',
  url: '/verify',
  icon: ScanLine
}, {
  title: 'Profile',
  url: '/profile',
  icon: User
}];
export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({
    isActive
  }: {
    isActive: boolean;
  }) => isActive ? 'bg-web3-orange text-primary-foreground font-medium' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground';
  return <Sidebar className="w-60">
      <SidebarContent>
        {/* Brand */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-sidebar-foreground">Encrypted</h2>
              <p className="text-xs text-muted-foreground">Reputation</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-5 h-5" />
                      <span className="text-sidebar-foreground">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>;
}