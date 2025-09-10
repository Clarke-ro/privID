import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, ExternalLink, Users, Coins } from 'lucide-react';

const activityItems = [
  {
    id: 1,
    type: 'reward',
    title: 'Claimed Reward',
    subtitle: '1 minute ago',
    amount: '17K SWEE',
    icon: Gift,
    color: 'text-web3-cyan',
    bgColor: 'bg-web3-cyan/10',
  },
  {
    id: 2,
    type: 'reward',
    title: 'Claimed Reward', 
    subtitle: '5 minutes ago',
    amount: '479 LOUD',
    icon: Gift,
    color: 'text-web3-purple',
    bgColor: 'bg-web3-purple/10',
  },
  {
    id: 3,
    type: 'reward',
    title: 'Claimed Reward',
    subtitle: '8 minutes ago', 
    amount: '9.8K DAYS',
    icon: Coins,
    color: 'text-web3-orange',
    bgColor: 'bg-web3-orange/10',
  },
  {
    id: 4,
    type: 'reward',
    title: 'Claimed Reward',
    subtitle: '8 minutes ago',
    amount: '515 LOUD',
    icon: Gift,
    color: 'text-web3-purple',
    bgColor: 'bg-web3-purple/10',
  },
  {
    id: 5,
    type: 'reward', 
    title: 'Claimed Reward',
    subtitle: '9 minutes ago',
    amount: '525 LOUD',
    icon: Gift,
    color: 'text-web3-purple',
    bgColor: 'bg-web3-purple/10',
  }
];

export const PremiumActivityFeed = () => {
  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Latest Activity</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Show all
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {activityItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`p-2 rounded-full ${item.bgColor}`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            
            <Avatar className="w-8 h-8">
              <AvatarImage src={`/avatars/user-${item.id}.jpg`} />
              <AvatarFallback className="text-xs">U{item.id}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <Badge variant="outline" className="ml-2 text-xs">
                  {item.amount}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};