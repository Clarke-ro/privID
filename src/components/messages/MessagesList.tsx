import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Users } from 'lucide-react';

export interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    role: string;
    address?: string;
  };
  preview: string;
  timestamp: Date;
  unread: boolean;
  type: 'direct' | 'group' | 'system';
}

interface MessagesListProps {
  onMessageClick: (message: Message) => void;
}

export const MessagesList = ({ onMessageClick }: MessagesListProps) => {
  const [users, setUsers] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('id, wallet_address, username, avatar_url, bio')
          .not('wallet_address', 'is', null)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedUsers: Message[] = (data || []).map(user => ({
          id: user.id,
          sender: {
            name: user.username || `User ${user.wallet_address?.slice(0, 6)}`,
            avatar: user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.wallet_address}`,
            role: user.bio || 'Web3 User',
            address: user.wallet_address || undefined
          },
          preview: 'Click to start a secure conversation',
          timestamp: new Date(),
          unread: false,
          type: 'direct'
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <h3 className="font-semibold mb-2">No Users Found</h3>
          <p className="text-sm text-muted-foreground">
            Users who connect their wallets will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((message) => (
        <Card 
          key={message.id} 
          onClick={() => onMessageClick(message)}
          className="cursor-pointer hover:shadow-md transition-shadow hover:border-primary/50"
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                <AvatarFallback>{message.sender.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold truncate">{message.sender.name}</h4>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    Direct
                  </Badge>
                  <p className="text-sm text-muted-foreground truncate">{message.sender.role}</p>
                </div>
                
                {message.sender.address && (
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {message.sender.address}
                  </p>
                )}
                
                <p className="text-sm text-foreground/60 mt-2">{message.preview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};