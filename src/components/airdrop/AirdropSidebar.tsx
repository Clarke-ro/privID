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
      {/* Premium Upgrade Card */}
      <Card className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-yellow-300 text-black">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Upgrade to Premium</h3>
              <p className="text-xs opacity-80 mt-1">
                No commitment, tracking more actions, feed in dashboard recovery.
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-black/20 hover:bg-black/30 text-black border-0"
          >
            Upgrade Now
          </Button>
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