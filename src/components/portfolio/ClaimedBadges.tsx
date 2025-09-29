import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge3D } from '@/components/web3/Badge3D';
import { Award, Trophy, Crown, Star } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

const iconMap = {
  Award,
  Trophy,
  Crown,
  Star,
};

export const ClaimedBadges = () => {
  const { profile } = useUserProfile();
  const claimedBadges = profile?.claimedBadges || [];

  if (claimedBadges.length === 0) {
    return (
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>Achievement Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No badges claimed yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Complete milestones to earn and claim badges!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Achievement Badges ({claimedBadges.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {claimedBadges.map((badge) => {
            const IconComponent = iconMap[badge.iconName as keyof typeof iconMap] || Award;
            return (
              <div key={badge.id} className="relative group">
                <Badge3D
                  tier={badge.tier}
                  icon={IconComponent}
                  title={badge.title}
                  size="md"
                  className="transition-transform hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-black/80 rounded-full" />
                  <p className="relative text-xs text-white text-center px-2 z-10">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
