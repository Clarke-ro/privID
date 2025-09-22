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

  const updateScoreOnBackend = useCallback(async (address: string) => {
    try {
      const response = await fetch('http://localhost:3001/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error(`Backend update failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Backend score update result:', result);
      return true;
    } catch (error) {
      console.error('Error updating score on backend:', error);
      toast.error('Failed to update score on backend');
      return false;
    }
  }, []);

  const fetchReputation = useCallback(async () => {
    if (!isConnected || !account) return;

    setLoading(true);
    try {
      // First, trigger backend score update
      const backendSuccess = await updateScoreOnBackend(account);
      
      // Small delay to allow backend processing
      if (backendSuccess) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      const contract = getReputationContract();
      
      // Get reputation breakdown using new method
      const userScore = await contract.getUserScore(account);
      
      setReputation({
        balance: Number(userScore.balance),
        transfers: Number(userScore.transfers),
        liquidity: Number(userScore.liquidity),
        governance: Number(userScore.governance),
        total: Number(userScore.total),
      });

      // Check if user shares total publicly
      const isSharedPublic = await contract.shareTotalPublic(account);
      setIsPublic(isSharedPublic);
      
      setIsRegistered(true);
    } catch (error) {
      console.error('Error fetching reputation:', error);
      setIsRegistered(false);
      setReputation(null);
    } finally {
      setLoading(false);
    }
  }, [isConnected, account, getReputationContract, updateScoreOnBackend]);

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