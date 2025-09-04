import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  reputation?: number;
  showReputation: boolean;
  badge?: string;
  description: string;
}

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold truncate">{user.name}</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{user.role}</p>
            
            <div className="flex items-center space-x-2 mb-3">
              {user.showReputation && user.reputation && (
                <Badge variant="secondary">
                  Reputation: {user.reputation}
                </Badge>
              )}
              {user.badge && (
                <Badge className="bg-gradient-primary text-white">
                  {user.badge}
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-foreground overflow-hidden text-ellipsis">{user.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};