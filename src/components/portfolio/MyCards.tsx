import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const cardData = [
  {
    id: 1,
    category: "Exclusive cards",
    title: "Your card is ready to be activated",
    buttonText: "Activate Card",
    gradient: "from-gray-800 to-gray-900",
    icon: "💳"
  },
  {
    id: 2,
    category: "Promotion",
    title: "Earn Big with AXYS Referrals!",
    subtitle: "Earn AXYS yearly, invite your friends, get great daily for a credit card.",
    buttonText: "See Offer",
    gradient: "from-blue-900 to-blue-800",
    icon: "🎁"
  },
  {
    id: 3,
    category: "Neogarden",
    title: "Do you need more Amulets?",
    buttonText: "Campaign",
    gradient: "from-red-900 to-orange-800",
    icon: "🎭"
  }
];

export const MyCards = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">My Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((card) => (
          <Card key={card.id} className={`bg-gradient-to-br ${card.gradient} border-border/50 relative overflow-hidden`}>
            <CardContent className="p-6">
              <div className="text-xs text-web3-orange uppercase tracking-wide mb-2">
                {card.category}
              </div>
              <h3 className="text-white font-medium mb-2 leading-tight">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {card.subtitle}
                </p>
              )}
              <Button 
                size="sm" 
                className="bg-web3-orange hover:bg-web3-orange/90 text-black font-medium"
              >
                {card.buttonText}
              </Button>
              <div className="absolute top-4 right-4 text-2xl opacity-20">
                {card.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};