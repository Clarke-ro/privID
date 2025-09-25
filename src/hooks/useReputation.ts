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
  const [toggling, setToggling] = useState(false);

  const getBadge = useCallback((score: number): BadgeType => {
    if (score >= 100000000) return { type: 'gold', threshold: 100000000, name: 'Legendary Elite' };
    if (score >= 10000000) return { type: 'gold', threshold: 10000000, name: 'Gold Elite' };
    if (score >= 1000000) return { type: 'silver', threshold: 1000000, name: 'Silver Investor' };
    if (score >= 100000) return { type: 'bronze', threshold: 100000, name: 'Bronze Pioneer' };
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
        throw new Error(`Backend update failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Backend score update successful:', result);
      return result;
    } catch (error) {
      console.error('Backend score update error:', error);
      // Don't throw error, just log and continue with mock data
      console.log('Backend unavailable, falling back to mock data');
      return null;
    }
  }, []);

  const fetchReputation = useCallback(async () => {
    if (!isConnected || !account) return;

    setLoading(true);
    try {
      // Try to update score on backend first
      console.log('Updating score on backend...');
      const backendResult = await updateScoreOnBackend(account);
      
      if (backendResult) {
        // Backend is available, wait for processing and use smart contract data
        console.log('Backend available, waiting for processing...');
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
        
        toast.success('Reputation score loaded from blockchain');
      } else {
        // Backend unavailable, start with zero scores
        console.log('Backend unavailable, starting with zero reputation');
        const initialReputationData = {
          balance: 0,
          transfers: 0,
          liquidity: 0,
          governance: 0,
          total: 0,
        };
        
        console.log('Initial reputation data set to zero:', initialReputationData);
        setReputation(initialReputationData);
        setIsPublic(false);
        toast.info('Connect to backend server to update reputation scores');
      }
      
      setIsRegistered(true);
      
    } catch (error) {
      console.error('Failed to fetch reputation:', error);
      toast.error('Failed to load reputation data');
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

    if (toggling) return; // Prevent multiple simultaneous calls

    setToggling(true);
    try {
      const contract = getReputationContract();
      const newPublicState = !isPublic;
      
      toast.info('Transaction submitted...', {
        description: `Making reputation ${newPublicState ? 'public' : 'private'}`
      });

      const tx = await contract.setShareTotalPublic(newPublicState);
      await tx.wait();
      
      setIsPublic(newPublicState);
      toast.success(`Reputation is now ${newPublicState ? 'public' : 'private'}!`);
    } catch (error) {
      console.error('Failed to toggle public sharing:', error);
      if (error.code === 'ACTION_REJECTED') {
        toast.error('Transaction was cancelled');
      } else {
        toast.error('Failed to update visibility. Please try again.');
      }
    } finally {
      setToggling(false);
    }
  }, [isConnected, isPublic, getReputationContract, toggling]);

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
    toggling,
    register,
    togglePublicSharing,
    fetchReputation,
  };
};