import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    role: string;
  };
  preview: string;
  timestamp: Date;
  unread: boolean;
  type: 'direct' | 'group' | 'system';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: {
      name: 'Sarah Chen',
      role: 'Smart Contract Developer',
      avatar: ''
    },
    preview: 'Hey! I saw your post about the AMM contract. Would love to discuss the gas optimization techniques you used...',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    unread: true,
    type: 'direct'
  },
  {
    id: '2',
    sender: {
      name: 'DeFi Developers',
      role: 'Group Chat',
      avatar: ''
    },
    preview: 'Alex Rodriguez: The new Uniswap V4 hooks are game-changing for custom AMM logic...',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    unread: true,
    type: 'group'
  },
  {
    id: '3',
    sender: {
      name: 'System',
      role: 'Notification',
      avatar: ''
    },
    preview: 'Your reputation score has increased! You earned 50 points for completing a successful audit.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    unread: false,
    type: 'system'
  },
  {
    id: '4',
    sender: {
      name: 'Michael Thompson',
      role: 'Blockchain Analyst',
      avatar: ''
    },
    preview: 'Thanks for sharing the market analysis! Your insights on Layer 2 adoption were spot on.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    unread: false,
    type: 'direct'
  },
  {
    id: '5',
    sender: {
      name: 'Web3 Designers',
      role: 'Group Chat',
      avatar: ''
    },
    preview: 'Emma Davis: Anyone working on wallet UX improvements? I have some ideas to share...',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    unread: false,
    type: 'group'
  }
];

export const MessagesList = () => {
  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'group':
        return 'bg-gradient-primary text-white';
      case 'system':
        return 'bg-gradient-card text-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-4">
      {mockMessages.map((message) => (
        <Card 
          key={message.id} 
          className={`cursor-pointer hover:shadow-md transition-shadow ${
            message.unread ? 'border-primary/50 bg-primary/5' : ''
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                <AvatarFallback>{message.sender.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold truncate">{message.sender.name}</h4>
                    {message.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDistance(message.timestamp, new Date(), { addSuffix: true })}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getMessageTypeColor(message.type)} variant="secondary">
                    {message.type}
                  </Badge>
                  <p className="text-sm text-muted-foreground truncate">{message.sender.role}</p>
                </div>
                
                <p className="text-sm text-foreground overflow-hidden text-ellipsis">{message.preview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};