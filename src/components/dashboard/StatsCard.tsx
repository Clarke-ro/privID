import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Activity, Award } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  variant?: 'default' | 'cyan' | 'purple' | 'orange';
  icon?: React.ComponentType<{ className?: string }>;
}

export const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  trend = 'neutral', 
  variant = 'default',
  icon: Icon = Activity 
}: StatsCardProps) => {
  const variantStyles = {
    default: 'bg-gradient-card',
    cyan: 'bg-gradient-cyan shadow-cyan',
    purple: 'bg-gradient-purple',
    orange: 'bg-gradient-primary shadow-glow'
  };

  const textColor = variant === 'default' ? 'text-foreground' : 'text-white';
  const subtitleColor = variant === 'default' ? 'text-muted-foreground' : 'text-white/70';

  return (
    <Card className={`${variantStyles[variant]} shadow-card border-0 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none opacity-30" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Icon className={`w-5 h-5 ${textColor}`} />
          {trend !== 'neutral' && (
            <Badge 
              variant="secondary" 
              className={`
                ${trend === 'up' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}
              `}
            >
              <TrendingUp className={`w-3 h-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {trend === 'up' ? '+12%' : '-5%'}
            </Badge>
          )}
        </div>
        
        <div className={`text-sm font-medium ${subtitleColor} mb-1`}>
          {title}
        </div>
        
        <div className={`text-3xl font-bold ${textColor} mb-2`}>
          {value}
        </div>
        
        {subtitle && (
          <div className={`text-xs ${subtitleColor}`}>
            {subtitle}
          </div>
        )}
      </CardContent>
    </Card>
  );
};