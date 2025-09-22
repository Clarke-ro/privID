import { HorizontalNavigation } from '@/components/layout/HorizontalNavigation';
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
  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <HorizontalNavigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Encrypted Reputation Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor your Web3 reputation and achievements privately on TEN Testnet
            </p>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <UserProfileCard />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <ReputationChart />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <ActivityFeed />
            </div>
          </div>

          {/* Achievements Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Milestone Achievements</h2>
              <p className="text-muted-foreground">Track your progress and unlock new badges</p>
            </div>
            <MilestoneAchievements />
          </div>

          {/* Reputation Card */}
          {reputation && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Your Reputation ID</h2>
                <p className="text-muted-foreground">Your unique encrypted reputation identifier</p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <ReputationCard />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default Index;