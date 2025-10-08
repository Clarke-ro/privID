import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Shield, Lock } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { useMessaging } from '@/hooks/useMessaging';
import { useWeb3 } from '@/hooks/useWeb3';

interface MessageThreadProps {
  recipient: {
    name: string;
    avatar?: string;
    role: string;
    address?: string;
  };
  onBack: () => void;
}

export const MessageThread = ({ recipient, onBack }: MessageThreadProps) => {
  const { account } = useWeb3();
  const { messages: blockchainMessages, loading, hasPublicKey, sendEncryptedMessage, loadMessages, ensurePublicKey } = useMessaging();
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [settingUpKey, setSettingUpKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages when component mounts or recipient changes
  useEffect(() => {
    if (recipient.address) {
      loadMessages(recipient.address);
    }
  }, [recipient.address, loadMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [blockchainMessages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !recipient.address || sending) return;

    try {
      setSending(true);
      await sendEncryptedMessage(recipient.address, inputValue);
      setInputValue('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSetupKey = async () => {
    try {
      setSettingUpKey(true);
      await ensurePublicKey();
    } catch (error) {
      console.error('Failed to setup encryption key:', error);
    } finally {
      setSettingUpKey(false);
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

        {hasPublicKey && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
            <Shield className="h-3 w-3 text-primary" />
            <span>Encryption Active</span>
          </div>
        )}
        {!hasPublicKey && (
          <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-100 dark:bg-amber-900/20 px-3 py-1 rounded-full">
            <Lock className="h-3 w-3" />
            <span>Key Setup Required</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!hasPublicKey && !loading && (
          <div className="flex items-center justify-center h-full">
            <Card className="max-w-md border-amber-500/50 bg-amber-50 dark:bg-amber-900/10">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-amber-900 dark:text-amber-100">
                    Encryption Key Required
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    To send and receive encrypted messages, you need to set up your encryption key first. This only needs to be done once.
                  </p>
                </div>
                <Button 
                  onClick={handleSetupKey}
                  disabled={settingUpKey}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {settingUpKey ? (
                    <>
                      <Shield className="h-4 w-4 mr-2 animate-pulse" />
                      Setting Up Key...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Setup Encryption Key
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Your keys are generated locally and stored securely in your browser.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {hasPublicKey && loading && blockchainMessages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-2 animate-pulse" />
              <p>Loading encrypted messages...</p>
            </div>
          </div>
        )}
        
        {hasPublicKey && !loading && blockchainMessages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No messages yet. Start a secure conversation!</p>
            </div>
          </div>
        )}

        {blockchainMessages.map((message) => {
          const isUser = message.from.toLowerCase() === account?.toLowerCase();
          
          return (
            <div
              key={message.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {!isUser && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={recipient.avatar} alt={recipient.name} />
                    <AvatarFallback>{recipient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                
                <div>
                  <Card className={`${
                    isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card'
                  }`}>
                    <CardContent className="p-3">
                      <p className="text-sm">{message.content}</p>
                    </CardContent>
                  </Card>
                  
                  <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}>
                    {message.encrypted && <Shield className="h-3 w-3" />}
                    <span>{formatDistance(message.timestamp, new Date(), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-card/50 backdrop-blur-sm p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={hasPublicKey ? "Type an encrypted message..." : "Set up encryption key first..."}
            className="flex-1"
            disabled={!hasPublicKey || sending}
          />
          <Button 
            onClick={handleSend} 
            size="icon" 
            disabled={!hasPublicKey || sending || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Shield className="h-3 w-3" />
          {hasPublicKey 
            ? 'Messages are end-to-end encrypted and stored on TEN network.'
            : 'Connect wallet to enable encrypted messaging.'}
        </p>
      </div>
    </div>
  );
};
