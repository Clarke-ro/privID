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
  const tabs: Tab[] = [{
    id: 'reputation',
    label: 'REPUTATION',
    path: '/'
  }, {
    id: 'portfolio',
    label: 'PORTFOLIO',
    path: '/portfolio'
  }, {
    id: 'post',
    label: 'POST',
    path: '/post'
  }, {
    id: 'job',
    label: 'JOB',
    path: '/job'
  }, {
    id: 'connections',
    label: 'CONNECTIONS',
    path: '/connections'
  }, {
    id: 'airdrop',
    label: 'AIRDROP',
    path: '/airdrop'
  }, {
    id: 'calendar',
    label: 'CALENDAR',
    path: '/calendar'
  }, {
    id: 'id',
    label: 'ID',
    path: '/id'
  }];
  const handleTabClick = (path: string) => {
    navigate(path);
  };
  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };
  return <div className="backdrop-blur-sm border border-border rounded-lg mx-6 my-4 p-2 bg-zinc-50">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map(tab => <Button key={tab.id} variant="ghost" size="sm" onClick={() => handleTabClick(tab.path)} className={cn("px-6 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all", isActiveTab(tab.path) ? "text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")} style={{
        backgroundColor: isActiveTab(tab.path) ? 'hsl(var(--tab-active))' : 'hsl(var(--tab-inactive))',
        color: isActiveTab(tab.path) ? 'hsl(var(--foreground))' : undefined
      }}>
            {tab.label}
          </Button>)}
      </div>
    </div>;
};