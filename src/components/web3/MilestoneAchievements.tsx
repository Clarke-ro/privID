import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Trophy, Crown, Star, CheckCircle2 } from 'lucide-react';
import { useReputation } from '@/hooks/useReputation';

export const MilestoneAchievements = () => {
  const { reputation } = useReputation();

  const currentScore = reputation?.total || 0;

  const achievements = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete your first DeFi transaction',
      icon: Award,
      threshold: 1000,
      points: 0,
      tier: 'Common',
      completed: currentScore >= 1000,
    },
    {
      id: 'bronze-achiever',
      title: 'Bronze Achiever',
      description: 'Reach 100,000 reputation points',
      icon: Award,
      threshold: 100000,
      points: 10000,
      tier: 'Common',
      completed: currentScore >= 100000,
    },
    {
      id: 'silver-investor',
      title: 'Silver Investor',
      description: 'Reach 1 million reputation points',
      icon: Trophy,
      threshold: 1000000,
      points: 50000,
      tier: 'Rare',
      completed: currentScore >= 1000000,
    },
    {
      id: 'gold-elite',
      title: 'Gold Elite',
      description: 'Reach 5 million reputation points',
      icon: Crown,
      threshold: 5000000,
      points: 100000,
      tier: 'Epic',
      completed: currentScore >= 5000000,
    },
    {
      id: 'platinum-master',
      title: 'Platinum Master',
      description: 'Reach 10 million reputation points',
      icon: Star,
      threshold: 10000000,
      points: 250000,
      tier: 'Legendary',
      completed: currentScore >= 10000000,
    },
    {
      id: 'diamond-legend',
      title: 'Diamond Legend',
      description: 'Reach 50 million reputation points',
      icon: Crown,
      threshold: 50000000,
      points: 500000,
      tier: 'Legendary',
      completed: currentScore >= 50000000,
    },
    {
      id: 'mythic-champion',
      title: 'Mythic Champion',
      description: 'Reach 100 million reputation points',
      icon: Star,
      threshold: 100000000,
      points: 1000000,
      tier: 'Legendary',
      completed: currentScore >= 100000000,
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Common': return 'bg-gray-500/20 text-gray-300';
      case 'Rare': return 'bg-blue-500/20 text-blue-300';
      case 'Epic': return 'bg-purple-500/20 text-purple-300';
      case 'Legendary': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Next milestone progress
  const nextMilestone = achievements.find(a => !a.completed && currentScore < a.threshold);
  const progress = nextMilestone ? (currentScore / nextMilestone.threshold) * 100 : 100;

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Milestone Achievements</CardTitle>
        <Badge variant="outline">View All</Badge>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Achievement Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-lg border transition-all ${
                  achievement.completed
                    ? 'border-web3-success bg-web3-success/10'
                    : 'border-border bg-card'
                }`}
              >
                {achievement.completed && (
                  <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-web3-success" />
                )}
                
                <div className="text-center space-y-2">
                  <div className={`inline-flex p-3 rounded-full ${
                    achievement.completed ? 'bg-web3-success/20' : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      achievement.completed ? 'text-web3-success' : 'text-muted-foreground'
                    }`} />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {achievement.description}
                    </p>
                  </div>
                  
                  <Badge className={`${getTierColor(achievement.tier)} text-xs`}>
                    {achievement.tier}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Milestone Progress */}
        {nextMilestone && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Next Milestone: {nextMilestone.title}</h4>
              {nextMilestone.points > 0 && (
                <div className="text-right">
                  <div className="text-lg font-bold text-web3-orange">+{nextMilestone.points.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Reputation Points</div>
                </div>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">{nextMilestone.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{currentScore.toLocaleString()} / {nextMilestone.threshold.toLocaleString()}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};