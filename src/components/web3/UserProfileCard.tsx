import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, Award, ExternalLink, Edit3 } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';
import { useReputation } from '@/hooks/useReputation';
import { useUserProfile } from '@/hooks/useUserProfile';
export const UserProfileCard = () => {
  const {
    account
  } = useWeb3();
  const {
    reputation,
    badge
  } = useReputation();
  const { profile } = useUserProfile();
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'gold':
        return 'bg-badge-gold text-foreground border-badge-gold/30';
      case 'silver':
        return 'bg-badge-silver text-foreground border-badge-silver/30';
      case 'bronze':
        return 'bg-badge-bronze text-card border-badge-bronze/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Use actual reputation data, start at 0 if not available
  const displayAccount = account || "0x0000...0000";
  const displayReputation = reputation?.total || 0;
  const displayBadge = badge || {
    type: 'none' as const,
    threshold: 0,
    name: 'Unranked'
  };
  return <Card className="bg-gradient-card border-border max-w-sm mx-auto">
      <CardContent className="p-6 text-center">
        {/* Profile Image at Top */}
        <div className="relative mb-4 flex justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Profile" />
            <AvatarFallback className="text-2xl bg-gradient-primary text-white">
              {profile.name ? profile.name.slice(0, 2).toUpperCase() : displayAccount.slice(2, 4).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name, Role and Reputation Score */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-left flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-1 mb-1">
              <div className={`font-bold text-foreground leading-tight ${
                (profile.name || 'Anonymous User').length > 15 
                  ? 'text-lg' 
                  : (profile.name || 'Anonymous User').length > 10 
                    ? 'text-xl' 
                    : 'text-2xl'
              }`}>
                {profile.name || 'Anonymous User'}
              </div>
              <CheckCircle2 className="w-5 h-5 text-web3-success flex-shrink-0" />
            </div>
            {profile.role && (
              <div className="text-sm text-muted-foreground">
                {profile.role}
              </div>
            )}
          </div>
          
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-web3-orange">
              {displayReputation.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Badge - Center Aligned */}
        <div className="mb-4 flex justify-center">
          <Badge className={`${getBadgeColor(displayBadge.type)} px-3 py-1.5 text-sm font-semibold border-2`}>
            <Award className="w-4 h-4 mr-1" />
            {displayBadge.name}
          </Badge>
        </div>

        {/* About Description - Center Aligned */}
        <div className="mb-6">
          <p className="text-muted-foreground text-sm text-center">
            {profile.about || "Web3 enthusiast building the decentralised future. Exploring blockchain, decentralization, and digital freedom."}
          </p>
        </div>

        {/* Social Icons - Justified at Bottom */}
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="w-3 h-3" />
          </Button>
          
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>;
};