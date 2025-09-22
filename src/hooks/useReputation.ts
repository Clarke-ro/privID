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
  type: 'bronze' | 'silver' | 'gold' | 'none';
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
    if (score >= 1000) return { type: 'gold', threshold: 1000, name: 'Gold Elite' };
    if (score >= 500) return { type: 'silver', threshold: 500, name: 'Silver Investor' };
    if (score >= 100) return { type: 'bronze', threshold: 100, name: 'Bronze Pioneer' };
    return { type: 'none', threshold: 0, name: 'Unranked' };
  }, []);

  const fetchReputation = useCallback(async () => {
    if (!isConnected || !account) return;

    setLoading(true);
    try {
      const contract = getReputationContract();
      
      // First check if user is registered by checking if they have a total score
      try {
        const breakdown = await contract.getMyBreakdown();
        
        // If we get here, user is registered
        setReputation({
          balance: Number(breakdown.balance),
          transfers: Number(breakdown.transfers),
          liquidity: Number(breakdown.liquidity),
          governance: Number(breakdown.governance),
          total: Number(breakdown.total),
        });

        // Check if user shares total publicly
        const isSharedPublic = await contract.shareTotalPublic(account);
        setIsPublic(isSharedPublic);
        
        setIsRegistered(true);
      } catch (contractError: any) {
        // If contract call fails with empty data, user is not registered
        if (contractError.code === 'BAD_DATA' && contractError.value === '0x') {
          console.log('User not registered in reputation contract');
          setIsRegistered(false);
          setReputation(null);
          setIsPublic(false);
        } else {
          // Re-throw other errors
          throw contractError;
        }
      }
    } catch (error) {
      console.error('Error fetching reputation:', error);
      setIsRegistered(false);
      setReputation(null);
      setIsPublic(false);
    } finally {
      setLoading(false);
    }
  }, [isConnected, account, getReputationContract]);

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
      const contract = getReputationContract();
      const tx = await contract.setShareTotalPublic(!isPublic);
      
      toast.info('Transaction submitted...', {
        description: 'Updating public sharing preference'
      });
      
      await tx.wait();
      setIsPublic(!isPublic);
      toast.success(`Reputation is now ${!isPublic ? 'public' : 'private'}`);
    } catch (error) {
      console.error('Failed to toggle public sharing:', error);
      toast.error('Failed to update preference. Please try again.');
    }
  }, [isConnected, isPublic, getReputationContract]);

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