import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame } from 'lucide-react';

export const ProgressCard = () => {
  return (
    <Card className="bg-gradient-card shadow-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Season 7 Progress</span>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-web3-orange" />
            <Badge variant="secondary" className="bg-web3-orange/10 text-web3-orange border-web3-orange/20">
              Bronze
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">6 days left</span>
        </div>
        
        <Progress value={25} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-web3-orange" />
              <span className="text-sm text-muted-foreground">GM Streak</span>
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Staking Streak</span>
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="bg-web3-orange/10 border border-web3-orange/20 rounded-lg px-3 py-2 text-center">
            <span className="text-web3-orange font-medium text-sm">GM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};