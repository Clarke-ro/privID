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
  return <div className="bg-black rounded-lg mx-6 my-4 p-3">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map(tab => <Button key={tab.id} variant="ghost" size="sm" onClick={() => handleTabClick(tab.path)} className={cn("px-6 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all", isActiveTab(tab.path) ? "bg-[#a5dff9] text-black shadow-sm" : "bg-white text-black hover:bg-gray-50")}>
            {tab.label}
          </Button>)}
      </div>
    </div>;
};