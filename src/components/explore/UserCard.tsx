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
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm overflow-hidden">
      <CardHeader className="relative pb-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-primary text-white font-semibold text-lg">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user.showReputation && user.reputation && user.reputation > 2000 && (
                <div className="absolute -top-1 -right-1 bg-web3-orange rounded-full p-1">
                  <Star className="h-3 w-3 text-white fill-current" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {user.name}
              </h3>
              <p className="text-sm font-medium text-primary">{user.role}</p>
              {user.location && (
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {user.location}
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="border-primary/20 hover:border-primary/40">
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
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
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-primary/10 to-transparent">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-primary mr-1" />
                </div>
                <div className="text-lg font-bold text-primary">{user.reputation.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Reputation</div>
              </div>
            )}
            {user.projectsCompleted && (
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-accent/10 to-transparent">
                <div className="text-lg font-bold text-foreground">{user.projectsCompleted}</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
            )}
            {user.badge && (
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-web3-orange/10 to-transparent">
                <Badge className="bg-gradient-primary text-white border-0 shadow-sm">
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