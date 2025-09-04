import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { WalletButton } from '@/components/web3/WalletButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeb3 } from '@/hooks/useWeb3';
import { Wallet as WalletIcon, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Wallet = () => {
  const { account, chainId } = useWeb3();

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast.success('Address copied to clipboard');
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Wallet</h1>
                <p className="text-muted-foreground">
                  Manage your wallet connection and view details
                </p>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <WalletIcon className="w-5 h-5" />
                      Connection Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <WalletButton />
                    
                    {account && (
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-medium">Address</label>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="font-mono text-sm bg-muted p-2 rounded flex-1">
                              {account}
                            </p>
                            <Button variant="outline" size="sm" onClick={copyAddress}>
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Chain ID</label>
                          <p className="text-sm text-muted-foreground mt-1">{chainId}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Wallet;