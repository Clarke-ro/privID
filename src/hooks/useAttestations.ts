import { useState, useCallback } from 'react';

export interface VerifiedAttestation {
  id: string;
  type: string;
  hash: string;
  timestamp: number;
  verified: boolean;
}

const useAttestations = () => {
  const [attestations, setAttestations] = useState<VerifiedAttestation[]>(() => {
    try {
      const saved = localStorage.getItem('verified-attestations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addAttestation = useCallback((type: string, hash: string) => {
    const newAttestation: VerifiedAttestation = {
      id: `${type}-${Date.now()}`,
      type,
      hash,
      timestamp: Date.now(),
      verified: true,
    };

    const updated = [...attestations, newAttestation];
    setAttestations(updated);
    localStorage.setItem('verified-attestations', JSON.stringify(updated));
  }, [attestations]);

  const verifyHash = useCallback((hash: string): VerifiedAttestation | null => {
    return attestations.find(att => att.hash === hash) || null;
  }, [attestations]);

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
  };
};

export default useAttestations;