import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Shield } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'other';
  encrypted: boolean;
}

interface MessageThreadProps {
  recipient: {
    name: string;
    avatar?: string;
    role: string;
  };
  onBack: () => void;
}

export const MessageThread = ({ recipient, onBack }: MessageThreadProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hey! I saw your post about the AMM contract. Would love to discuss the gas optimization techniques you used...',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      sender: 'other',
      encrypted: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: new Date(),
      sender: 'user',
      encrypted: true
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-10 w-10">
          <AvatarImage src={recipient.avatar} alt={recipient.name} />
          <AvatarFallback>{recipient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{recipient.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{recipient.role}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
          <Shield className="h-3 w-3 text-primary" />
          <span>End-to-End Encrypted</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {message.sender === 'other' && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={recipient.avatar} alt={recipient.name} />
                  <AvatarFallback>{recipient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
              
              <div>
                <Card className={`${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm">{message.content}</p>
                  </CardContent>
                </Card>
                
                <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  {message.encrypted && <Shield className="h-3 w-3" />}
                  <span>{formatDistance(message.timestamp, new Date(), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-card/50 backdrop-blur-sm p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type an encrypted message..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Messages are end-to-end encrypted. Smart contract integration pending.
        </p>
      </div>
    </div>
  );
};
