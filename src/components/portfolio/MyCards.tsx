import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Gift, Zap } from 'lucide-react';

export const MyCards = () => {
  const cards = [
    {
      id: 1,
      category: "Exclusive cards",
      title: "Your card is ready to be activated",
      description: "",
      buttonText: "Activate Card",
      buttonVariant: "default" as const,
      icon: CreditCard,
      gradient: "from-blue-600/20 to-purple-600/20"
    },
    {
      id: 2,
      category: "Promotion",
      title: "Earn Big with AXYS Referrals!",
      description: "Earn AXYS tokens time with your friends join and qualify for a credit card.",
      buttonText: "See Offer",
      buttonVariant: "outline" as const,
      icon: Gift,
      gradient: "from-green-600/20 to-emerald-600/20"
    },
    {
      id: 3,
      category: "Neogarden",
      title: "Do you need more Amulets?",
      description: "",
      buttonText: "Campaign",
      buttonVariant: "outline" as const,
      icon: Zap,
      gradient: "from-red-600/20 to-orange-600/20"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">My Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card key={card.id} className={`bg-gradient-to-br ${card.gradient} border-border hover:border-web3-orange/50 transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-web3-orange" />
                    <span className="text-xs text-web3-orange font-medium uppercase tracking-wide">
                      {card.category}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-foreground font-medium leading-tight">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {card.description}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    variant={card.buttonVariant}
                    size="sm"
                    className="w-full"
                  >
                    {card.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};