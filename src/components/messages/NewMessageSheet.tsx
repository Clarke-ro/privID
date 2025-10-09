import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Search, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useWeb3 } from '@/hooks/useWeb3';

interface User {
  id: string;
  wallet_address: string;
  username: string;
  avatar_url?: string;
  bio?: string;
}

interface NewMessageSheetProps {
  onUserSelect: (user: { name: string; avatar?: string; role: string; address: string }) => void;
}

export const NewMessageSheet = ({ onUserSelect }: NewMessageSheetProps) => {
  const { account } = useWeb3();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.username.toLowerCase().includes(query) ||
            user.wallet_address.toLowerCase().includes(query) ||
            (user.bio && user.bio.toLowerCase().includes(query))
        )
      );
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, wallet_address, username, avatar_url, bio')
        .not('wallet_address', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filter out current user
      const filtered = (data || []).filter(
        (user) => user.wallet_address?.toLowerCase() !== account?.toLowerCase()
      );
      
      setUsers(filtered);
      setFilteredUsers(filtered);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user: User) => {
    onUserSelect({
      name: user.username || `User ${user.wallet_address.slice(0, 6)}`,
      avatar: user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.wallet_address}`,
      role: user.bio || 'Web3 User',
      address: user.wallet_address
    });
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="lg" className="w-full">
          <MessageCircle className="h-5 w-5 mr-2" />
          Start Encrypted Messaging
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] overflow-hidden flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            New Encrypted Message
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by username or wallet address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : filteredUsers.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? 'No users found matching your search.' : 'No users available to message.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <Card
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.wallet_address}`}
                        alt={user.username}
                      />
                      <AvatarFallback>
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold truncate">{user.username}</h4>
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          E2E
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground truncate mb-1">
                        {user.bio || 'Web3 User'}
                      </p>

                      <p className="text-xs text-muted-foreground font-mono truncate">
                        {user.wallet_address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
