import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Activity, Wallet, Trophy, Target } from 'lucide-react';
import { useReputation } from '@/hooks/useReputation';

export const AnalyticsDashboard = () => {
  const { reputation, badge } = useReputation();

  // Demo analytics data for when no real data is available
  const analyticsData = {
    totalTransactions: reputation?.transfers || 0,
    uniqueInteractions: Math.floor((reputation?.total || 0) / 10),
    liquidityProvided: reputation?.liquidity || 0,
    governanceParticipation: reputation?.governance || 0,
    weeklyGrowth: '+12%',
    monthlyGrowth: '+35%',
    rank: badge.type === 'gold' ? 'Top 5%' : badge.type === 'silver' ? 'Top 25%' : badge.type === 'bronze' ? 'Top 50%' : 'Unranked'
  };

  const nextBadgeThreshold = badge.type === 'none' ? 100000 : 
                             badge.type === 'bronze' ? 1000000 : 
                             badge.type === 'silver' ? 10000000 : 
                             badge.type === 'gold' && badge.threshold === 10000000 ? 100000000 : 
                             badge.threshold * 10;
  const progressToNext = reputation ? Math.min((reputation.total / nextBadgeThreshold) * 100, 100) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-web3-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-web3-orange">
              {reputation?.total || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.weeklyGrowth} from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Activity className="h-4 w-4 text-web3-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-web3-blue">
              {analyticsData.totalTransactions}
            </div>
            <p className="text-xs text-muted-foreground">
              Total on-chain activity
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liquidity</CardTitle>
            <Wallet className="h-4 w-4 text-web3-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-web3-success">
              {analyticsData.liquidityProvided}
            </div>
            <p className="text-xs text-muted-foreground">
              LP contributions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Governance</CardTitle>
            <Users className="h-4 w-4 text-web3-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-web3-purple">
              {analyticsData.governanceParticipation}
            </div>
            <p className="text-xs text-muted-foreground">
              Votes & proposals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Badge */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-web3-orange" />
            Progress to Next Badge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Current: {badge.name}
            </span>
            <span className="text-sm text-muted-foreground">
              Next: {badge.type === 'gold' && badge.threshold >= 100000000 ? 'Max Level' : `${nextBadgeThreshold.toLocaleString()} pts`}
            </span>
          </div>
          <Progress value={progressToNext} className="h-3" />
          <div className="text-xs text-muted-foreground">
            {reputation?.total || 0} / {nextBadgeThreshold.toLocaleString()} points
            {reputation && reputation.total < nextBadgeThreshold && (
              <span className="ml-2">
                ({(nextBadgeThreshold - reputation.total).toLocaleString()} points to go)
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rank & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-badge-gold" />
              Global Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-badge-gold mb-2">
              {analyticsData.rank}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on total reputation score
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>This Week</span>
                <span className="text-web3-success">{analyticsData.weeklyGrowth}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>This Month</span>
                <span className="text-web3-success">{analyticsData.monthlyGrowth}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-web3-blue" />
              Activity Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Balance Score</span>
              <span className="text-sm font-medium">{reputation?.balance || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Transfer Activity</span>
              <span className="text-sm font-medium">{reputation?.transfers || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">DeFi Participation</span>
              <span className="text-sm font-medium">{reputation?.liquidity || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">DAO Engagement</span>
              <span className="text-sm font-medium">{reputation?.governance || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};