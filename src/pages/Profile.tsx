import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { UserProfileCard } from '@/components/web3/UserProfileCard';
import { ReputationCard } from '@/components/web3/ReputationCard';
import { useReputation } from '@/hooks/useReputation';

const Profile = () => {
  const { reputation } = useReputation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Profile</h1>
                <p className="text-muted-foreground">
                  Manage your profile and reputation settings
                </p>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <UserProfileCard />
                {reputation && <ReputationCard />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;