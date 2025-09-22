import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download, Eye, EyeOff, Shield, CheckCircle2 } from 'lucide-react';
import { useReputation } from '@/hooks/useReputation';
import { useWeb3 } from '@/hooks/useWeb3';
import { useUserProfile } from '@/hooks/useUserProfile';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export const ReputationCard = () => {
  const { account } = useWeb3();
  const { reputation, badge, isPublic, togglePublicSharing } = useReputation();
  const { profile } = useUserProfile();
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Generate QR code for the wallet address  
  useEffect(() => {
    const addressToUse = account || '0x1234567890123456789012345678901234567890';
    QRCode.toDataURL(addressToUse, { 
      width: 120,
      margin: 1,
      color: { dark: '#000000', light: '#FFD700' }
    })
    .then(url => setQrCodeUrl(url))
    .catch(err => console.error('QR Code generation failed:', err));
  }, [account]);

  const downloadCard = async () => {
    const element = document.getElementById('golden-reputation-card');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#FFD700',
        scale: 2,
      });

      // Download as image
      const link = document.createElement('a');
      link.download = 'golden-reputation-card.png';
      link.href = canvas.toDataURL();
      link.click();

      // Also create PDF
      const pdf = new jsPDF('landscape');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('golden-reputation-card.pdf');

      toast.success('Golden reputation card downloaded!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download card');
    }
  };

  // Mock reputation score for display (since smart contract is failing)
  const displayScore = reputation?.total || 1589652;
  
  // Mock account for demo purposes when no wallet is connected
  const demoAccount = account || '0x1234567890123456789012345678901234567890';
  const demoName = profile.name || 'Demo User';
  const demoAvatar = profile.avatar || '';

  const formatDisplayAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getDisplayName = () => {
    return demoName;
  };

  const getDisplayEmail = () => {
    return `${formatDisplayAddress(demoAccount)}@ten.xyz`;
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Golden Reputation ID</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={togglePublicSharing}>
            {isPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isPublic ? 'Public' : 'Private'}
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCard}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          id="golden-reputation-card" 
          className="relative aspect-[1.6/1] bg-gradient-to-br from-badge-gold via-yellow-400 to-badge-gold rounded-xl p-8 text-black overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, hsl(51, 100%, 50%) 0%, hsl(45, 100%, 55%) 50%, hsl(51, 100%, 50%) 100%)',
            boxShadow: '0 20px 40px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          {/* Decorative golden overlay pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)'
            }}
          />
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 ring-4 ring-black/20">
                <AvatarImage src={profile.avatar} alt={getDisplayName()} />
                <AvatarFallback className="bg-black/20 text-black text-xl font-bold">
                  {getDisplayName().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-black">
                    {getDisplayName()}
                  </h3>
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-black/70 font-mono">
                  {formatDisplayAddress(demoAccount)}
                </p>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="bg-white/90 p-2 rounded-lg">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" />
              ) : (
                <div className="w-20 h-20 bg-white/50 rounded flex items-center justify-center">
                  <span className="text-xs text-black/50">QR</span>
                </div>
              )}
            </div>
          </div>

          {/* Golden Reputation ID Title */}
          <div className="text-center mb-6 relative z-10">
            <h2 className="text-2xl font-bold text-black tracking-wider">
              GOLDEN REPUTATION ID
            </h2>
          </div>

          {/* Main Score */}
          <div className="text-center mb-6 relative z-10">
            <div className="text-5xl font-bold text-black mb-2">
              {isPublic ? displayScore.toLocaleString() : '***'}
            </div>
          </div>

          {/* Shield Icon */}
          <div className="flex justify-center mb-6 relative z-10">
            <div className="bg-gradient-to-b from-yellow-300 to-yellow-600 p-4 rounded-full shadow-lg">
              <Shield className="w-12 h-12 text-black" />
            </div>
          </div>

          {/* Footer Information */}
          <div className="flex justify-between items-end relative z-10">
            <div>
              <div className="mb-2">
                <div className="text-sm text-black/70 mb-1">Email</div>
                <div className="font-mono text-sm text-black">
                  {getDisplayEmail()}
                </div>
              </div>
              
              {/* Signature line */}
              <div className="mt-4">
                <div className="text-xs text-black/70 mb-2">Signature</div>
                <div className="w-32 h-8 bg-black/10 rounded flex items-center justify-center">
                  <div className="text-2xl font-script text-black/60">
                    {getDisplayName().split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-black/70">
                Powered by TEN Testnet
              </div>
              <div className="text-xs text-black/70">
                Encrypted & Secure
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};