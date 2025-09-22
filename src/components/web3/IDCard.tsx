import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReputationCard } from './ReputationCard';
import { useWeb3 } from '@/hooks/useWeb3';
import { useUserProfile } from '@/hooks/useUserProfile';

export const IDCard = () => {
  const { account } = useWeb3();
  const { profile } = useUserProfile();
  
  // Mock account for demo purposes when no wallet is connected
  const demoAccount = account || '0x1234567890123456789012345678901234567890';
  const demoName = profile.name || 'Demo User';

  const formatDisplayAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-yellow-300 h-32">
          <CardContent className="p-4 h-full flex flex-col justify-center text-center text-black">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Your ID</h3>
              <p className="text-sm font-medium">{demoName}</p>
              <p className="text-xs opacity-80">{formatDisplayAddress(demoAccount)}</p>
              <p className="text-xs opacity-70">Click to manage</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <ReputationCard />
      </DialogContent>
    </Dialog>
  );
};