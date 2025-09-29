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
      <div className="w-full max-w-6xl mx-auto px-4">
        <Card className="backdrop-blur-xl bg-card/80 border-primary/20 shadow-glow overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
          
          <CardContent className="relative p-12 text-center">
            <div className="mb-10 animate-fade-in">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-web3 blur-3xl opacity-30 animate-pulse" />
                <Shield className="w-20 h-20 text-primary mx-auto mb-6 relative drop-shadow-glow" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-web3 bg-clip-text text-transparent">
                Welcome to Encrypted Reputation
              </h1>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Track and showcase your Web3 reputation privately and securely on TEN Testnet
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="group p-6 rounded-2xl bg-gradient-card backdrop-blur border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-web3-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Lock className="w-10 h-10 text-web3-blue mx-auto relative" />
                </div>
                <h3 className="font-bold text-lg mb-2">Private by Design</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your reputation data is encrypted and only visible when you choose
                </p>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-card backdrop-blur border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-web3-success/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <TrendingUp className="w-10 h-10 text-web3-success mx-auto relative" />
                </div>
                <h3 className="font-bold text-lg mb-2">Reputation Tracking</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Earn points for DeFi activities, governance, and more
                </p>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-card backdrop-blur border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-web3-warning/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Zap className="w-10 h-10 text-web3-warning mx-auto relative" />
                </div>
                <h3 className="font-bold text-lg mb-2">TEN Powered</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built on TEN Testnet for privacy-preserving smart contracts
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block">
                <WalletButton />
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-muted-foreground mb-4 text-sm">
                  First time here? Visit TEN Gateway to set up your wallet for the TEN Testnet
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://testnet.ten.xyz', '_blank')}
                  className="hover:bg-primary/10 hover:border-primary/50 transition-all"
                >
                  Visit TEN Gateway
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <Card className="backdrop-blur-xl bg-card/80 border-primary/20 shadow-glow overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
          
          <CardContent className="relative p-10 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-web3 blur-3xl opacity-40 animate-pulse" />
              <Shield className="w-20 h-20 text-accent mx-auto relative drop-shadow-glow" />
            </div>
            
            <h2 className="text-3xl font-bold mb-3 bg-gradient-web3 bg-clip-text text-transparent">
              Get Started with Reputation Tracking
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Register your wallet to start building your encrypted reputation score
            </p>
            
            <Button 
              onClick={register} 
              disabled={registering}
              className="bg-gradient-web3 hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 hover:scale-105"
              size="lg"
            >
              {registering ? 'Registering...' : 'Register for Reputation Tracking'}
            </Button>
            
            <p className="text-sm text-muted-foreground mt-6 opacity-70">
              This will create your reputation profile on the TEN Testnet
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};