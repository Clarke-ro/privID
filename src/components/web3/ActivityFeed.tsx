import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, Award, Users, Coins } from 'lucide-react';
import { useReputation } from '@/hooks/useReputation';
import { useWeb3 } from '@/hooks/useWeb3';
import { useEffect, useState } from 'react';

interface ActivityItem {
  id: string;
  type: 'milestone' | 'score_update' | 'badge_earned' | 'participation';
  title: string;
  description: string;
  timestamp: string;
  points?: number;
  badge?: string;
}

export const ActivityFeed = () => {
  const { reputation, badge } = useReputation();
  const { account } = useWeb3();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (!account) return;

    // Create activity items based on current reputation data without contract calls
    const loadRecentActivity = () => {
      const activityItems: ActivityItem[] = [];

      // Add badge achievement based on current score
      if (badge && badge.type !== 'none') {
        activityItems.push({
          id: `badge-${badge.type}`,
          type: 'badge_earned',
          title: 'Badge Earned!',
          description: `Achieved ${badge.name} status`,
          timestamp: 'Recently',
          badge: badge.name
        });
      }

      // Add current reputation activity
      if (reputation && reputation.total > 0) {
        activityItems.push({
          id: 'current-score',
          type: 'score_update',
          title: 'Reputation Updated',
          description: `Total score: ${reputation.total.toLocaleString()} points`,
          timestamp: 'Recently',
          points: reputation.total
        });

        // Add registration milestone
        activityItems.push({
          id: 'registration',
          type: 'milestone',
          title: 'Reputation System Joined',
          description: 'Successfully registered for reputation tracking',
          timestamp: 'Past',
          points: 100
        });
      }

      // Add component-based activities if they exist
      if (reputation?.balance && reputation.balance > 0) {
        activityItems.push({
          id: 'balance-activity',
          type: 'participation',
          title: 'Balance Activity',
          description: `Balance reputation: ${reputation.balance.toLocaleString()} points`,
          timestamp: 'Past',
          points: reputation.balance
        });
      }

      if (reputation?.transfers && reputation.transfers > 0) {
        activityItems.push({
          id: 'transfer-activity', 
          type: 'participation',
          title: 'Transfer Activity',
          description: `Transfer reputation: ${reputation.transfers.toLocaleString()} points`,
          timestamp: 'Past',
          points: reputation.transfers
        });
      }

      setActivities(activityItems.slice(0, 5)); // Show latest 5
    };

    loadRecentActivity();
  }, [account, reputation, badge]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Award className="w-5 h-5 text-web3-warning" />;
      case 'score_update': return <TrendingUp className="w-5 h-5 text-web3-success" />;
      case 'badge_earned': return <Award className="w-5 h-5 text-badge-gold" />;
      case 'participation': return <Users className="w-5 h-5 text-web3-blue" />;
      default: return <Activity className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'bg-web3-warning/20 text-web3-warning border-web3-warning/30';
      case 'score_update': return 'bg-web3-success/20 text-web3-success border-web3-success/30';
      case 'badge_earned': return 'bg-badge-gold/20 text-badge-gold border-badge-gold/30';
      case 'participation': return 'bg-web3-blue/20 text-web3-blue border-web3-blue/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-web3-orange" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
              <div className="flex-shrink-0 mt-1">
                {getIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground">{activity.title}</h4>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                
                <div className="flex items-center gap-2">
                  {activity.badge && (
                    <Badge className={getBadgeColor(activity.type)}>
                      {activity.badge}
                    </Badge>
                  )}
                  
                  {activity.points && (
                    <Badge variant="outline" className="text-web3-orange border-web3-orange/30">
                      <Coins className="w-3 h-3 mr-1" />
                      +{activity.points}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <button className="text-sm text-web3-orange hover:underline">
            View All Activity
          </button>
        </div>
      </CardContent>
    </Card>
  );
};