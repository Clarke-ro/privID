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
      console.log('Sending score update request for address:', address);
      const response = await fetch('http://localhost:3001/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Backend update failed: ${response.status} ${response.statusText}`, errorText);
        toast.error(`Backend score update failed: ${response.statusText}`);
        throw new Error(`Backend update failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Backend score update successful:', result);
      toast.success('Score calculation completed on backend');
      return true;
    } catch (error) {
      console.error('Backend score update error:', error);
      toast.error('Failed to calculate reputation score - backend unavailable');
      throw error;
    }
  }, []);

  const fetchReputation = useCallback(async () => {
    if (!isConnected || !account) return;

    setLoading(true);
    try {
      // First, ensure backend score calculation succeeds
      console.log('Updating score on backend before reading from contract...');
      await updateScoreOnBackend(account);
      
      // Wait for backend processing to complete
      console.log('Waiting for backend processing...');
      await new Promise(resolve => setTimeout(resolve, 3000));

      const contract = getReputationContract();
      
      console.log('Reading user score from smart contract...');
      const userScore = await contract.getUserScore(account);
      
      const reputationData = {
        balance: Number(userScore.balance),
        transfers: Number(userScore.transfers),
        liquidity: Number(userScore.liquidity),
        governance: Number(userScore.governance),
        total: Number(userScore.total),
      };
      
      console.log('Reputation data from contract:', reputationData);
      setReputation(reputationData);

      // Check if user shares total publicly
      try {
        const isSharedPublic = await contract.shareTotalPublic(account);
        setIsPublic(isSharedPublic);
      } catch (error) {
        console.warn('Could not check public sharing status:', error);
        setIsPublic(false);
      }
      
      setIsRegistered(true);
      toast.success('Reputation score loaded successfully');
      
    } catch (error) {
      console.error('Failed to fetch reputation:', error);
      toast.error('Failed to load reputation data. Please ensure your backend is running and the smart contract is accessible.');
      setReputation(null);
      setIsRegistered(false);
      setIsPublic(false);
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