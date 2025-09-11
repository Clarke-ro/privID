import { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Crown, Star, Gift, Zap, TrendingUp } from 'lucide-react';

// Mock data for leaderboard
const mockLeaderboard = [
  { id: 1, name: 'CryptoKing', avatar: '👑', score: 2450, rank: 1, badge: 'gold', weeklyGain: '+125' },
  { id: 2, name: 'BlockMaster', avatar: '⚡', score: 2180, rank: 2, badge: 'gold', weeklyGain: '+98' },
  { id: 3, name: 'DeFiWizard', avatar: '🧙‍♂️', score: 1890, rank: 3, badge: 'silver', weeklyGain: '+87' },
  { id: 4, name: 'TokenHunter', avatar: '🎯', score: 1650, rank: 4, badge: 'silver', weeklyGain: '+76' },
  { id: 5, name: 'ChainExplorer', avatar: '🚀', score: 1420, rank: 5, badge: 'bronze', weeklyGain: '+65' },
  { id: 6, name: 'CryptoNinja', avatar: '🥷', score: 1250, rank: 6, badge: 'bronze', weeklyGain: '+54' },
  { id: 7, name: 'Web3Pioneer', avatar: '🌟', score: 1100, rank: 7, badge: 'bronze', weeklyGain: '+43' },
  { id: 8, name: 'BlockBuilder', avatar: '🔨', score: 950, rank: 8, badge: 'none', weeklyGain: '+32' },
];

const achievements = [
  { id: 1, name: 'First Transaction', icon: '🎯', description: 'Complete your first transaction', unlocked: true, reward: '50 points' },
  { id: 2, name: 'High Roller', icon: '💎', description: 'Maintain over 1000 reputation', unlocked: true, reward: '100 points' },
  { id: 3, name: 'Consistency King', icon: '👑', description: 'Active for 30 consecutive days', unlocked: false, reward: '200 points' },
  { id: 4, name: 'Social Butterfly', icon: '🦋', description: 'Refer 10 friends', unlocked: false, reward: '300 points' },
  { id: 5, name: 'DeFi Master', icon: '🧙‍♂️', description: 'Complete 100 DeFi transactions', unlocked: false, reward: '500 points' },
];

const rewards = [
  { id: 1, name: 'Premium Badge', cost: 500, icon: '🏆', description: 'Exclusive premium profile badge' },
  { id: 2, name: 'Custom Avatar Frame', cost: 750, icon: '🖼️', description: 'Animated avatar frame' },
  { id: 3, name: 'Priority Support', cost: 1000, icon: '⚡', description: '24/7 priority customer support' },
  { id: 4, name: 'Early Access', cost: 1500, icon: '🚀', description: 'Beta access to new features' },
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-badge-gold" />;
  if (rank === 2) return <Trophy className="w-5 h-5 text-badge-silver" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-badge-bronze" />;
  return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
};

const getBadgeVariant = (badge: string) => {
  switch (badge) {
    case 'gold': return 'default';
    case 'silver': return 'secondary';
    case 'bronze': return 'outline';
    default: return 'outline';
  }
};

export default function Leaderboard() {
  const [userScore] = useState(1420);
  const [userRank] = useState(5);
  const nextLevelScore = 1500;
  const progress = ((userScore % 500) / 500) * 100;

  return (
    <MobileLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Trophy className="w-8 h-8 text-web3-orange" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Compete with others and climb the ranks
          </p>
        </div>

        {/* User Progress Card */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Progress</span>
              <Badge variant={getBadgeVariant('bronze')} className="flex items-center gap-1">
                {getRankIcon(userRank)}
                Rank #{userRank}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{userScore.toLocaleString()}</p>
                <p className="text-muted-foreground">Current Score</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-web3-success">+65</p>
                <p className="text-sm text-muted-foreground">This week</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next level</span>
                <span>{userScore}/{nextLevelScore}</span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {nextLevelScore - userScore} points to reach Bronze Elite
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="rankings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          {/* Rankings Tab */}
          <TabsContent value="rankings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-web3-orange" />
                  Global Rankings
                </CardTitle>
                <CardDescription>
                  Top performers this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                        user.rank === userRank ? 'bg-web3-orange/10 border-web3-orange/30' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getRankIcon(user.rank)}
                        <Avatar className="w-10 h-10">
                          <span className="text-lg">{user.avatar}</span>
                        </Avatar>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{user.name}</p>
                          <Badge variant={getBadgeVariant(user.badge)} className="text-xs">
                            {user.badge === 'none' ? 'Unranked' : user.badge.charAt(0).toUpperCase() + user.badge.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {user.score.toLocaleString()} points
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-medium text-web3-success">{user.weeklyGain}</p>
                        <p className="text-xs text-muted-foreground">this week</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-web3-orange" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Unlock rewards by completing challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                        achievement.unlocked
                          ? 'bg-web3-success/10 border-web3-success/30'
                          : 'bg-muted/30 border-border opacity-60'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{achievement.name}</h3>
                          {achievement.unlocked && (
                            <Badge variant="default" className="text-xs bg-web3-success">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-web3-orange">{achievement.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-web3-orange" />
                  Rewards Store
                </CardTitle>
                <CardDescription>
                  Spend your points on exclusive rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="flex flex-col gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{reward.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-medium">{reward.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {reward.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-web3-orange" />
                          <span className="font-medium">{reward.cost} points</span>
                        </div>
                        <Button
                          variant={userScore >= reward.cost ? "default" : "secondary"}
                          size="sm"
                          disabled={userScore < reward.cost}
                        >
                          {userScore >= reward.cost ? "Redeem" : "Locked"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}