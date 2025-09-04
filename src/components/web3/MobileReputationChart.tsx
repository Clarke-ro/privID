import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Shield, Star, Users } from 'lucide-react';

export const MobileReputationChart = () => {
  const data = [
    { name: 'DeFi Interactions', value: 35, color: 'hsl(var(--web3-orange))' },
    { name: 'NFT Activities', value: 25, color: 'hsl(var(--web3-blue))' },
    { name: 'DAO Participation', value: 20, color: 'hsl(var(--web3-success))' },
    { name: 'Social Reputation', value: 20, color: 'hsl(var(--web3-warning))' }
  ];

  const stats = [
    {
      label: 'Total Score',
      value: '850',
      icon: TrendingUp,
      color: 'text-web3-orange',
      bg: 'bg-web3-orange/10'
    },
    {
      label: 'Trust Level',
      value: '94%',
      icon: Shield,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      label: 'Rank',
      value: '#127',
      icon: Star,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    {
      label: 'Network',
      value: '2.3k',
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-4 text-center`}>
              <div className={`w-8 h-8 rounded-full ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className={`text-xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reputation Breakdown */}
      <div className="bg-muted/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
          Reputation Breakdown
        </h3>
        
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-foreground">{entry.name}</span>
              </div>
              <span className="text-xs font-medium text-foreground">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};