import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';
import { useReputation } from '@/hooks/useReputation';
import { useUserProfile } from '@/hooks/useUserProfile';
import bannerBg from '@/assets/dashboard-banner.png';

export const ProfileBanner = () => {
  const { account } = useWeb3();
  const { reputation } = useReputation();
  const { profile } = useUserProfile();

  const displayAccount = account || "0x1234...5678";
  const displayReputation = reputation?.total || 0;

  return (
    <div className="relative">
      {/* Banner Background */}
      <div 
        className="h-48 bg-cover bg-center bg-no-repeat rounded-t-2xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${bannerBg})`
        }}
      />
      
      {/* Profile Section */}
      <div className="bg-card border-x border-border px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Profile Avatar */}
          <div className="relative -mt-12">
            <Avatar className="w-20 h-20 border-4 border-card">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Profile" />
              <AvatarFallback className="text-lg bg-gradient-primary text-white">
                {profile.name ? profile.name.slice(0, 2).toUpperCase() : displayAccount.slice(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 pt-8">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-foreground">
                {profile.name || 'bigson.peaq'}
              </h1>
              <CheckCircle2 className="w-5 h-5 text-web3-success" />
            </div>
            <p className="text-muted-foreground text-sm">
              {profile.about || "Web3 enthusiast building in the decentralised future. *Exploring blockchain, decentralization, and digital freedom."}
            </p>
          </div>
          
          {/* Reputation Score */}
          <div className="pt-8">
            <Badge className="bg-card border-2 border-foreground text-foreground px-4 py-2 text-lg font-bold">
              REP {displayReputation.toLocaleString()}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};