import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Search, 
  Trophy, 
  MessageSquare, 
  User,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Activity', href: '/activity', icon: Activity },
  { name: 'Explore', href: '/explore', icon: Search },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
];

export const HorizontalNavigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
            <span className="text-xl font-bold">RepTracker</span>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Menu - Could be expanded later */}
          <div className="md:hidden">
            <button className="text-muted-foreground">
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};