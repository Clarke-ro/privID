import { WalletButton } from '@/components/web3/WalletButton';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Encrypted Reputation
            </h1>
            <span className="text-xs bg-web3-orange/20 text-web3-orange px-2 py-1 rounded-full">
              TEN Testnet
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a 
              href="https://docs.ten.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2"
            >
              TEN Docs
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
          
          <ThemeToggle />
          <WalletButton />
        </div>
      </div>
    </header>
  );
};