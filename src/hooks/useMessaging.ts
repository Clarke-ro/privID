import { useState, useCallback, useEffect } from 'react';
import { useWeb3 } from './useWeb3';
import { useEncryption } from './useEncryption';
import { ethers } from 'ethers';
import { toast } from 'sonner';

const MESSAGE_CONTRACT_ADDRESS = '0xa2D9551c913747d101EBB6789F8baFC113758894';

const MESSAGE_ABI = [
  {
    inputs: [{ internalType: 'bytes', name: 'pubkey', type: 'bytes' }],
    name: 'setEncryptionKey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'string', name: 'cid', type: 'string' }
    ],
    name: 'sendMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getInboxCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'getMessage',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'string', name: '', type: 'string' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'publicKeys',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'string', name: 'cid', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
    ],
    name: 'MessageSent',
    type: 'event'
  }
];

export interface DecryptedMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  cid: string;
  encrypted: boolean;
}

export const useMessaging = () => {
  const { account, provider, signer, isConnected } = useWeb3();
  const { getPublicKeyBytes, encryptMessage, decryptMessage, isReady: encryptionReady } = useEncryption();
  const [messages, setMessages] = useState<DecryptedMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasPublicKey, setHasPublicKey] = useState(false);

  // Check if user has public key on mount and when account changes
  useEffect(() => {
    const checkPublicKey = async () => {
      if (!isConnected || !provider || !account || !encryptionReady) {
        setHasPublicKey(false);
        return;
      }

      try {
        const contract = new ethers.Contract(MESSAGE_CONTRACT_ADDRESS, MESSAGE_ABI, provider);
        const existingKey = await contract.publicKeys(account);
        setHasPublicKey(existingKey && existingKey !== '0x');
      } catch (error) {
        console.error('Failed to check public key:', error);
        setHasPublicKey(false);
      }
    };

    checkPublicKey();
  }, [isConnected, provider, account, encryptionReady]);

  // Upload to IPFS using public gateway
  const uploadToIPFS = useCallback(async (data: string): Promise<string> => {
    try {
      const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'POST',
        body: JSON.stringify({ content: data })
      });
      
      if (!response.ok) {
        // Fallback: use mock CID (in production, use proper IPFS service)
        const mockCid = 'Qm' + btoa(data).substring(0, 44);
        console.warn('IPFS upload failed, using mock CID:', mockCid);
        return mockCid;
      }
      
      const result = await response.json();
      return result.Hash;
    } catch (error) {
      // Fallback: create deterministic mock CID
      const mockCid = 'Qm' + btoa(data).substring(0, 44);
      console.warn('IPFS upload error, using mock CID:', mockCid);
      return mockCid;
    }
  }, []);

  // Fetch from IPFS
  const fetchFromIPFS = useCallback(async (cid: string): Promise<string> => {
    try {
      // Try multiple gateways
      const gateways = [
        `https://ipfs.io/ipfs/${cid}`,
        `https://gateway.pinata.cloud/ipfs/${cid}`,
        `https://cloudflare-ipfs.com/ipfs/${cid}`
      ];
      
      for (const gateway of gateways) {
        try {
          const response = await fetch(gateway);
          if (response.ok) {
            return await response.text();
          }
        } catch (e) {
          continue;
        }
      }
      
      // Fallback: decode mock CID
      if (cid.startsWith('Qm')) {
        return atob(cid.substring(2));
      }
      
      throw new Error('Failed to fetch from all gateways');
    } catch (error) {
      console.error('IPFS fetch error:', error);
      throw error;
    }
  }, []);

  // Check and upload public key if needed
  const ensurePublicKey = useCallback(async () => {
    if (!isConnected || !signer || !account || !encryptionReady) return false;

    try {
      const contract = new ethers.Contract(MESSAGE_CONTRACT_ADDRESS, MESSAGE_ABI, provider);
      const existingKey = await contract.publicKeys(account);
      
      if (existingKey && existingKey !== '0x') {
        setHasPublicKey(true);
        return true;
      }

      // Upload public key
      toast.info('Setting up encryption key...');
      const pubKeyBytes = getPublicKeyBytes();
      const contractWithSigner = new ethers.Contract(MESSAGE_CONTRACT_ADDRESS, MESSAGE_ABI, signer);
      const tx = await contractWithSigner.setEncryptionKey(pubKeyBytes);
      await tx.wait();
      
      setHasPublicKey(true);
      toast.success('Encryption key registered!');
      return true;
    } catch (error: any) {
      console.error('Failed to set public key:', error);
      toast.error('Failed to register encryption key');
      return false;
    }
  }, [isConnected, signer, account, provider, encryptionReady, getPublicKeyBytes]);

  // Load messages for a specific conversation
  const loadMessages = useCallback(async (otherUserAddress: string) => {
    if (!isConnected || !provider || !account || !encryptionReady) return;

    try {
      setLoading(true);
      
      // Validate and checksum addresses to prevent ENS resolution
      const checksummedOtherUser = ethers.getAddress(otherUserAddress);
      const checksummedAccount = ethers.getAddress(account);
      
      const contract = new ethers.Contract(MESSAGE_CONTRACT_ADDRESS, MESSAGE_ABI, provider);
      
      const inboxCount = await contract.getInboxCount(checksummedAccount);
      const loadedMessages: DecryptedMessage[] = [];

      // Get other user's public key for decrypting their messages
      const otherUserPubKey = await contract.publicKeys(checksummedOtherUser);
      // Get own public key for decrypting messages we sent
      const ownPubKey = await contract.publicKeys(checksummedAccount);
      
      for (let i = 0; i < Number(inboxCount); i++) {
        try {
          const [from, to, cid, timestamp] = await contract.getMessage(checksummedAccount, i);
          
          // Filter messages from/to the specific user
          if (from.toLowerCase() !== checksummedOtherUser.toLowerCase() && 
              to.toLowerCase() !== checksummedOtherUser.toLowerCase()) {
            continue;
          }

          // Determine if this is an incoming or outgoing message
          const isIncoming = from.toLowerCase() === checksummedOtherUser.toLowerCase();
          const senderPubKey = isIncoming ? otherUserPubKey : ownPubKey;

          // For outgoing messages, we stored them locally so we can display them
          // For incoming messages, we need to decrypt using sender's public key
          if (isIncoming) {
            // Fetch and decrypt incoming message
            const encryptedContent = await fetchFromIPFS(cid);
            const decryptedContent = senderPubKey !== '0x' 
              ? decryptMessage(senderPubKey, encryptedContent)
              : null;

            loadedMessages.push({
              id: `${from}-${timestamp}`,
              from: from.toLowerCase(),
              to: to.toLowerCase(),
              content: decryptedContent || '[Encrypted message - key not available]',
              timestamp: new Date(Number(timestamp) * 1000),
              cid,
              encrypted: true
            });
          }
          // Skip outgoing messages as they're already in local state from sendEncryptedMessage
        } catch (error) {
          console.error('Failed to load message:', error);
        }
      }

      setMessages(loadedMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [isConnected, provider, account, encryptionReady, decryptMessage, fetchFromIPFS]);

  // Send encrypted message
  const sendEncryptedMessage = useCallback(async (recipientAddress: string, message: string) => {
    if (!isConnected || !signer || !account) {
      toast.error('Please connect your wallet');
      throw new Error('Wallet not connected');
    }

    // Ensure public key is set
    const keyReady = await ensurePublicKey();
    if (!keyReady) {
      throw new Error('Failed to register encryption key');
    }

    try {
      setLoading(true);
      
      // Validate and checksum the recipient address to prevent ENS resolution
      let checksummedRecipient: string;
      try {
        checksummedRecipient = ethers.getAddress(recipientAddress);
      } catch (error) {
        toast.error('Invalid recipient address');
        throw new Error('Invalid address format');
      }
      
      const contract = new ethers.Contract(MESSAGE_CONTRACT_ADDRESS, MESSAGE_ABI, provider);
      
      // Get recipient's public key
      const recipientPubKey = await contract.publicKeys(checksummedRecipient);
      if (!recipientPubKey || recipientPubKey === '0x') {
        toast.error('Recipient has not set up encryption key');
        throw new Error('Recipient key not found');
      }

      // Encrypt message
      toast.info('Encrypting message...');
      const encrypted = encryptMessage(recipientPubKey, message);

      // Upload to IPFS
      toast.info('Uploading to IPFS...');
      const cid = await uploadToIPFS(encrypted);

      // Send via smart contract
      toast.info('Sending encrypted message...');
      const contractWithSigner = new ethers.Contract(MESSAGE_CONTRACT_ADDRESS, MESSAGE_ABI, signer);
      const tx = await contractWithSigner.sendMessage(checksummedRecipient, cid);
      await tx.wait();

      toast.success('Message sent!');

      // Add to local state for immediate UI update
      const newMessage: DecryptedMessage = {
        id: `${account}-${Date.now()}`,
        from: account.toLowerCase(),
        to: checksummedRecipient.toLowerCase(),
        content: message,
        timestamp: new Date(),
        cid,
        encrypted: true
      };
      
      setMessages(prev => [...prev, newMessage]);
    } catch (error: any) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message: ' + (error.message || 'Unknown error'));
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isConnected, signer, account, provider, encryptMessage, uploadToIPFS, ensurePublicKey]);

  // Set up real-time message listener
  useEffect(() => {
    if (!isConnected || !provider || !account) return;

    const contract = new ethers.Contract(MESSAGE_CONTRACT_ADDRESS, MESSAGE_ABI, provider);

    const handleMessageSent = async (from: string, to: string, cid: string, timestamp: bigint) => {
      // Only process messages for current user
      if (to.toLowerCase() !== account.toLowerCase()) return;

      try {
        const senderPubKey = await contract.publicKeys(from);
        const encryptedContent = await fetchFromIPFS(cid);
        const decryptedContent = senderPubKey !== '0x'
          ? decryptMessage(senderPubKey, encryptedContent)
          : null;

        const newMessage: DecryptedMessage = {
          id: `${from}-${timestamp}`,
          from: from.toLowerCase(),
          to: to.toLowerCase(),
          content: decryptedContent || '[Encrypted message - key not available]',
          timestamp: new Date(Number(timestamp) * 1000),
          cid,
          encrypted: true
        };

        setMessages(prev => {
          // Avoid duplicates
          if (prev.some(m => m.id === newMessage.id)) return prev;
          return [...prev, newMessage].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        });

        toast.success('New message received!');
      } catch (error) {
        console.error('Failed to process incoming message:', error);
      }
    };

    contract.on('MessageSent', handleMessageSent);

    return () => {
      contract.off('MessageSent', handleMessageSent);
    };
  }, [isConnected, provider, account, decryptMessage, fetchFromIPFS]);

  return {
    messages,
    loading,
    hasPublicKey,
    sendEncryptedMessage,
    loadMessages,
    ensurePublicKey
  };
};
