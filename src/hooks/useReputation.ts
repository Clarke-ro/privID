import { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from './useWeb3';
import { toast } from 'sonner';

export interface ReputationBreakdown {
  balance: number;
  transfers: number;
  liquidity: number;
  governance: number;
  total: number;
}

export interface BadgeType {
  type: 'bronze' | 'silver' | 'gold' | 'legend' | 'none';
  threshold: number;
  name: string;
}

export const useReputation = () => {
  const { isConnected, getReputationContract, account } = useWeb3();
  const [reputation, setReputation] = useState<ReputationBreakdown | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);

  const getBadge = useCallback((score: number): BadgeType => {
    if (score >= 10000000) return { type: 'legend', threshold: 10000000, name: 'Legend' };
    if (score >= 5000000) return { type: 'gold', threshold: 5000000, name: 'Gold Elite' };
    if (score >= 1000000) return { type: 'silver', threshold: 1000000, name: 'Silver Investor' };
    if (score >= 100000) return { type: 'bronze', threshold: 100000, name: 'Bronze Pioneer' };
    return { type: 'none', threshold: 0, name: 'Unranked' };
  }, []);

  const updateScoreOnBackend = useCallback(async (address: string) => {
    // Mock backend calculation with demo data
    console.log('Mock score calculation for address:', address);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
    console.log('Mock backend score calculation completed');
    return true;
  }, []);

  const fetchReputation = useCallback(async () => {
    if (!isConnected || !account) return;

    setLoading(true);
    try {
      // Mock score calculation
      console.log('Mock score calculation for:', account);
      await updateScoreOnBackend(account);
      
      // Generate mock reputation data with higher values for new thresholds
      const mockReputationData = {
        balance: 1500000 + Math.floor(Math.random() * 500000),
        transfers: 1200000 + Math.floor(Math.random() * 300000),
        liquidity: 2000000 + Math.floor(Math.random() * 800000),
        governance: 800000 + Math.floor(Math.random() * 400000),
        total: 0,
      };
      
      // Calculate total
      mockReputationData.total = mockReputationData.balance + mockReputationData.transfers + 
                                mockReputationData.liquidity + mockReputationData.governance;
      
      console.log('Mock reputation data generated:', mockReputationData);
      setReputation(mockReputationData);
      setIsPublic(true); // Default to public sharing
      setIsRegistered(true);
      toast.success('Reputation score loaded successfully');
      
    } catch (error) {
      console.error('Failed to fetch reputation:', error);
      toast.error('Failed to load reputation data');
      setReputation(null);
      setIsRegistered(false);
      setIsPublic(false);
    } finally {
      setLoading(false);
    }
  }, [isConnected, account, updateScoreOnBackend]);

  const register = useCallback(async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setRegistering(true);
    try {
      const contract = getReputationContract();
      const tx = await contract.register();
      
      toast.info('Registration transaction submitted...', {
        description: 'Please wait for confirmation'
      });
      
      await tx.wait();
      toast.success('Successfully registered for reputation tracking!');
      
      // Fetch reputation after registration
      setTimeout(fetchReputation, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setRegistering(false);
    }
  }, [isConnected, getReputationContract, fetchReputation]);

  const togglePublicSharing = useCallback(async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      // Mock the toggle behavior for demo purposes
      console.log('Toggling public sharing preference...');
      
      // Simulate a brief delay as if calling a contract
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsPublic(!isPublic);
      toast.success(`Reputation is now ${!isPublic ? 'public' : 'private'}`);
    } catch (error) {
      console.error('Failed to toggle public sharing:', error);
      toast.error('Failed to update preference. Please try again.');
    }
  }, [isConnected, isPublic]);

  useEffect(() => {
    if (isConnected && account) {
      fetchReputation();
    } else {
      setReputation(null);
      setIsRegistered(false);
      setIsPublic(false);
    }
  }, [isConnected, account, fetchReputation]);

  const badge = reputation ? getBadge(reputation.total) : getBadge(0);

  return {
    reputation,
    badge,
    isRegistered,
    isPublic,
    loading,
    registering,
    register,
    togglePublicSharing,
    fetchReputation,
  };
};