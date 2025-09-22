import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Lock, TrendingUp } from 'lucide-react';
import { WalletButton } from '@/components/web3/WalletButton';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="bg-gradient-card border-border shadow-card max-w-4xl w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            <Shield className="w-20 h-20 text-web3-orange mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Encrypted Reputation
            </h1>
            <p className="text-muted-foreground text-xl mb-6">
              Track and showcase your Web3 reputation privately and securely on TEN Testnet
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Lock className="w-12 h-12 text-web3-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Private by Design</h3>
              <p className="text-muted-foreground">Your reputation data is encrypted and only visible when you choose</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-web3-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reputation Tracking</h3>
              <p className="text-muted-foreground">Earn points for DeFi activities, governance, and more</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-web3-warning mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">TEN Powered</h3>
              <p className="text-muted-foreground">Built on TEN Testnet for privacy-preserving smart contracts</p>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-8">
              <WalletButton />
            </div>
            <p className="text-muted-foreground mb-4">
              First time here? Visit TEN Gateway to set up your wallet for the TEN Testnet
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.open('https://testnet.ten.xyz', '_blank')}
            >
              Visit TEN Gateway
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Landing;