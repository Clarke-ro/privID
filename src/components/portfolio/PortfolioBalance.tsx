import { Card, CardContent } from '@/components/ui/card';

export const PortfolioBalance = () => {
  return (
    <Card className="bg-gradient-subtle border-border/50">
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground mb-2">Total Balance</div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-web3-orange">$665,050</span>
          <span className="text-lg text-muted-foreground">USD</span>
        </div>
      </CardContent>
    </Card>
  );
};