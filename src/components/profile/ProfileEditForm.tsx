import { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ProfileEditForm = () => {
  const { profile, updateProfile } = useUserProfile();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: profile.name || '',
    role: profile.role || '',
    about: profile.about || '',
    avatar: profile.avatar || '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      updateProfile(formData);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Edit Profile
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.avatar} alt="Profile" />
              <AvatarFallback className="bg-muted">
                {formData.name ? formData.name.slice(0, 2).toUpperCase() : <User className="w-6 h-6" />}
              </AvatarFallback>
            </Avatar>
            
            <Label htmlFor="avatar" className="cursor-pointer">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                <Upload className="w-4 h-4" />
                <span>Change Photo</span>
              </div>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </Label>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="e.g., Developer, Trader, Investor"
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              value={formData.about}
              onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
              placeholder="Tell us about yourself..."
              className="min-h-[80px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};