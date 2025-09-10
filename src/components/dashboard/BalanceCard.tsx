import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowUpRight } from 'lucide-react';

export const BalanceCard = () => {
  return (
    <Card className="bg-gradient-cyan shadow-cyan border-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-white" />
            <span className="text-white/80 text-sm font-medium">Balance</span>
          </div>
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 p-2">
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-3xl font-bold text-white mb-1">
          $0.00
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm">0 ETH</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-white/80 text-xs">0.13</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};