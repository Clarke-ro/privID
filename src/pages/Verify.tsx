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

const Verify = () => {
  const [inputHash, setInputHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    found: boolean;
    attestation?: any;
  } | null>(null);
  const { verifyHash } = useAttestations();

  const handleVerify = () => {
    if (!inputHash.trim()) return;
    
    const result = verifyHash(inputHash.trim());
    setVerificationResult({
      found: !!result,
      attestation: result
    });
  };

  const handleClear = () => {
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
                    Enter Verification Hash
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
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
                      disabled={!inputHash.trim()}
                      className="flex-1"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Verify Credential
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
                              ✅ National ID Verified
                            </h3>
                            <p className="text-muted-foreground">
                              This credential has been successfully verified and is authentic
                            </p>
                          </div>
                          
                          {verificationResult.attestation && (
                            <Card className="bg-web3-dark/20 border-green-500/20">
                              <CardContent className="pt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Type:</span>
                                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                                    National ID
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Verified:</span>
                                  <span className="text-green-400">
                                    {new Date(verificationResult.attestation.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-start">
                                  <span className="text-muted-foreground">Hash:</span>
                                  <span className="font-mono text-xs break-all max-w-48 text-right">
                                    {verificationResult.attestation.hash}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          )}
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