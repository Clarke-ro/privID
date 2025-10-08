import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield } from 'lucide-react';
import { ReputationCard } from './ReputationCard';
import { useWeb3 } from '@/hooks/useWeb3';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useReputation } from '@/hooks/useReputation';
import useAttestations from '@/hooks/useAttestations';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export const IDCard = () => {
  const { account } = useWeb3();
  const { profile } = useUserProfile();
  const { reputation } = useReputation();
  const { getAttestationHash, loading } = useAttestations();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  
  // Mock account for demo purposes when no wallet is connected
  const demoAccount = account || '0x1234567890123456789012345678901234567890';
  const demoName = profile.name || 'Demo User';
  const displayScore = reputation?.total || 0;
  
  // Determine reputation tier
  const reputationType = displayScore >= 1000000 ? 'GOLDEN' : 'SILVER';

  // Get verification hash if available (loads from blockchain)
  const verificationHash = getAttestationHash('national-id');
  
  // Generate QR code with verification hash if available, otherwise use account
  const qrData = verificationHash ? `0x${verificationHash}` : demoAccount;
  
  useEffect(() => {
    QRCode.toDataURL(qrData, { 
      width: 60,
      margin: 1,
      color: { dark: '#000000', light: 'transparent' }
    })
    .then(url => setQrCodeUrl(url))
    .catch(err => console.error('QR Code generation failed:', err));
  }, [qrData]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-yellow-300 h-32 overflow-hidden">
          <CardContent className="p-3 h-full relative text-black">
            {/* Reputation ID Type at top */}
            <div className="text-center mb-2">
              <h3 className="text-xs font-bold tracking-wider">{reputationType} REPUTATION ID</h3>
            </div>
            
            {/* Name and Icon on the right */}
            <div className="absolute top-8 right-3 flex items-center gap-1">
              <Avatar className="w-6 h-6">
                <AvatarImage src={profile.avatar} alt={demoName} />
                <AvatarFallback className="bg-black/20 text-black text-xs">
                  {demoName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span className="text-xs font-medium truncate max-w-16">{demoName}</span>
              </div>
            </div>
            
            {/* Reputation Points at center bottom */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-lg font-bold">{displayScore.toLocaleString()}</div>
              <div className="text-xs opacity-80">POINTS</div>
            </div>
            
            {/* QR Code at right bottom */}
            <div className="absolute bottom-2 right-2">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="QR Code" className="w-8 h-8 opacity-80" />
              ) : (
                <div className="w-8 h-8 bg-black/20 rounded flex items-center justify-center">
                  <span className="text-xs">QR</span>
                </div>
              )}
            </div>
            
            {/* Click hint */}
            <div className="absolute bottom-2 left-2 text-xs opacity-60">
              Click to manage
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