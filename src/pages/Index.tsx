import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ProfileBanner } from '@/components/layout/ProfileBanner';
import { HorizontalTabs } from '@/components/layout/HorizontalTabs';
import { ReputationCard } from '@/components/web3/ReputationCard';
import { ReputationChart } from '@/components/web3/ReputationChart';
import { ActivityFeed } from '@/components/web3/ActivityFeed';
import { UserProfileCard } from '@/components/web3/UserProfileCard';
import { MilestoneAchievements } from '@/components/web3/MilestoneAchievements';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { FirstTimeUserModal } from '@/components/profile/FirstTimeUserModal';
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
        <FirstTimeUserModal />
        
        {/* Floating gradient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        
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
                <h2 className="text-xl font-semibold mb-4 bg-gradient-web3 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h2>
                <AnalyticsDashboard />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Reputation Breakdown</h2>
                  <ReputationChart />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <ActivityFeed />
                </div>
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
      <div className="min-h-screen flex w-full relative">
        <FirstTimeUserModal />
        
        {/* Floating gradient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Profile Banner */}
              <ProfileBanner />
              
              {/* Horizontal Navigation Tabs - Separated */}
              <HorizontalTabs />
              
              {/* Main Content */}
              <div className="space-y-8">
                {/* Analytics Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-web3 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-background rounded-sm"></div>
                    </div>
                    <h2 className="text-lg font-medium bg-gradient-web3 bg-clip-text text-transparent">
                      Web3 Reputation Analytics
                    </h2>
                    <div className="text-sm text-muted-foreground ml-auto">Real-time Data</div>
                  </div>
                  
                  <AnalyticsDashboard />
                </div>

                {/* Reputation & Activity Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h2 className="text-lg font-medium">Reputation Breakdown</h2>
                    <ReputationChart />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-lg font-medium">Recent Activity</h2>
                    <ActivityFeed />
                  </div>
                </div>

                {/* Milestone Achievements Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">Milestone Achievements</h2>
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                      View All
                    </button>
                  </div>
                  <MilestoneAchievements />
                </div>

                {/* Reputation ID Card */}
                {reputation && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-medium">Reputation ID</h2>
                    <ReputationCard />
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>;
};
export default Index;