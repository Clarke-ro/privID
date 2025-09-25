import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Camera, Upload, Shield, CheckCircle, X } from 'lucide-react';
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
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addAttestation } = useAttestations();

  // Cleanup camera when modal closes or step changes
  useEffect(() => {
    if (!open || currentStep !== 'facial') {
      stopCamera();
    }
  }, [open, currentStep]);

  // Start camera when entering facial verification step
  useEffect(() => {
    if (currentStep === 'facial') {
      startCamera();
    }
  }, [currentStep]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      
      setCameraStream(stream);
      setCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraError('Unable to access camera. Please check permissions.');
      toast.error('Camera access denied or unavailable');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
        
        // Simulate verification process
        setTimeout(() => {
          setFaceVerified(true);
          toast.success('Facial verification completed');
        }, 1500);
      }
    }
  };

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
      stopCamera(); // Clean up camera resources
      onOpenChange(false);
      // Reset state
      setCurrentStep('upload');
      setUploadedFile(null);
      setFaceVerified(false);
      setGeneratedHash('');
      setCapturedImage(null);
      setCameraError(null);
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
          {faceVerified ? 'Verification complete!' : 'Position your face within the frame and take a photo'}
        </p>
      </div>
      
      <Card className="bg-gradient-to-br from-web3-dark/50 to-web3-accent/10">
        <CardContent className="p-8">
          <div className="aspect-video bg-web3-dark/20 rounded-lg flex items-center justify-center border-2 border-dashed border-web3-primary/30 relative overflow-hidden">
            {cameraError ? (
              <div className="text-center text-red-400">
                <X className="mx-auto h-16 w-16 mb-2" />
                <p className="text-sm">{cameraError}</p>
                <Button onClick={startCamera} className="mt-2" size="sm">
                  Retry Camera Access
                </Button>
              </div>
            ) : faceVerified && capturedImage ? (
              <div className="text-center w-full h-full">
                <img 
                  src={capturedImage} 
                  alt="Captured verification photo" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-2" />
                    <p className="text-green-500 font-medium">Face Verified!</p>
                  </div>
                </div>
              </div>
            ) : cameraActive ? (
              <div className="w-full h-full relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button 
                    onClick={capturePhoto}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    size="sm"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="mx-auto h-16 w-16 text-web3-primary/50 mb-2" />
                <p className="text-web3-muted">Starting camera...</p>
              </div>
            )}
          </div>
          
          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
      
      <Button 
        onClick={handleNextStep}
        disabled={!faceVerified}
        className="w-full"
      >
        Continue to Confirmation
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-web3-primary" />
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