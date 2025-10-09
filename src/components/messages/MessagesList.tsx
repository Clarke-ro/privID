import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, Shield } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';
import { ethers } from 'ethers';
import { NewMessageSheet } from './NewMessageSheet';

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

const MESSAGE_CONTRACT_ADDRESS = '0xa2D9551c913747d101EBB6789F8baFC113758894';

const MESSAGE_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getInboxCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'getMessage',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'string', name: '', type: 'string' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export const MessagesList = ({ onMessageClick }: MessagesListProps) => {
  const { account, provider, isConnected } = useWeb3();
  const [conversations, setConversations] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!isConnected || !provider || !account) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const contract = new ethers.Contract(MESSAGE_CONTRACT_ADDRESS, MESSAGE_ABI, provider);
        const inboxCount = await contract.getInboxCount(account);

        // Get unique conversation partners
        const conversationPartners = new Set<string>();
        
        for (let i = 0; i < Number(inboxCount); i++) {
          try {
            const [from, to] = await contract.getMessage(account, i);
            // Add the other person in the conversation
            const otherAddress = from.toLowerCase() === account.toLowerCase() ? to : from;
            conversationPartners.add(otherAddress.toLowerCase());
          } catch (error) {
            console.error('Failed to load message:', error);
          }
        }

        // Fetch profiles for conversation partners
        if (conversationPartners.size > 0) {
          const { data, error } = await supabase
            .from('profiles')
            .select('id, wallet_address, username, avatar_url, bio')
            .in('wallet_address', Array.from(conversationPartners));

          if (error) throw error;

          const formattedConversations: Message[] = (data || []).map(user => ({
            id: user.id,
            sender: {
              name: user.username || `User ${user.wallet_address?.slice(0, 6)}`,
              avatar: user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.wallet_address}`,
              role: user.bio || 'Web3 User',
              address: user.wallet_address || undefined
            },
            preview: 'Encrypted conversation',
            timestamp: new Date(),
            unread: false,
            type: 'direct'
          }));

          setConversations(formattedConversations);
        } else {
          setConversations([]);
        }
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [isConnected, provider, account]);

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

  if (conversations.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-8 text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              No Conversations Yet
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start an end-to-end encrypted conversation with other users in the network.
            </p>
          </div>
          <NewMessageSheet onUserSelect={(user) => {
            onMessageClick({
              id: user.address,
              sender: user,
              preview: 'New conversation',
              timestamp: new Date(),
              unread: false,
              type: 'direct'
            });
          }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <NewMessageSheet onUserSelect={(user) => {
        onMessageClick({
          id: user.address,
          sender: user,
          preview: 'New conversation',
          timestamp: new Date(),
          unread: false,
          type: 'direct'
        });
      }} />
      
      {conversations.map((message) => (
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