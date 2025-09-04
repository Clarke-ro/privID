import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ExternalLink, Edit, Settings } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';
import { useReputation } from '@/hooks/useReputation';
import { useUserProfile } from '@/hooks/useUserProfile';

export const MobileUserProfile = () => {
  const { account } = useWeb3();
  const { reputation } = useReputation();
  const { profile } = useUserProfile();

  const formatAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'gold': return 'bg-badge-gold text-badge-gold-foreground';
      case 'silver': return 'bg-badge-silver text-badge-silver-foreground';
      case 'bronze': return 'bg-badge-bronze text-badge-bronze-foreground';
      default: return 'bg-web3-orange text-primary-foreground';
    }
  };

  const displayAccount = account || "0x1234567890123456789012345678901234567890";
  const displayReputation = reputation?.total || 0;
  const displayBadge = { type: 'gold', label: 'Verified Creator' };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16 ring-2 ring-web3-orange/20">
          <AvatarImage src={profile.avatar} alt={profile.name || "User"} />
          <AvatarFallback className="bg-web3-orange/10 text-web3-orange text-lg font-semibold">
            {(profile.name || "UN").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-foreground truncate">
              {profile.name || "Anonymous User"}
            </h2>
            <CheckCircle2 className="w-5 h-5 text-web3-orange flex-shrink-0" />
          </div>
          
          {profile.role && (
            <p className="text-sm text-muted-foreground mb-1">
              {profile.role}
            </p>
          )}
          
          <p className="text-sm text-muted-foreground font-mono">
            {formatAddress(displayAccount)}
          </p>
          
          <div className="flex items-center gap-2 mt-2">
            <Badge className={`${getBadgeColor(displayBadge.type)} text-xs`}>
              {displayBadge.label}
            </Badge>
          </div>
        </div>

        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Reputation Score */}
      <div className="bg-gradient-primary rounded-2xl p-6 text-center">
        <div className="text-white/80 text-sm uppercase tracking-wide mb-2">
          Reputation Score
        </div>
        <div className="text-4xl font-bold text-white mb-1">
          {displayReputation.toLocaleString()}
        </div>
        <div className="text-white/70 text-sm">
          Based on verified activities
        </div>
      </div>

      {/* About Section */}
      {profile.about && (
        <div className="bg-muted/50 rounded-2xl p-4">
          <h3 className="font-semibold text-foreground mb-2">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile.about}
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">142</div>
          <div className="text-xs text-muted-foreground">Transactions</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">28</div>
          <div className="text-xs text-muted-foreground">NFTs</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">9</div>
          <div className="text-xs text-muted-foreground">Protocols</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="justify-center">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
        <Button variant="outline" className="justify-center">
          <ExternalLink className="w-4 h-4 mr-2" />
          Share Profile
        </Button>
      </div>
    </div>
  );
};