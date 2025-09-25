import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Camera, Upload, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import useAttestations from '@/hooks/useAttestations';

interface NationalIDModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'upload' | 'facial' | 'confirmation';

export const NationalIDModal = ({ open, onOpenChange }: NationalIDModalProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [faceVerified, setFaceVerified] = useState(false);
  const [generatedHash, setGeneratedHash] = useState<string>('');
  const { addAttestation } = useAttestations();

  const generateHash = () => {
    // Generate a random hash for demo purposes
    const chars = 'abcdef0123456789';
    let hash = '';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success('National ID uploaded successfully');
    }
  };

  const handleFacialVerification = () => {
    // Simulate facial verification
    setTimeout(() => {
      setFaceVerified(true);
      toast.success('Facial verification completed');
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep === 'upload' && uploadedFile) {
      setCurrentStep('facial');
    } else if (currentStep === 'facial' && faceVerified) {
      const hash = generateHash();
      setGeneratedHash(hash);
      setCurrentStep('confirmation');
    }
  };

  const handleSubmit = () => {
    if (generatedHash) {
      addAttestation('national-id', generatedHash);
      toast.success('National ID verification completed!');
      onOpenChange(false);
      // Reset state
      setCurrentStep('upload');
      setUploadedFile(null);
      setFaceVerified(false);
      setGeneratedHash('');
    }
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-web3-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Upload National ID</h3>
        <p className="text-sm text-muted-foreground">
          Please upload a clear photo of your national identification document
        </p>
      </div>
      
      <Card className="border-dashed border-2 border-web3-primary/20 hover:border-web3-primary/40 transition-colors">
        <CardContent className="p-6">
          <Input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="mb-4"
          />
          {uploadedFile && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              {uploadedFile.name}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Button 
        onClick={handleNextStep} 
        disabled={!uploadedFile}
        className="w-full"
      >
        Continue to Facial Verification
      </Button>
    </div>
  );

  const renderFacialStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Camera className="mx-auto h-12 w-12 text-web3-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Facial Verification</h3>
        <p className="text-sm text-muted-foreground">
          Verify your identity by taking a photo of yourself
        </p>
      </div>
      
      <Card className="bg-gradient-to-br from-web3-dark/50 to-web3-accent/10">
        <CardContent className="p-8">
          <div className="aspect-video bg-web3-dark/20 rounded-lg flex items-center justify-center border-2 border-dashed border-web3-primary/30">
            {faceVerified ? (
              <div className="text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-2" />
                <p className="text-green-500 font-medium">Face Verified!</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="mx-auto h-16 w-16 text-web3-primary/50 mb-2" />
                <p className="text-web3-muted">Camera Preview</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={faceVerified ? handleNextStep : handleFacialVerification}
        disabled={faceVerified}
        className="w-full"
      >
        {faceVerified ? 'Continue to Confirmation' : 'Verify Face'}
      </Button>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Verification Complete</h3>
        <p className="text-sm text-muted-foreground">
          Your credential has been verified and a unique hash has been generated
        </p>
      </div>
      
      <Card className="bg-gradient-to-br from-green-500/10 to-web3-primary/5">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Generated Hash:</label>
              <div className="mt-1 p-3 bg-web3-dark/20 rounded-lg font-mono text-xs break-all">
                {generatedHash}
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified Credential
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={handleSubmit} className="w-full">
        Complete Verification
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card text-card-foreground shadow-glow">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-web3-orange" />
            National ID Verification
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Progress indicators */}
          <div className="flex items-center justify-center mb-6 space-x-2">
            {(['upload', 'facial', 'confirmation'] as Step[]).map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStep === step 
                    ? 'bg-web3-primary text-black' 
                    : index < (['upload', 'facial', 'confirmation'] as Step[]).indexOf(currentStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-web3-muted text-web3-muted'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-8 h-0.5 mx-1 ${
                    index < (['upload', 'facial', 'confirmation'] as Step[]).indexOf(currentStep)
                      ? 'bg-green-500'
                      : 'bg-web3-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {currentStep === 'upload' && renderUploadStep()}
          {currentStep === 'facial' && renderFacialStep()}
          {currentStep === 'confirmation' && renderConfirmationStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};