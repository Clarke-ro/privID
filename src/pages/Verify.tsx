import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Shield, Scan } from 'lucide-react';
import useAttestations from '@/hooks/useAttestations';
import { toast } from 'sonner';

const Verify = () => {
  const [userAddress, setUserAddress] = useState('');
  const [inputHash, setInputHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    found: boolean;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { verifyHash } = useAttestations();

  const handleVerify = async () => {
    if (!inputHash.trim() || !userAddress.trim()) {
      toast.error('Please enter both wallet address and hash');
      return;
    }
    
    setIsVerifying(true);
    try {
      const isValid = await verifyHash(userAddress.trim(), inputHash.trim());
      setVerificationResult({
        found: isValid
      });
      
      if (isValid) {
        toast.success('Credential verified successfully!');
      } else {
        toast.error('Credential not found or invalid');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed');
      setVerificationResult({ found: false });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClear = () => {
    setUserAddress('');
    setInputHash('');
    setVerificationResult(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6 bg-gradient-to-br from-web3-dark via-background to-web3-accent/5">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="h-8 w-8 text-web3-primary" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-web3-primary to-web3-accent bg-clip-text text-transparent">
                    Credential Verification
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  Verify the authenticity of National ID credentials using their unique hash
                </p>
              </div>

              {/* Verification Input */}
              <Card className="border-web3-primary/20 bg-gradient-to-br from-web3-dark/50 to-web3-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="h-5 w-5" />
                    Enter Verification Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Wallet Address</label>
                    <Input
                      placeholder="0x..."
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the wallet address of the credential holder
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Credential Hash</label>
                    <Input
                      placeholder="Paste the 64-character hash from QR code or ID card..."
                      value={inputHash}
                      onChange={(e) => setInputHash(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Hash should be exactly 64 characters long (hexadecimal)
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleVerify}
                      disabled={!inputHash.trim() || !userAddress.trim() || isVerifying}
                      className="flex-1"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {isVerifying ? 'Verifying...' : 'Verify Credential'}
                    </Button>
                    {verificationResult && (
                      <Button 
                        onClick={handleClear}
                        variant="outline"
                        size="default"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Verification Result */}
              {verificationResult && (
                <Card className={`border-2 ${
                  verificationResult.found 
                    ? 'border-green-500/50 bg-green-500/5' 
                    : 'border-red-500/50 bg-red-500/5'
                }`}>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      {verificationResult.found ? (
                        <>
                          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-green-500">
                              ✅ Credential Verified On-Chain
                            </h3>
                            <p className="text-muted-foreground">
                              This credential has been verified on the blockchain and is authentic
                            </p>
                          </div>
                          
                          <Card className="bg-web3-dark/20 border-green-500/20">
                            <CardContent className="pt-4 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                                  Verified on TEN Testnet
                                </Badge>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-muted-foreground">Wallet:</span>
                                <span className="font-mono text-xs break-all max-w-48 text-right">
                                  {userAddress}
                                </span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-muted-foreground">Hash:</span>
                                <span className="font-mono text-xs break-all max-w-48 text-right">
                                  {inputHash}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </>
                      ) : (
                        <>
                          <XCircle className="mx-auto h-16 w-16 text-red-500" />
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-red-500">
                              ❌ No National ID Found
                            </h3>
                            <p className="text-muted-foreground">
                              This hash does not match any verified credentials in our system
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Instructions */}
              <Card className="border-web3-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">How to Verify</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-web3-primary/20 flex items-center justify-center text-xs font-medium text-web3-primary mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">From QR Code</p>
                      <p>Scan the QR code on the ID card to automatically extract the verification hash</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-web3-primary/20 flex items-center justify-center text-xs font-medium text-web3-primary mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Manual Entry</p>
                      <p>Copy and paste the 64-character hash from the downloaded ID card</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-web3-primary/20 flex items-center justify-center text-xs font-medium text-web3-primary mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Cross-Platform</p>
                      <p>Verification works across all dApps and platforms supporting this standard</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Verify;