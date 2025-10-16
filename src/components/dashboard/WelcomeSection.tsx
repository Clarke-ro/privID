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
      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-500 blur-3xl opacity-30" />
            <Shield className="w-16 h-16 mx-auto relative" style={{
              filter: 'drop-shadow(0 4px 8px rgba(148, 163, 184, 0.4)) drop-shadow(0 0 20px rgba(203, 213, 225, 0.3))',
              color: '#cbd5e1'
            }} />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            PrivID,
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              anywhere.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Track and showcase your Web3 reputation privately on TEN Testnet
          </p>
          
          <div className="inline-block">
            <WalletButton />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="group p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Lock className="w-12 h-12 text-primary relative" />
            </div>
            <h3 className="font-bold text-xl mb-3">Private by Design</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your reputation data is encrypted and only visible when you choose
            </p>
          </Card>
          
          <Card className="group p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-web3-green/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <TrendingUp className="w-12 h-12 text-web3-green relative" />
            </div>
            <h3 className="font-bold text-xl mb-3">Reputation Tracking</h3>
            <p className="text-muted-foreground leading-relaxed">
              Earn points for DeFi activities, governance, and more
            </p>
          </Card>
          
          <Card className="group p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-web3-orange/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Zap className="w-12 h-12 text-web3-orange relative" />
            </div>
            <h3 className="font-bold text-xl mb-3">TEN Powered</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built on TEN Testnet for privacy-preserving smart contracts
            </p>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto p-8 bg-muted/30 border-border/50">
          <p className="text-center text-muted-foreground mb-4">
            First time here? Visit TEN Gateway to set up your wallet for the TEN Testnet
          </p>
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://testnet.ten.xyz', '_blank')}
              className="hover:bg-primary/10 hover:border-primary/50"
            >
              Visit TEN Gateway
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 relative z-10">
        <Card className="p-12 text-center shadow-2xl border-border/50">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-500 blur-3xl opacity-30" />
            <Shield className="w-20 h-20 mx-auto relative" style={{
              filter: 'drop-shadow(0 4px 8px rgba(148, 163, 184, 0.4)) drop-shadow(0 0 20px rgba(203, 213, 225, 0.3))',
              color: '#cbd5e1'
            }} />
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            Get Started
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Register your wallet to start building your encrypted reputation score
          </p>
          
          <Button 
            onClick={register} 
            disabled={registering}
            className="w-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            size="lg"
          >
            {registering ? 'Registering...' : 'Register Now'}
          </Button>
          
          <p className="text-sm text-muted-foreground mt-6">
            This will create your reputation profile on the TEN Testnet
          </p>
        </Card>
      </div>
    );
  }

  return null;
};