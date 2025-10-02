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
  const [airdrops, setAirdrops] = useState<AirdropItem[]>([]);

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