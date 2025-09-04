import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Lock, TrendingUp } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';
import { useReputation } from '@/hooks/useReputation';
import { WalletButton } from '@/components/web3/WalletButton';

export const WelcomeSection = () => {
  const { isConnected } = useWeb3();
  const { isRegistered, register, registering } = useReputation();

  if (!isConnected) {
    return (
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Shield className="w-16 h-16 text-web3-orange mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Welcome to Encrypted Reputation</h2>
            <p className="text-muted-foreground text-lg">
              Track and showcase your Web3 reputation privately and securely on TEN Testnet
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Lock className="w-8 h-8 text-web3-blue mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Private by Design</h3>
              <p className="text-sm text-muted-foreground">Your reputation data is encrypted and only visible when you choose</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-web3-success mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Reputation Tracking</h3>
              <p className="text-sm text-muted-foreground">Earn points for DeFi activities, governance, and more</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-web3-warning mx-auto mb-2" />
              <h3 className="font-semibold mb-1">TEN Powered</h3>
              <p className="text-sm text-muted-foreground">Built on TEN Testnet for privacy-preserving smart contracts</p>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <WalletButton />
            </div>
            <p className="text-muted-foreground mb-4">
              First time here? Visit TEN Gateway to set up your wallet for the TEN Testnet
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.open('https://gateway.ten.xyz/', '_blank')}
            >
              Visit TEN Gateway
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isRegistered) {
    return (
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-8 text-center">
          <Shield className="w-16 h-16 text-web3-orange mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Get Started with Reputation Tracking</h2>
          <p className="text-muted-foreground mb-6">
            Register your wallet to start building your encrypted reputation score
          </p>
          
          <Button 
            onClick={register} 
            disabled={registering}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            {registering ? 'Registering...' : 'Register for Reputation Tracking'}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            This will create your reputation profile on the TEN Testnet
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
};