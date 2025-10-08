import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';

export const WalletButton = () => {
  const { isConnected, account, connectWallet, disconnectWallet } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = () => {
    connectWallet(true); // Show toast for explicit user action
  };

  if (isConnected && account) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-card rounded-lg border border-border">
          <div className="w-2 h-2 bg-web3-orange rounded-full animate-pulse" />
          <span className="text-sm font-mono">{formatAddress(account)}</span>
        </div>
        <Button variant="outline" size="sm" onClick={disconnectWallet}>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnect} className="bg-gradient-button text-white font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300">
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
};