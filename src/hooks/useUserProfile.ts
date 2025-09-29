import { useState, useEffect, useCallback } from 'react';

export interface UserProfile {
  name: string;
  role: string;
  about: string;
  avatar: string;
  banner: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  role: '',
  about: '',
  avatar: '',
  banner: '',
};

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile({ ...DEFAULT_PROFILE, ...parsed });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save profile to localStorage
  const saveProfile = useCallback((newProfile: Partial<UserProfile>) => {
    const updatedProfile = { ...profile, ...newProfile };
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  }, [profile]);


  // Update profile (for editing)
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    saveProfile(updates);
  }, [saveProfile]);

  // Reset profile (for testing/logout)
  const resetProfile = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem('userProfile');
  }, []);

  return {
    profile,
    isLoading,
    updateProfile,
    resetProfile,
  };
};