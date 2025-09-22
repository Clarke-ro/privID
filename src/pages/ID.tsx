import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ProfileBanner } from '@/components/layout/ProfileBanner';
import { HorizontalTabs } from '@/components/layout/HorizontalTabs';
import { ReputationCard } from '@/components/web3/ReputationCard';

const ID = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          <ProfileBanner />
          <HorizontalTabs />
          
          <main className="flex-1 p-6 bg-muted/20">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex justify-center">
                <ReputationCard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ID;