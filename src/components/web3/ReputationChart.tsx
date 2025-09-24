import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReputation } from '@/hooks/useReputation';
import { TrendingUp } from 'lucide-react';

export const ReputationChart = () => {
  const { reputation } = useReputation();

  // Only show data if user has reputation data
  const displayData = reputation ? [
    { name: 'Balance', value: reputation.balance, color: 'hsl(var(--web3-blue))' },
    { name: 'Transfers', value: reputation.transfers, color: 'hsl(var(--web3-success))' },
    { name: 'Liquidity', value: reputation.liquidity, color: 'hsl(var(--web3-warning))' },
    { name: 'Governance', value: reputation.governance, color: 'hsl(var(--primary))' },
  ].filter(item => item.value > 0) : [];

  // Don't render chart if no reputation data
  if (!reputation) {
    return (
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-web3-orange" />
            Reputation Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-glow flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-web3-orange" />
            </div>
            <h3 className="font-medium mb-2">No Reputation Data</h3>
            <p className="text-sm">Connect wallet and register to view your reputation analytics</p>
          </div>
        </CardContent>
      </Card>
    );
  }


  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-web3-orange">{data.value} points</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-web3-orange" />
          Reputation Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ color: 'hsl(var(--foreground))' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-3xl font-bold text-web3-orange">
            {reputation.total}
          </div>
          <p className="text-muted-foreground">Total Reputation Points</p>
          
          <div className="mt-4 space-y-2">
            {displayData.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};