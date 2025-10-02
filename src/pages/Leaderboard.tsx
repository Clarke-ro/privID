import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Trophy, Medal, Crown, TrendingUp, Users, Award } from 'lucide-react';

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-badge-gold" />;
  if (rank === 2) return <Trophy className="w-6 h-6 text-badge-silver" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-badge-bronze" />;
  return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
};

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
  change: number;
  avatar?: string;
}

export default function Leaderboard() {
  const [leaderboardData] = useState<LeaderboardEntry[]>([]);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Trophy className="w-8 h-8 text-primary" />
              Leaderboard
            </h1>
            <p className="text-muted-foreground">
              Track top performers and compete for the lead
            </p>
          </div>

          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/10">
            <CardHeader>
              <CardTitle>Global Rankings</CardTitle>
              <CardDescription>Real-time reputation leaderboard</CardDescription>
            </CardHeader>
            <CardContent>
              {leaderboardData.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Rankings Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Be the first to build your reputation and claim the top spot
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboardData.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getRankIcon(entry.rank)}
                        <Avatar className="w-10 h-10 bg-muted">
                          <span className="text-lg">{entry.avatar || '👤'}</span>
                        </Avatar>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.score.toLocaleString()} points
                        </p>
                      </div>
                      
                      {entry.change !== 0 && (
                        <Badge variant={entry.change > 0 ? 'default' : 'secondary'} className="text-xs">
                          {entry.change > 0 ? '+' : ''}{entry.change}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6 bg-gradient-to-br from-background via-muted/5 to-primary/5">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <Trophy className="w-8 h-8 text-primary" />
                  Global Leaderboard
                </h1>
                <p className="text-muted-foreground">
                  Track top performers and compete for the lead
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-badge-gold/10 to-badge-gold/5 border-badge-gold/20 hover:shadow-glow transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-badge-gold/20 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-badge-gold" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Gold Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-badge-silver/10 to-badge-silver/5 border-badge-silver/20 hover:shadow-glow transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-badge-silver/20 flex items-center justify-center">
                        <Medal className="w-6 h-6 text-badge-silver" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Silver Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-badge-bronze/10 to-badge-bronze/5 border-badge-bronze/20 hover:shadow-glow transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-badge-bronze/20 flex items-center justify-center">
                        <Award className="w-6 h-6 text-badge-bronze" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Bronze Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-card to-card/50 border-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Top Performers
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Real-time reputation rankings
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {leaderboardData.length === 0 ? (
                    <div className="text-center py-20">
                      <Users className="w-20 h-20 mx-auto text-muted-foreground/40 mb-6" />
                      <h3 className="text-xl font-semibold mb-2">No Rankings Yet</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Be the first to build your reputation on-chain and claim the top spot on the leaderboard
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leaderboardData.map((entry) => (
                        <div
                          key={entry.id}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer group ${
                            entry.rank <= 3 ? 'bg-primary/5 border-primary/20' : 'bg-card/50 hover:bg-card'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="group-hover:scale-110 transition-transform">
                              {getRankIcon(entry.rank)}
                            </div>
                            <Avatar className="w-12 h-12 bg-muted border-2 border-border">
                              <span className="text-xl">{entry.avatar || '👤'}</span>
                            </Avatar>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-lg truncate">{entry.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {entry.score.toLocaleString()} reputation points
                            </p>
                          </div>
                          
                          {entry.change !== 0 && (
                            <div className="text-right">
                              <Badge 
                                variant={entry.change > 0 ? 'default' : 'secondary'} 
                                className="text-sm"
                              >
                                {entry.change > 0 ? '+' : ''}{entry.change}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">this week</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
