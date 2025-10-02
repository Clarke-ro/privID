import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, FolderOpen, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { BalanceEditDialog } from './BalanceEditDialog';

interface StatusCardProps {
  title: string;
  count: number;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
}

const StatusCard = ({ title, count, subtitle, icon, iconColor }: StatusCardProps) => (
  <Card className="bg-gradient-to-br from-card to-card/50 border-primary/10 hover:border-primary/30 hover:shadow-glow transition-all cursor-pointer group">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
          {count}
        </Badge>
      </div>
      <h3 className="text-2xl font-bold mb-1">{count}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </CardContent>
  </Card>
);

interface AirdropStatusCardsProps {
  counts: {
    active: number;
    collected: number;
    yetToInteract: number;
  };
  totalBalance: number;
  onUpdateBalance: (newBalance: number) => void;
}

export const AirdropStatusCards = ({ counts, totalBalance, onUpdateBalance }: AirdropStatusCardsProps) => {
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all cursor-pointer group"
          onClick={() => setIsBalanceDialogOpen(true)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                Click to edit
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">${totalBalance.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Total Earned</p>
          </CardContent>
        </Card>
      <StatusCard
        title="Active Airdrops"
        count={counts.active}
        subtitle="Currently tracking"
        icon={<Play className="w-5 h-5 text-emerald-500" />}
        iconColor="bg-emerald-500/10"
      />
      <StatusCard
        title="Eligible"
        count={counts.collected}
        subtitle="Ready to collect"
        icon={<FolderOpen className="w-5 h-5 text-amber-500" />}
        iconColor="bg-amber-500/10"
      />
        <StatusCard
          title="Pending Review"
          count={counts.yetToInteract}
          subtitle="Needs attention"
          icon={<Clock className="w-5 h-5 text-blue-500" />}
          iconColor="bg-blue-500/10"
        />
      </div>

      <BalanceEditDialog
        open={isBalanceDialogOpen}
        onOpenChange={setIsBalanceDialogOpen}
        currentBalance={totalBalance}
        onSave={onUpdateBalance}
      />
    </>
  );
};