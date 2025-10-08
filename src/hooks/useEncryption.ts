import { useState, useCallback, useEffect } from 'react';
import nacl from 'tweetnacl';
import { encodeBase64, decodeBase64 } from 'tweetnacl-util';
import { toast } from 'sonner';

const STORAGE_KEY = 'e2e_encryption_keypair';

export const useEncryption = () => {
  const [keyPair, setKeyPair] = useState<nacl.BoxKeyPair | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load or generate keypair
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setKeyPair({
          publicKey: decodeBase64(parsed.publicKey),
          secretKey: decodeBase64(parsed.secretKey)
        });
      } catch (error) {
        console.error('Failed to load keypair:', error);
        generateNewKeyPair();
      }
    } else {
      generateNewKeyPair();
    }
    setIsReady(true);
  }, []);

  const generateNewKeyPair = useCallback(() => {
    const newKeyPair = nacl.box.keyPair();
    setKeyPair(newKeyPair);
    
    // Store in localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      publicKey: encodeBase64(newKeyPair.publicKey),
      secretKey: encodeBase64(newKeyPair.secretKey)
    }));
  }, []);

  const getPublicKeyBytes = useCallback((): string => {
    if (!keyPair) return '0x';
    return '0x' + Array.from(keyPair.publicKey)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }, [keyPair]);

  const encryptMessage = useCallback((recipientPublicKeyHex: string, message: string): string => {
    if (!keyPair) throw new Error('Keypair not initialized');
    
    // Remove 0x prefix and convert to Uint8Array
    const recipientPubKey = new Uint8Array(
      recipientPublicKeyHex.replace('0x', '').match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );
    
    const messageBytes = new TextEncoder().encode(message);
    const nonce = nacl.randomBytes(24);
    
    const encrypted = nacl.box(messageBytes, nonce, recipientPubKey, keyPair.secretKey);
    
    // Combine nonce + encrypted message
    const fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);
    
    return encodeBase64(fullMessage);
  }, [keyPair]);

  const decryptMessage = useCallback((senderPublicKeyHex: string, encryptedBase64: string): string | null => {
    if (!keyPair) throw new Error('Keypair not initialized');
    
    try {
      // Remove 0x prefix and convert to Uint8Array
      const senderPubKey = new Uint8Array(
        senderPublicKeyHex.replace('0x', '').match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
      );
      
      const fullMessage = decodeBase64(encryptedBase64);
      const nonce = fullMessage.slice(0, 24);
      const encrypted = fullMessage.slice(24);
      
      const decrypted = nacl.box.open(encrypted, nonce, senderPubKey, keyPair.secretKey);
      
      if (!decrypted) return null;
      
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }, [keyPair]);

  const clearKeys = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setKeyPair(null);
  }, []);

  return {
    keyPair,
    isReady,
    getPublicKeyBytes,
    encryptMessage,
    decryptMessage,
    generateNewKeyPair,
    clearKeys
  };
};
