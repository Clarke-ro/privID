import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ReputationCard } from '@/components/web3/ReputationCard';
import { ReputationChart } from '@/components/web3/ReputationChart';
import { ActivityFeed } from '@/components/web3/ActivityFeed';
import { UserProfileCard } from '@/components/web3/UserProfileCard';
import { MilestoneAchievements } from '@/components/web3/MilestoneAchievements';
import { useReputation } from '@/hooks/useReputation';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import heroBg from '@/assets/web3-hero-bg.jpg';
const Index = () => {
  const {
    reputation
  } = useReputation();
  const {
    profile
  } = useUserProfile();
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const backgroundImage = profile.avatar || heroBg;
  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  if (isMobile) {
    const heroHeight = 50; // vh
    const blurStart = window.innerHeight * heroHeight / 100 * 0.6;
    const blurMax = window.innerHeight * heroHeight / 100;
    const blurAmount = Math.min(Math.max((scrollY - blurStart) / (blurMax - blurStart), 0), 1) * 8;
    const overlayOpacity = Math.min(Math.max(scrollY / blurMax, 0), 0.8);
    return <div className="min-h-screen bg-background">
        {/* Hero Background */}
        <div className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-0" style={{
        backgroundImage: `url(${backgroundImage})`,
        filter: `blur(${blurAmount}px)`,
        transform: `translateY(${scrollY * 0.5}px)`
      }} />
        
        {/* Overlay */}
        <div className="fixed top-0 left-0 w-full h-screen bg-background z-10" style={{
        opacity: overlayOpacity
      }} />

        {/* Content */}
        <div className="relative z-20">
          {/* Hero Section */}
          <div className="min-h-[50vh] flex flex-col justify-end p-6 pb-8">
            <div className="space-y-4">
              
              
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-background rounded-t-3xl min-h-screen">
            <div className="p-6 pt-8 space-y-8">
              <UserProfileCard />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                <ReputationChart />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <ActivityFeed />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Achievements</h2>
                <MilestoneAchievements />
              </div>

              {reputation && <div>
                  <h2 className="text-xl font-semibold mb-4">Reputation ID</h2>
                  <ReputationCard />
                </div>}
            </div>
          </div>
        </div>
      </div>;
  }
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-8 bg-gradient-to-br from-background to-muted/20">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Today's Reputation Overview</h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last 7 Days
                </div>
              </div>

              {/* Reputation Overview Section */}
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <ReputationChart />
                </div>
                <div className="lg:col-span-3">
                  <UserProfileCard />
                </div>
              </div>

              {/* Milestone Achievements Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Milestone Achievements</h2>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    View All
                  </button>
                </div>
                <MilestoneAchievements />
              </div>

              {/* Activity Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                  <ActivityFeed />
                </div>
                <div>
                  {reputation && (
                    <>
                      <h3 className="text-lg font-medium mb-4">Reputation Details</h3>
                      <ReputationCard />
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>;
};
export default Index;