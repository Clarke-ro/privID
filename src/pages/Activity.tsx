import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ActivityFeed } from '@/components/web3/ActivityFeed';

const Activity = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Activity</h1>
                <p className="text-muted-foreground">
                  View your complete Web3 activity history
                </p>
              </div>
              
              <ActivityFeed />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Activity;