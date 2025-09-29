import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, UserPlus, MapPin, Star, TrendingUp } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  reputation?: number;
  showReputation: boolean;
  badge?: string;
  description: string;
  location?: string;
  skills?: string[];
  projectsCompleted?: number;
}

interface UserCardProps {
  user: User;
  onUserClick?: (user: User) => void;
}

// Function to get card theme based on user's achievements
const getCardTheme = (user: User) => {
  // Determine tier based on reputation and badge
  const reputation = user.reputation || 0;
  
  if (user.badge === 'Community Leader' || reputation >= 3000) {
    return {
      tier: 'legendary',
      gradient: 'from-yellow-500/20 via-amber-500/10 to-orange-500/20',
      border: 'border-yellow-500/30 hover:border-yellow-500/50',
      accent: 'text-yellow-600 dark:text-yellow-400',
      ringColor: 'ring-yellow-500/30 group-hover:ring-yellow-500/50',
      statBg: 'from-yellow-500/20 to-amber-500/10'
    };
  } else if (user.badge === 'DeFi Expert' || user.badge === 'Tech Innovator' || reputation >= 2000) {
    return {
      tier: 'gold',
      gradient: 'from-purple-500/20 via-violet-500/10 to-indigo-500/20',
      border: 'border-purple-500/30 hover:border-purple-500/50',
      accent: 'text-purple-600 dark:text-purple-400',
      ringColor: 'ring-purple-500/30 group-hover:ring-purple-500/50',
      statBg: 'from-purple-500/20 to-violet-500/10'
    };
  } else if (user.badge === 'UI/UX Pioneer' || reputation >= 1500) {
    return {
      tier: 'silver',
      gradient: 'from-blue-500/20 via-cyan-500/10 to-teal-500/20',
      border: 'border-blue-500/30 hover:border-blue-500/50',
      accent: 'text-blue-600 dark:text-blue-400',
      ringColor: 'ring-blue-500/30 group-hover:ring-blue-500/50',
      statBg: 'from-blue-500/20 to-cyan-500/10'
    };
  } else if (reputation >= 1000) {
    return {
      tier: 'bronze',
      gradient: 'from-green-500/20 via-emerald-500/10 to-teal-500/20',
      border: 'border-green-500/30 hover:border-green-500/50',
      accent: 'text-green-600 dark:text-green-400',
      ringColor: 'ring-green-500/30 group-hover:ring-green-500/50',
      statBg: 'from-green-500/20 to-emerald-500/10'
    };
  } else {
    return {
      tier: 'starter',
      gradient: 'from-slate-500/20 via-gray-500/10 to-zinc-500/20',
      border: 'border-slate-500/30 hover:border-slate-500/50',
      accent: 'text-slate-600 dark:text-slate-400',
      ringColor: 'ring-slate-500/30 group-hover:ring-slate-500/50',
      statBg: 'from-slate-500/20 to-gray-500/10'
    };
  }
};

interface UserCardProps {
  user: User;
  onUserClick?: (user: User) => void;
}

export const UserCard = ({ user, onUserClick }: UserCardProps) => {
  const theme = getCardTheme(user);
  
  return (
    <Card 
      className={`group hover:shadow-xl transition-all duration-300 ${theme.border} bg-gradient-to-br ${theme.gradient} backdrop-blur-sm overflow-hidden relative cursor-pointer`}
      onClick={() => onUserClick?.(user)}
    >
      {/* Tier indicator */}
      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${theme.accent} bg-background/80 backdrop-blur-sm border ${theme.border}`}>
        {theme.tier.charAt(0).toUpperCase() + theme.tier.slice(1)}
      </div>
      
      <CardHeader className="relative pb-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className={`h-16 w-16 ring-2 ${theme.ringColor} transition-all`}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className={`font-semibold text-lg text-white bg-gradient-to-br ${theme.gradient.replace('/20', '/60').replace('/10', '/40')}`}>
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user.showReputation && user.reputation && user.reputation > 2000 && (
                <div className={`absolute -top-1 -right-1 rounded-full p-1 ${theme.tier === 'legendary' ? 'bg-yellow-500' : theme.tier === 'gold' ? 'bg-purple-500' : 'bg-web3-orange'}`}>
                  <Star className="h-3 w-3 text-white fill-current" />
                </div>
              )}
            </div>
            <div>
              <h3 className={`text-xl font-bold text-foreground group-hover:${theme.accent} transition-colors`}>
                {user.name}
              </h3>
              <p className={`text-sm font-medium ${theme.accent}`}>{user.role}</p>
              {user.location && (
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {user.location}
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className={`${theme.border} hover:${theme.accent} hover:bg-background/80`}>
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button size="sm" className={`bg-gradient-to-r ${theme.gradient.replace('/20', '/80').replace('/10', '/60')} text-white hover:opacity-90 border-0`}>
              <UserPlus className="h-4 w-4 mr-1" />
              Connect
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {user.showReputation && user.reputation && (
              <div className={`text-center p-3 rounded-lg bg-gradient-to-br ${theme.statBg} border ${theme.border}`}>
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className={`h-4 w-4 ${theme.accent} mr-1`} />
                </div>
                <div className={`text-lg font-bold ${theme.accent}`}>{user.reputation.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Reputation</div>
              </div>
            )}
            {user.projectsCompleted && (
              <div className={`text-center p-3 rounded-lg bg-gradient-to-br ${theme.statBg} border ${theme.border}`}>
                <div className={`text-lg font-bold ${theme.accent}`}>{user.projectsCompleted}</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
            )}
            {user.badge && (
              <div className={`text-center p-3 rounded-lg bg-gradient-to-br ${theme.statBg} border ${theme.border}`}>
                <Badge className={`text-white border-0 shadow-sm bg-gradient-to-r ${theme.gradient.replace('/20', '/80').replace('/10', '/60')}`}>
                  {user.badge}
                </Badge>
              </div>
            )}
          </div>
          
          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {user.skills.slice(0, 4).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
                {user.skills.length > 4 && (
                  <Badge variant="outline" className="text-xs border-dashed">
                    +{user.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {user.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};