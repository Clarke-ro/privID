import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  active?: boolean;
}

interface HorizontalTabsProps {
  onTabChange?: (tabId: string) => void;
}

export const HorizontalTabs = ({ onTabChange }: HorizontalTabsProps) => {
  const [activeTab, setActiveTab] = useState('reputation');

  const tabs: Tab[] = [
    { id: 'reputation', label: 'REPUTATION', active: true },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'post', label: 'POST' },
    { id: 'job', label: 'JOB' },
    { id: 'connections', label: 'CONNECTIONS' },
    { id: 'airdrop', label: 'AIRDROP' },
    { id: 'calendar', label: 'CALENDAR' },
    { id: 'more', label: '...' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="bg-card border-x border-b border-border px-6 py-3">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "px-6 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all",
              activeTab === tab.id 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};