import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ProfileBanner } from '@/components/layout/ProfileBanner';
import { HorizontalTabs } from '@/components/layout/HorizontalTabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AirdropSidebar } from '@/components/airdrop/AirdropSidebar';
import { AirdropStatusCards } from '@/components/airdrop/AirdropStatusCards';
import { AirdropTable } from '@/components/airdrop/AirdropTable';
import { AirdropAnalytics } from '@/components/airdrop/AirdropAnalytics';
import { AirdropFormModal } from '@/components/airdrop/AirdropFormModal';
import { useState } from 'react';
import { useAirdrops } from '@/hooks/useAirdrops';

const Airdrop = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { airdrops, addAirdrop, updateEligibility, deleteAirdrop, counts, getFilteredAirdrops, activities } = useAirdrops();

  const filteredAirdrops = getFilteredAirdrops(selectedFilter);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          <ProfileBanner />
          <HorizontalTabs />
          
          <main className="flex-1 p-6 bg-gradient-to-br from-background via-muted/5 to-primary/5">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-6">
                {/* Left Sidebar */}
                <AirdropSidebar 
                  counts={counts}
                  selectedFilter={selectedFilter}
                  onFilterChange={setSelectedFilter}
                />
                
                {/* Main Content */}
                <div className="flex-1 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">My Airdrop Management</h1>
                    <Button 
                      className="bg-gradient-primary hover:shadow-glow"
                      onClick={() => setIsFormModalOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New
                    </Button>
                  </div>
                  
                  {/* Status Cards */}
                  <AirdropStatusCards counts={counts} />
                  
                  {/* Airdrops Table */}
                  <AirdropTable 
                    airdrops={filteredAirdrops}
                    onUpdateEligibility={updateEligibility}
                    onDeleteAirdrop={deleteAirdrop}
                  />
                </div>
                
                {/* Right Analytics */}
                <AirdropAnalytics counts={counts} activities={activities} />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Airdrop Modal */}
      <AirdropFormModal 
        open={isFormModalOpen} 
        onOpenChange={setIsFormModalOpen}
        onAddAirdrop={addAirdrop}
      />
    </SidebarProvider>
  );
};

export default Airdrop;