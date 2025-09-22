import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  path: string;
}

export const HorizontalTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: Tab[] = [
    { id: 'reputation', label: 'REPUTATION', path: '/' },
    { id: 'portfolio', label: 'PORTFOLIO', path: '/portfolio' },
    { id: 'post', label: 'POST', path: '/post' },
    { id: 'job', label: 'JOB', path: '/job' },
    { id: 'connections', label: 'CONNECTIONS', path: '/connections' },
    { id: 'airdrop', label: 'AIRDROP', path: '/airdrop' },
    { id: 'calendar', label: 'CALENDAR', path: '/calendar' },
    { id: 'id', label: 'ID', path: '/id' }
  ];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-card border-x border-b border-border px-6 py-3">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={isActiveTab(tab.path) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabClick(tab.path)}
            className={cn(
              "px-6 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all",
              isActiveTab(tab.path)
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