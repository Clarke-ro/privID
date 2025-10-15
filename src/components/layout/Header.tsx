import { WalletButton } from '@/components/web3/WalletButton';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export const Header = () => {
  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-6 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-8">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              Encrypted Reputation
            </h1>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              TEN
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <a 
              href="https://docs.ten.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <span className="text-sm">Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
          
          <ThemeToggle />
          <WalletButton />
        </div>
      </div>
    </header>
  );
};