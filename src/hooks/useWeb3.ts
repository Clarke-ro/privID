import { useState, useEffect, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';

// TEN Testnet configuration
const TEN_TESTNET_CONFIG = {
  chainId: '0x20FB', // 8443 in hex
  chainName: 'TEN Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://testnet.ten.xyz/v1/'],
  blockExplorerUrls: ['https://tenscan.io']
};

export interface Web3State {
  isConnected: boolean;
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  chainId: number | null;
}

const REPUTATION_CONTRACT_ADDRESS = '0x02d281b6152eA6F38b6FdE15676e66bB154c508D';
const REPUTATION_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_oracle",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "Registered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "total",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "balance",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "transfers",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "liquidity",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "governance",
        "type": "uint64"
      }
    ],
    "name": "ScoreUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "balance",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "transfers",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "liquidity",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "governance",
        "type": "uint64"
      }
    ],
    "name": "setScores",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getTotal",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserScore",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "balance",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "transfers",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "liquidity",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "governance",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "total",
            "type": "uint64"
          }
        ],
        "internalType": "struct Encrypted.Scores",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "oracle",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "shareTotalPublic",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_isPublic",
        "type": "bool"
      }
    ],
    "name": "setPublicSharing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const useWeb3 = () => {
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    account: null,
    provider: null,
    signer: null,
    chainId: null,
  });
  
  const hasShownConnectionToast = useRef(false);
  const isInitialCheck = useRef(true);

  const connectWallet = useCallback(async (showToast = true) => {
    if (!window.ethereum) {
      toast.error('MetaMask not detected. Please visit TEN Gateway first.', {
        action: {
          label: 'Open TEN Gateway',
          onClick: () => window.open('https://gateway.ten.xyz/', '_blank')
        }
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Check if we're on TEN testnet, if not switch
      const network = await provider.getNetwork();
      if (network.chainId !== 443n) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: TEN_TESTNET_CONFIG.chainId }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [TEN_TESTNET_CONFIG],
            });
          } else {
            throw switchError;
          }
        }
      }
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts returned');
      }

      const signer = await provider.getSigner();
      const newAccount = accounts[0];
      
      // Only update state if account actually changed or wasn't connected before
      if (!web3State.isConnected || web3State.account !== newAccount) {
        setWeb3State({
          isConnected: true,
          account: newAccount,
          provider,
          signer,
          chainId: 443,
        });

        // Only show toast on explicit user action or first connection
        if (showToast && (!hasShownConnectionToast.current || web3State.account !== newAccount)) {
          toast.success('Wallet connected successfully!');
          hasShownConnectionToast.current = true;
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      if (showToast) {
        toast.error('Failed to connect wallet. Please try again.');
      }
    }
  }, [web3State.isConnected, web3State.account]);

  const disconnectWallet = useCallback(() => {
    setWeb3State({
      isConnected: false,
      account: null,
      provider: null,
      signer: null,
      chainId: null,
    });
    hasShownConnectionToast.current = false;
    toast.info('Wallet disconnected');
  }, []);

  const getReputationContract = useCallback(() => {
    if (!web3State.signer) {
      throw new Error('Wallet not connected');
    }
    return new ethers.Contract(REPUTATION_CONTRACT_ADDRESS, REPUTATION_ABI, web3State.signer);
  }, [web3State.signer]);

  // Check for existing wallet connection on mount (silent)
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && isInitialCheck.current) {
        isInitialCheck.current = false;
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            // Silent connection check - no toast
            await connectWallet(false);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== web3State.account) {
          // Silent reconnection for account changes - no toast
          connectWallet(false);
        }
      };

      const handleChainChanged = () => {
        // Silent reconnection for chain changes - no toast  
        connectWallet(false);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [web3State.account, disconnectWallet]); // Removed connectWallet to prevent infinite loop

  return {
    ...web3State,
    connectWallet,
    disconnectWallet,
    getReputationContract,
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}