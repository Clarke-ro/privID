import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, FolderOpen, Clock } from 'lucide-react';

interface StatusCardProps {
  title: string;
  count: number;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
}

const StatusCard = ({ title, count, subtitle, icon, iconColor }: StatusCardProps) => (
  <Card className="bg-card border-border hover:shadow-md transition-all cursor-pointer">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-8 h-8 rounded-lg ${iconColor} flex items-center justify-center`}>
          {icon}
        </div>
        <Badge variant="secondary" className="text-xs">
          {count} Active
        </Badge>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </CardContent>
  </Card>
);

export const AirdropStatusCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatusCard
        title="Active"
        count={100}
        subtitle="100 Active"
        icon={<Play className="w-4 h-4 text-green-600" />}
        iconColor="bg-green-100"
      />
      <StatusCard
        title="Collected"
        count={55}
        subtitle="55 Active"
        icon={<FolderOpen className="w-4 h-4 text-yellow-600" />}
        iconColor="bg-yellow-100"
      />
      <StatusCard
        title="Yet to Interact"
        count={55}
        subtitle="Yet to interact"
        icon={<Clock className="w-4 h-4 text-blue-600" />}
        iconColor="bg-blue-100"
      />
    </div>
  );
};