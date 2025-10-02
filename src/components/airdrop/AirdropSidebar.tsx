import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  CheckCircle, 
  XCircle, 
  Heart, 
  Trash2, 
  Settings,
  Sparkles,
  Clock
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
}

interface AirdropSidebarProps {
  counts: {
    total: number;
    eligible: number;
    ineligible: number;
    unknown: number;
  };
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const AirdropSidebar = ({ counts, selectedFilter, onFilterChange }: AirdropSidebarProps) => {
  const sidebarItems: SidebarItem[] = [
    {
      id: 'all',
      label: 'My Airdrop',
      icon: <Target className="w-4 h-4" />,
      count: counts.total,
      active: selectedFilter === 'all'
    },
    {
      id: 'eligible',
      label: 'Eligible',
      icon: <CheckCircle className="w-4 h-4" />,
      count: counts.eligible,
      active: selectedFilter === 'eligible'
    },
    {
      id: 'ineligible',
      label: 'Ineligible',
      icon: <XCircle className="w-4 h-4" />,
      count: counts.ineligible,
      active: selectedFilter === 'ineligible'
    },
    {
      id: 'unknown',
      label: 'Unknown',
      icon: <Clock className="w-4 h-4" />,
      count: counts.unknown,
      active: selectedFilter === 'unknown'
    },
    {
      id: 'favorite',
      label: 'Favorite',
      icon: <Heart className="w-4 h-4" />,
      count: 0,
      active: selectedFilter === 'favorite'
    },
    {
      id: 'trash',
      label: 'Trash',
      icon: <Trash2 className="w-4 h-4" />,
      count: 0,
      active: selectedFilter === 'trash'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      active: selectedFilter === 'settings'
    }
  ];

  return (
    <div className="w-64 space-y-4">
      {/* Quick Tips Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <CardContent className="p-4 relative">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-2">Quick Tips</h3>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Track all your airdrops in one place</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Update eligibility status regularly</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Set date periods to stay organized</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card>
        <CardContent className="p-2">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={item.active ? "default" : "ghost"}
                className="w-full justify-start gap-3 h-10"
                onClick={() => onFilterChange(item.id)}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.count !== undefined && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {item.count}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};