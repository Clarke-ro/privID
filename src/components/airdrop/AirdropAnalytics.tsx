import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, Users, FileText, Download, Trash2, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  action: string;
  target: string;
  time: string;
  iconName: string;
  iconColor: string;
}

interface AirdropAnalyticsProps {
  counts: {
    total: number;
    eligible: number;
    ineligible: number;
    unknown: number;
  };
  activities: ActivityItem[];
}

export const AirdropAnalytics = ({ counts, activities }: AirdropAnalyticsProps) => {

  const defaultActivities: ActivityItem[] = [
    {
      id: '1',
      action: 'Added airdrop',
      target: 'LearnUIto',
      time: 'Just now',
      iconName: 'Plus',
      iconColor: 'bg-blue-500'
    },
    {
      id: '2',
      action: 'Changed status to eligible',
      target: 'Design-Pictures',
      time: '2 hours ago',
      iconName: 'CheckCircle',
      iconColor: 'bg-green-500'
    },
    {
      id: '3',
      action: 'Changed status to ineligible',
      target: 'Node.js pdf',
      time: '1 day ago',
      iconName: 'XCircle',
      iconColor: 'bg-red-500'
    },
    {
      id: '4',
      action: 'Deleted airdrop',
      target: 'Old Protocol',
      time: '2 days ago',
      iconName: 'Trash2',
      iconColor: 'bg-red-500'
    },
    {
      id: '5',
      action: 'Added airdrop',
      target: 'DeFi Protocol Alpha',
      time: '3 days ago',
      iconName: 'Plus',
      iconColor: 'bg-blue-500'
    }
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Plus': return <Plus className="w-3 h-3" />;
      case 'CheckCircle': return <CheckCircle className="w-3 h-3" />;
      case 'XCircle': return <XCircle className="w-3 h-3" />;
      case 'Clock': return <Clock className="w-3 h-3" />;
      case 'Trash2': return <Trash2 className="w-3 h-3" />;
      default: return <Plus className="w-3 h-3" />;
    }
  };

  return (
    <div className="w-80 space-y-6">
      {/* Analytics Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <div className="w-32 h-32 mx-auto relative">
              {/* Circular progress */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeDasharray={`${counts.total > 0 ? (counts.eligible / counts.total) * 314 : 0} 314`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{counts.total}</span>
                <span className="text-xs text-muted-foreground">Total Airdrops</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Eligible</span>
              </div>
              <span className="text-sm font-medium">{counts.eligible}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Ineligible</span>
              </div>
              <span className="text-sm font-medium">{counts.ineligible}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Unknown</span>
              </div>
              <span className="text-sm font-medium">{counts.unknown}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${activity.iconColor} flex items-center justify-center text-white flex-shrink-0`}>
                  {getIconComponent(activity.iconName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="text-muted-foreground">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};