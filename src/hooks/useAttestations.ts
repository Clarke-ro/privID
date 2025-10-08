import { useState, useCallback, useEffect } from 'react';
import { useWeb3 } from './useWeb3';
import { ethers } from 'ethers';
import { toast } from 'sonner';

export interface VerifiedAttestation {
  id: string;
  type: string;
  hash: string;
  timestamp: number;
  verified: boolean;
}

const ATTESTATION_CONTRACT_ADDRESS = '0x472155601315312B3b64186187F35c753B13E0Aa';

const ATTESTATION_ABI = [
  {
    inputs: [
      { internalType: 'string', name: 'attestationType', type: 'string' },
      { internalType: 'bytes32', name: 'hash', type: 'bytes32' }
    ],
    name: 'addAttestation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getMyAttestations',
    outputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'hash', type: 'bytes32' },
          { internalType: 'string', name: 'attestationType', type: 'string' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' }
        ],
        internalType: 'struct EncryptedAttestationRegistry.Attestation[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'bytes32', name: 'hash', type: 'bytes32' }
    ],
    name: 'verifyAttestation',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'attestationCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const useAttestations = () => {
  const { account, provider, signer, isConnected } = useWeb3();
  const [attestations, setAttestations] = useState<VerifiedAttestation[]>([]);
  const [loading, setLoading] = useState(false);

  // Convert hex string to bytes32
  const stringToBytes32 = (str: string): string => {
    // If already 0x prefixed and 66 chars (0x + 64 hex chars), return as is
    if (str.startsWith('0x') && str.length === 66) {
      return str;
    }
    // If 64 hex chars without 0x, add prefix
    if (str.length === 64 && /^[0-9a-fA-F]+$/.test(str)) {
      return '0x' + str;
    }
    // Otherwise, hash it
    return ethers.keccak256(ethers.toUtf8Bytes(str));
  };

  // Convert bytes32 to hex string (without 0x)
  const bytes32ToString = (bytes32: string): string => {
    return bytes32.startsWith('0x') ? bytes32.slice(2) : bytes32;
  };

  // Load attestations from blockchain
  const loadAttestations = useCallback(async () => {
    if (!isConnected || !provider || !account) return;

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        ATTESTATION_CONTRACT_ADDRESS,
        ATTESTATION_ABI,
        provider
      );

      const onChainAttestations = await contract.getMyAttestations();
      
      const formattedAttestations: VerifiedAttestation[] = onChainAttestations.map(
        (att: any, index: number) => ({
          id: `${att.attestationType}-${att.timestamp.toString()}`,
          type: att.attestationType,
          hash: bytes32ToString(att.hash),
          timestamp: Number(att.timestamp) * 1000, // Convert to milliseconds
          verified: true
        })
      );

      setAttestations(formattedAttestations);
    } catch (error) {
      console.error('Failed to load attestations:', error);
    } finally {
      setLoading(false);
    }
  }, [isConnected, provider, account]);

  // Load attestations on mount and when wallet connects
  useEffect(() => {
    loadAttestations();
  }, [loadAttestations]);

  const addAttestation = useCallback(async (type: string, hash: string) => {
    if (!isConnected || !signer || !account) {
      toast.error('Please connect your wallet first');
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        ATTESTATION_CONTRACT_ADDRESS,
        ATTESTATION_ABI,
        signer
      );

      const bytes32Hash = stringToBytes32(hash);
      
      toast.info('Submitting attestation to blockchain...');
      const tx = await contract.addAttestation(type, bytes32Hash);
      
      toast.info('Waiting for confirmation...');
      await tx.wait();
      
      toast.success('Attestation added to blockchain!');
      
      // Reload attestations
      await loadAttestations();
    } catch (error: any) {
      console.error('Failed to add attestation:', error);
      toast.error('Failed to add attestation: ' + (error.message || 'Unknown error'));
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isConnected, signer, account, loadAttestations]);

  const verifyHash = useCallback(async (userAddress: string, hash: string): Promise<boolean> => {
    if (!provider) {
      toast.error('Provider not available');
      return false;
    }

    try {
      const contract = new ethers.Contract(
        ATTESTATION_CONTRACT_ADDRESS,
        ATTESTATION_ABI,
        provider
      );

      const bytes32Hash = stringToBytes32(hash);
      const isValid = await contract.verifyAttestation(userAddress, bytes32Hash);
      
      return isValid;
    } catch (error) {
      console.error('Failed to verify attestation:', error);
      return false;
    }
  }, [provider]);

  const hasAttestation = useCallback((type: string): boolean => {
    return attestations.some(att => att.type === type && att.verified);
  }, [attestations]);

  const getAttestationHash = useCallback((type: string): string | null => {
    const attestation = attestations.find(att => att.type === type && att.verified);
    return attestation?.hash || null;
  }, [attestations]);

  return {
    attestations,
    addAttestation,
    verifyHash,
    hasAttestation,
    getAttestationHash,
    loading,
    loadAttestations
  };
};

export default useAttestations;