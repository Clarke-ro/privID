import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ReputationCard } from '@/components/web3/ReputationCard';
import { ReputationChart } from '@/components/web3/ReputationChart';
import { ActivityFeed } from '@/components/web3/ActivityFeed';
import { UserProfileCard } from '@/components/web3/UserProfileCard';
import { MilestoneAchievements } from '@/components/web3/MilestoneAchievements';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { ProgressCard } from '@/components/dashboard/ProgressCard';
import { PremiumActivityFeed } from '@/components/dashboard/PremiumActivityFeed';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { useReputation } from '@/hooks/useReputation';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { Users, TrendingUp, Award, Activity, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import heroBg from '@/assets/web3-hero-bg.jpg';

const Index = () => {
  const { reputation } = useReputation();
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (isMobile) {
    const heroHeight = 50; // vh
    const blurStart = (window.innerHeight * heroHeight) / 100 * 0.6;
    const blurMax = (window.innerHeight * heroHeight) / 100;
    
    const blurAmount = Math.min(Math.max((scrollY - blurStart) / (blurMax - blurStart), 0), 1) * 8;
    const overlayOpacity = Math.min(Math.max(scrollY / blurMax, 0), 0.8);

    return (
      <div className="min-h-screen bg-background">
        {/* Hero Background */}
        <div 
          className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            filter: `blur(${blurAmount}px)`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Overlay */}
        <div 
          className="fixed top-0 left-0 w-full h-screen bg-background z-10"
          style={{ opacity: overlayOpacity }}
        />

        {/* Content */}
        <div className="relative z-20">
          {/* Hero Section */}
          <div className="min-h-[50vh] flex flex-col justify-end p-6 pb-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Dashboard
              </h1>
              <p className="text-lg text-white/90 drop-shadow-md">
                Monitor your encrypted reputation and Web3 activity
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-background rounded-t-3xl min-h-screen">
            <div className="p-6 pt-8 space-y-8">
              {/* Premium Mobile Cards */}
              <div className="grid grid-cols-2 gap-4">
                <BalanceCard />
                <StatsCard
                  title="Reputation"
                  value="1,247"
                  subtitle="Bronze tier"
                  icon={Award}
                  variant="orange"
                />
              </div>
              
              <UserProfileCard />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Progress</h2>
                <ProgressCard />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                <ReputationChart />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <PremiumActivityFeed />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Achievements</h2>
                <MilestoneAchievements />
              </div>

              {reputation && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Reputation Details</h2>
                  <ReputationCard />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Premium Header */}
          <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Get Started</h1>
                  <p className="text-sm text-muted-foreground">
                    Layer3 v3 makes crypto fun, rewarding, and alive. Built for the next-gen onchain explorer.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search" 
                    className="pl-10 w-64 bg-background/50 border-border/50" 
                  />
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            <div className="grid lg:grid-cols-12 gap-6 h-full">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-8 space-y-6">
                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <BalanceCard />
                  
                  <StatsCard
                    title="Participants"
                    value="28K"
                    subtitle="133 active"
                    icon={Users}
                    trend="up"
                  />
                  
                  <StatsCard
                    title="Reputation Score"
                    value="1,247"
                    subtitle="Bronze tier"
                    icon={Award}
                    variant="orange"
                    trend="up"
                  />
                </div>

                {/* Enhanced Analytics Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Analytics Overview</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ReputationChart />
                    <UserProfileCard />
                  </div>
                </div>

                {/* Achievements & Milestones */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Achievements</h2>
                  <MilestoneAchievements />
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <ProgressCard />
                <PremiumActivityFeed />
                
                {reputation && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Reputation Details</h3>
                    <ReputationCard />
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;