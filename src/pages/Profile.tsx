import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { UserProfileCard } from '@/components/web3/UserProfileCard';
import { ReputationCard } from '@/components/web3/ReputationCard';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { useReputation } from '@/hooks/useReputation';
import { useIsMobile } from '@/hooks/use-mobile';

const Profile = () => {
  const { reputation } = useReputation();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Profile</h1>
            <p className="text-muted-foreground text-sm">
              Manage your profile and reputation settings
            </p>
          </div>
          
          <div className="space-y-6">
            <ProfileEditForm />
            <UserProfileCard />
            {reputation && <ReputationCard />}
          </div>
        </main>
      </div>
    );
  }

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
                <div className="space-y-6">
                  <ProfileEditForm />
                  <UserProfileCard />
                </div>
                {reputation && (
                  <div>
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

export default Profile;