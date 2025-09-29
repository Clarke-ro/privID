import { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Edit3, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditProfileModalProps {
  children: React.ReactNode;
}

export const EditProfileModal = ({ children }: EditProfileModalProps) => {
  const { profile, updateProfile } = useUserProfile();
  const { toast } = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
    about: profile.about,
    avatar: profile.avatar,
    banner: profile.banner,
  });
  const [isLoading, setIsLoading] = useState(false);

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
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // Reset form data when opening
      setFormData({
        name: profile.name,
        role: profile.role,
        about: profile.about,
        avatar: profile.avatar,
        banner: profile.banner,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner Upload */}
          <div className="space-y-2">
            <Label htmlFor="edit-banner">Profile Banner</Label>
            <div className="relative">
              <div 
                className="w-full h-24 bg-cover bg-center bg-no-repeat rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer"
                style={{
                  backgroundImage: formData.banner ? `url(${formData.banner})` : 'none',
                  backgroundColor: !formData.banner ? 'hsl(var(--muted))' : 'transparent'
                }}
              >
                <Label htmlFor="edit-banner" className="cursor-pointer w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-1 text-xs text-muted-foreground">
                    <Upload className="w-4 h-4" />
                    <span>{formData.banner ? 'Change Banner' : 'Upload Banner'}</span>
                  </div>
                </Label>
              </div>
              <Input
                id="edit-banner"
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
            
            <Label htmlFor="edit-avatar" className="cursor-pointer">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                <Upload className="w-4 h-4" />
                <span>Change Photo</span>
              </div>
              <Input
                id="edit-avatar"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </Label>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="edit-role">Role</Label>
            <Input
              id="edit-role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="e.g., Developer, Trader, Investor"
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <Label htmlFor="edit-about">About</Label>
            <Textarea
              id="edit-about"
              value={formData.about}
              onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
              placeholder="Tell us about yourself..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};