import { Crown, Trophy, Medal, TrendingUp, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-web3-orange" />;
  if (rank === 2) return <Trophy className="w-6 h-6 text-web3-blue" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-web3-purple" />;
  return rank;
};

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
  change: number;
  avatar?: string;
}

const Leaderboard = () => {
  const isMobile = useIsMobile();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    avgScore: 0,
    topScore: 0,
  });

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        
        const { data: scores, error } = await supabase
          .from('leaderboard_scores')
          .select(`
            *,
            profiles!inner (
              username,
              avatar_url
            )
          `)
          .order('total_score', { ascending: false })
          .limit(100);

        if (error) throw error;

        const formattedData: LeaderboardEntry[] = scores.map((score: any, index: number) => ({
          id: score.id,
          name: score.profiles.username,
          score: score.total_score,
          rank: score.rank || index + 1,
          change: 0,
          avatar: score.profiles.avatar_url,
        }));

        setLeaderboardData(formattedData);

        // Calculate stats
        if (formattedData.length > 0) {
          const totalScore = formattedData.reduce((sum, entry) => sum + entry.score, 0);
          setStats({
            totalUsers: formattedData.length,
            avgScore: Math.floor(totalScore / formattedData.length),
            topScore: formattedData[0]?.score || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaderboard_scores'
        },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isMobile) {
    return (
      <MobileLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">Top performers in the community</p>
          </div>

          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-web3-orange" />
                Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : leaderboardData.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No rankings yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboardData.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-card border border-border font-bold">
                        {getRankIcon(entry.rank)}
                      </div>
                      <Avatar className="h-8 w-8 border border-web3-orange">
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback>{entry.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.score.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </MobileLayout>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Trophy className="h-10 w-10 text-web3-orange" />
                  Global Leaderboard
                </h1>
                <p className="text-muted-foreground">Track top performers and compete for the lead</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card className="bg-gradient-card border-border hover:border-web3-orange transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                    <Users className="h-4 w-4 text-web3-orange" />
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-8 w-20" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">Registered on platform</p>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border hover:border-web3-blue transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-web3-blue" />
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-8 w-20" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{stats.avgScore.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Community average</p>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border hover:border-web3-purple transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Score</CardTitle>
                    <Award className="h-4 w-4 text-web3-purple" />
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <Skeleton className="h-8 w-20" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{stats.topScore.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Highest achievement</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-web3-orange" />
                    Global Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4">
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                          <Skeleton className="h-8 w-12" />
                        </div>
                      ))}
                    </div>
                  ) : leaderboardData.length === 0 ? (
                    <div className="text-center py-12">
                      <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                      <h3 className="text-lg font-semibold mb-2">No Rankings Yet</h3>
                      <p className="text-muted-foreground">
                        Connect your wallet and start building your reputation to appear on the leaderboard
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {leaderboardData.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-border"
                        >
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-card border-2 border-border font-bold text-lg">
                            {getRankIcon(entry.rank)}
                          </div>

                          <Avatar className="h-12 w-12 border-2 border-web3-orange">
                            <AvatarImage src={entry.avatar} />
                            <AvatarFallback>{entry.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{entry.rank}. {entry.name}</h4>
                              {entry.rank <= 3 && (
                                <Badge variant="outline" className="bg-gradient-primary border-web3-orange">
                                  {entry.rank === 1 ? 'Legend' : entry.rank === 2 ? 'Champion' : 'Elite'}
                                </Badge>
                              )}
                            </div>
                            {entry.change !== 0 && (
                              <div className="text-sm text-muted-foreground">
                                <span className={entry.change > 0 ? 'text-green-500' : 'text-red-500'}>
                                  {entry.change > 0 ? '↑' : '↓'} {Math.abs(entry.change)}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-web3-orange">{entry.score.toLocaleString()}</div>
                          </div>
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
};

export default Leaderboard;
