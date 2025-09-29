import { useState, useEffect } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useWeb3 } from '@/hooks/useWeb3';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FirstTimeUserModal = () => {
  const { profile, updateProfile } = useUserProfile();
  const { account, isConnected } = useWeb3();
  const { toast } = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    about: '',
    avatar: '',
    banner: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is a first-time user (wallet connected but no profile name)
  useEffect(() => {
    if (isConnected && account && !profile.name.trim()) {
      setIsOpen(true);
      // Reset form data for new user
      setFormData({
        name: '',
        role: '',
        about: '',
        avatar: '',
        banner: '',
      });
    }
  }, [isConnected, account, profile.name]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, banner: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      toast({
        title: "Welcome to Web3 Reputation!",
        description: "Your profile has been created successfully.",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Set a minimal profile to prevent modal from showing again
    updateProfile({ name: 'Anonymous User' });
    setIsOpen(false);
    toast({
      title: "Profile skipped",
      description: "You can edit your profile anytime from the settings.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-xl">Welcome to Web3 Reputation!</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Let's set up your profile to get started
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner Upload */}
          <div className="space-y-2">
            <Label htmlFor="welcome-banner">Profile Banner (Optional)</Label>
            <div className="relative">
              <div 
                className="w-full h-24 bg-cover bg-center bg-no-repeat rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer"
                style={{
                  backgroundImage: formData.banner ? `url(${formData.banner})` : 'none',
                  backgroundColor: !formData.banner ? 'hsl(var(--muted))' : 'transparent'
                }}
              >
                <Label htmlFor="welcome-banner" className="cursor-pointer w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-1 text-xs text-muted-foreground">
                    <Upload className="w-4 h-4" />
                    <span>{formData.banner ? 'Change Banner' : 'Upload Banner'}</span>
                  </div>
                </Label>
              </div>
              <Input
                id="welcome-banner"
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.avatar} alt="Profile" />
              <AvatarFallback className="bg-muted">
                {formData.name ? formData.name.slice(0, 2).toUpperCase() : <User className="w-6 h-6" />}
              </AvatarFallback>
            </Avatar>
            
            <Label htmlFor="welcome-avatar" className="cursor-pointer">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </div>
              <Input
                id="welcome-avatar"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </Label>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="welcome-name">Name *</Label>
            <Input
              id="welcome-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="welcome-role">Role</Label>
            <Input
              id="welcome-role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="e.g., Developer, Trader, Investor"
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <Label htmlFor="welcome-about">About</Label>
            <Textarea
              id="welcome-about"
              value={formData.about}
              onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
              placeholder="Tell us about yourself..."
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSkip} 
              className="flex-1"
              disabled={isLoading}
            >
              Skip for now
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Profile'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};