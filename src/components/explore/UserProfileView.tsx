import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  UserPlus, 
  MapPin, 
  Star, 
  TrendingUp, 
  Shield,
  Award,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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

interface UserProfileViewProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const getCardTheme = (user: User) => {
  const reputation = user.reputation || 0;
  
  if (user.badge === 'Community Leader' || reputation >= 3000) {
    return {
      tier: 'legendary',
      gradient: 'from-yellow-500/20 via-amber-500/10 to-orange-500/20',
      border: 'border-yellow-500/30',
      accent: 'text-yellow-600 dark:text-yellow-400',
      badgeGradient: 'from-yellow-500 to-amber-500'
    };
  } else if (user.badge === 'DeFi Expert' || user.badge === 'Tech Innovator' || reputation >= 2000) {
    return {
      tier: 'gold',
      gradient: 'from-purple-500/20 via-violet-500/10 to-indigo-500/20',
      border: 'border-purple-500/30',
      accent: 'text-purple-600 dark:text-purple-400',
      badgeGradient: 'from-purple-500 to-violet-500'
    };
  } else if (user.badge === 'UI/UX Pioneer' || reputation >= 1500) {
    return {
      tier: 'silver',
      gradient: 'from-blue-500/20 via-cyan-500/10 to-teal-500/20',
      border: 'border-blue-500/30',
      accent: 'text-blue-600 dark:text-blue-400',
      badgeGradient: 'from-blue-500 to-cyan-500'
    };
  } else {
    return {
      tier: 'bronze',
      gradient: 'from-green-500/20 via-emerald-500/10 to-teal-500/20',
      border: 'border-green-500/30',
      accent: 'text-green-600 dark:text-green-400',
      badgeGradient: 'from-green-500 to-emerald-500'
    };
  }
};

export const UserProfileView = ({ user, isOpen, onClose }: UserProfileViewProps) => {
  if (!user) return null;

  const theme = getCardTheme(user);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className={`relative p-8 rounded-xl bg-gradient-to-br ${theme.gradient} border ${theme.border} overflow-hidden`}>
              <div className="absolute inset-0 bg-mesh opacity-5" />
              
              <div className="relative flex items-start justify-between">
                <div className="flex items-start gap-6">
                  <Avatar className={`h-24 w-24 ring-4 ring-background shadow-glow`}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className={`font-bold text-3xl text-white bg-gradient-to-br ${theme.badgeGradient}`}>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-foreground">{user.name}</h2>
                      <CheckCircle2 className="h-6 w-6 text-web3-success" />
                    </div>
                    <p className={`text-lg font-medium ${theme.accent} mb-2`}>{user.role}</p>
                    {user.location && (
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {user.location}
                      </div>
                    )}
                    {user.badge && (
                      <div className="mt-3">
                        <Badge className={`bg-gradient-to-r ${theme.badgeGradient} text-white border-0 shadow-glow px-4 py-1.5 text-sm`}>
                          <Award className="h-4 w-4 mr-1" />
                          {user.badge}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${theme.accent} bg-background/80 backdrop-blur-sm border ${theme.border} shadow-card`}>
                  {theme.tier.charAt(0).toUpperCase() + theme.tier.slice(1)} Tier
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4">
              {user.showReputation && user.reputation ? (
                <Card className={`border ${theme.border} bg-gradient-to-br ${theme.gradient}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.badgeGradient} shadow-glow`}>
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reputation Score</p>
                        <p className={`text-3xl font-bold ${theme.accent}`}>
                          {user.reputation.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Eye className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-muted-foreground">Public</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border border-dashed border-border/50 bg-muted/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-muted">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reputation Score</p>
                        <p className="text-xl font-bold text-muted-foreground">Hidden</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Private</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {user.projectsCompleted && (
                <Card className={`border ${theme.border} bg-gradient-to-br ${theme.gradient}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.badgeGradient} shadow-glow`}>
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Projects Completed</p>
                        <p className={`text-3xl font-bold ${theme.accent}`}>
                          {user.projectsCompleted}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* About Section */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star className={`h-5 w-5 ${theme.accent}`} />
                  About
                </h3>
                <p className="text-muted-foreground leading-relaxed">{user.description}</p>
              </CardContent>
            </Card>

            {/* Skills Section */}
            {user.skills && user.skills.length > 0 && (
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className={`px-3 py-1.5 text-sm border ${theme.border} bg-gradient-to-br ${theme.gradient}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className={`flex-1 bg-gradient-to-r ${theme.badgeGradient} text-white hover:opacity-90 shadow-glow`}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Connect
              </Button>
              <Button size="lg" variant="outline" className={`flex-1 ${theme.border}`}>
                <MessageCircle className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
