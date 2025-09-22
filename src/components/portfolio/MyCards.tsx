import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Eye, Heart, Share } from 'lucide-react';
import nft1 from '@/assets/nft-1.png';
import nft2 from '@/assets/nft-2.png';
import nft3 from '@/assets/nft-3.png';

export const MyCards = () => {
  const nfts = [{
    id: 1,
    name: "Cyber Ape #4521",
    collection: "CyberApes",
    image: nft1,
    price: "2.5 ETH",
    rarity: "Rare"
  }, {
    id: 2,
    name: "Street Warrior #1337",
    collection: "StreetWarriors",
    image: nft2,
    price: "1.8 ETH",
    rarity: "Epic"
  }, {
    id: 3,
    name: "Mystic Hood #888",
    collection: "MysticHoods",
    image: nft3,
    price: "3.2 ETH",
    rarity: "Legendary"
  }];
  return <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">My NFTs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map(nft => (
          <Card key={nft.id} className="bg-card border-border hover:border-web3-orange/50 transition-all duration-300 overflow-hidden">
            <CardContent className="p-0">
              <AspectRatio ratio={9/16} className="bg-muted">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-web3-orange font-medium uppercase tracking-wide">
                      {nft.collection}
                    </span>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {nft.rarity}
                    </span>
                  </div>
                  <h3 className="text-foreground font-medium leading-tight">
                    {nft.name}
                  </h3>
                  <p className="text-sm font-semibold text-foreground">
                    {nft.price}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>;
};