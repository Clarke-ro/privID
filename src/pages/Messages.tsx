import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MessagesList, Message } from '@/components/messages/MessagesList';
import { MessageThread } from '@/components/messages/MessageThread';

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            {!selectedMessage ? (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Messages</h1>
                  <p className="text-muted-foreground">
                    Communicate with other users in the network
                  </p>
                </div>
                
                <MessagesList onMessageClick={handleMessageClick} />
              </div>
            ) : (
              <div className="h-full">
                <MessageThread 
                  recipient={selectedMessage.sender}
                  onBack={handleBack}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Messages;