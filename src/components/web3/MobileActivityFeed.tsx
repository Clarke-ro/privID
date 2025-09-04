import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Users, Zap, TrendingUp } from 'lucide-react';

export const MobileActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'transaction',
      action: 'Sent ETH',
      amount: '0.5 ETH',
      to: '0x742d...5428',
      timestamp: '2 mins ago',
      status: 'completed',
      icon: ArrowUpRight,
      color: 'text-red-500'
    },
    {
      id: 2,
      type: 'reputation',
      action: 'Reputation Updated',
      amount: '+25 points',
      to: 'DeFi Protocol',
      timestamp: '1 hour ago',
      status: 'completed',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'interaction',
      action: 'Joined DAO',
      amount: '1 vote',
      to: 'Web3 DAO',
      timestamp: '3 hours ago',
      status: 'completed',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'transaction',
      action: 'Received USDC',
      amount: '100 USDC',
      to: '0x892f...3421',
      timestamp: '1 day ago',
      status: 'completed',
      icon: ArrowDownLeft,
      color: 'text-green-500'
    },
    {
      id: 5,
      type: 'achievement',
      action: 'Milestone Reached',
      amount: 'Gold Badge',
      to: 'Reputation System',
      timestamp: '2 days ago',
      status: 'completed',
      icon: Zap,
      color: 'text-web3-orange'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const IconComponent = activity.icon;
        
        return (
          <div key={activity.id} className="flex items-center space-x-4 py-3 border-b border-border/50 last:border-b-0">
            <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.action}
                </p>
                <Badge variant="secondary" className="text-xs ml-2">
                  {activity.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  To: {activity.to}
                </p>
                <p className="text-xs font-medium text-foreground">
                  {activity.amount}
                </p>
              </div>
              
              <p className="text-xs text-muted-foreground mt-1">
                {activity.timestamp}
              </p>
            </div>
          </div>
        );
      })}

      {/* Load More */}
      <div className="text-center pt-4">
        <button className="text-sm text-web3-orange hover:underline">
          View All Activity
        </button>
      </div>
    </div>
  );
};