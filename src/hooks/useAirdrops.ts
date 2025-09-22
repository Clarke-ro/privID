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
      eligibility: 'unknown',
      datePeriod: '2024-04-01 to 2024-12-01',
      dateAdded: '25 May 2023'
    },
    {
      id: '6',
      name: 'DeFi Protocol Alpha',
      url: 'https://defi-alpha.com',
      type: 'DeFi',
      eligibility: 'unknown',
      datePeriod: '2024-06-01 to 2024-12-15',
      dateAdded: '15 Jun 2024'
    }
  ]);

  const [activities, setActivities] = useState<any[]>([]);

  const addActivity = (action: string, target: string) => {
    const getIconName = (action: string) => {
      if (action.includes('Added')) return 'Plus';
      if (action.includes('eligible')) return 'CheckCircle';
      if (action.includes('ineligible')) return 'XCircle';
      if (action.includes('unknown')) return 'Clock';
      return 'Trash2';
    };

    const getIconColor = (action: string) => {
      if (action.includes('Added')) return 'bg-blue-500';
      if (action.includes('eligible')) return 'bg-green-500';
      if (action.includes('ineligible')) return 'bg-red-500';
      if (action.includes('unknown')) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    const newActivity = {
      id: Date.now().toString(),
      action,
      target,
      time: 'Just now',
      iconName: getIconName(action),
      iconColor: getIconColor(action)
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
  };

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
    addActivity('Added airdrop', airdropData.name);
  };

  const updateEligibility = (id: string, eligibility: AirdropItem['eligibility']) => {
    const airdrop = airdrops.find(a => a.id === id);
    if (airdrop) {
      setAirdrops(prev => 
        prev.map(airdrop => 
          airdrop.id === id ? { ...airdrop, eligibility } : airdrop
        )
      );
      addActivity(`Changed status to ${eligibility}`, airdrop.name);
    }
  };

  const deleteAirdrop = (id: string) => {
    const airdrop = airdrops.find(a => a.id === id);
    if (airdrop) {
      setAirdrops(prev => prev.filter(airdrop => airdrop.id !== id));
      addActivity('Deleted airdrop', airdrop.name);
    }
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

  // Filter airdrops based on selected filter
  const getFilteredAirdrops = (filter: string) => {
    switch (filter) {
      case 'all':
        return airdrops;
      case 'eligible':
        return airdrops.filter(a => a.eligibility === 'eligible');
      case 'ineligible':
        return airdrops.filter(a => a.eligibility === 'ineligible');
      case 'unknown':
        return airdrops.filter(a => a.eligibility === 'unknown');
      default:
        return airdrops;
    }
  };

  return {
    airdrops,
    addAirdrop,
    updateEligibility,
    deleteAirdrop,
    counts,
    getFilteredAirdrops,
    activities
  };
};