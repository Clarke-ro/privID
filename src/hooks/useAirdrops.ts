import { useState } from 'react';

export interface AirdropItem {
  id: string;
  name: string;
  url: string;
  type: 'NFT' | 'Game' | 'Tool' | 'DeFi' | 'Infrastructure';
  eligibility: 'eligible' | 'ineligible' | 'unknown';
  datePeriod: string;
  dateAdded: string;
}

export const useAirdrops = () => {
  const [airdrops, setAirdrops] = useState<AirdropItem[]>([
    {
      id: '1',
      name: 'LearnUIto',
      url: 'https://centmalevel.com',
      type: 'NFT',
      eligibility: 'eligible',
      datePeriod: '2024-01-01 to 2024-12-31',
      dateAdded: '25 May 2020'
    },
    {
      id: '2',
      name: 'Design-Pictures',
      url: 'https://main.level.com',
      type: 'NFT',
      eligibility: 'eligible',
      datePeriod: '2024-03-01 to 2024-11-30',
      dateAdded: '75 May 2023'
    },
    {
      id: '3',
      name: 'UI/UX designer',
      url: 'https://bylayer.level.com',
      type: 'Game',
      eligibility: 'eligible',
      datePeriod: '2024-02-15 to 2024-10-15',
      dateAdded: '25 May 2023'
    },
    {
      id: '4',
      name: 'Node.js pdf',
      url: 'https://graphics.level.com',
      type: 'Tool',
      eligibility: 'ineligible',
      datePeriod: '2024-01-15 to 2024-09-15',
      dateAdded: '25 May 2023'
    },
    {
      id: '5',
      name: 'Weekly Report',
      url: 'https://bylayer.level.com',
      type: 'Tool',
      eligibility: 'ineligible',
      datePeriod: '2024-04-01 to 2024-12-01',
      dateAdded: '25 May 2023'
    }
  ]);

  const addAirdrop = (airdropData: Omit<AirdropItem, 'id' | 'dateAdded'>) => {
    const newAirdrop: AirdropItem = {
      ...airdropData,
      id: Date.now().toString(),
      dateAdded: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };
    setAirdrops(prev => [newAirdrop, ...prev]);
  };

  const updateEligibility = (id: string, eligibility: AirdropItem['eligibility']) => {
    setAirdrops(prev => 
      prev.map(airdrop => 
        airdrop.id === id ? { ...airdrop, eligibility } : airdrop
      )
    );
  };

  const deleteAirdrop = (id: string) => {
    setAirdrops(prev => prev.filter(airdrop => airdrop.id !== id));
  };

  // Calculate counts
  const counts = {
    total: airdrops.length,
    eligible: airdrops.filter(a => a.eligibility === 'eligible').length,
    ineligible: airdrops.filter(a => a.eligibility === 'ineligible').length,
    unknown: airdrops.filter(a => a.eligibility === 'unknown').length,
    active: airdrops.length,
    collected: airdrops.filter(a => a.eligibility === 'eligible').length,
    yetToInteract: airdrops.filter(a => a.eligibility === 'unknown').length
  };

  return {
    airdrops,
    addAirdrop,
    updateEligibility,
    deleteAirdrop,
    counts
  };
};