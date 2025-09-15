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
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Monitor your encrypted reputation and Web3 activity
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                  <UserProfileCard />
                </div>
                <div className="space-y-6">
                  <ReputationChart />
                </div>
                <div className="space-y-6">
                  <ActivityFeed />
                </div>
              </div>

              <div className="mt-6">
                <MilestoneAchievements />
              </div>

              {reputation && <div className="mt-6">
                  <ReputationCard />
                </div>}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>;
};
export default Index;