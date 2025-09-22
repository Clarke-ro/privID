import { Card, CardContent } from '@/components/ui/card';

export const PortfolioBalance = () => {
  return (
    <Card className="bg-gradient-card border-border">
      <CardContent className="p-8">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-foreground">$</span>
            <span className="text-4xl font-bold text-web3-orange">665,050</span>
            <span className="text-muted-foreground text-lg">USD</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};