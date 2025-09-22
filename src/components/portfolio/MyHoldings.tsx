import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpIcon, ArrowDownIcon, RefreshCwIcon, SearchIcon, SlidersIcon, MoreHorizontalIcon } from 'lucide-react';

const holdingsData = [
  {
    id: 1,
    asset: 'BTC',
    name: 'Bitcoin',
    balance: '5.35',
    usdValue: '$315,000',
    icon: '₿'
  },
  {
    id: 2,
    asset: 'BTC',
    name: 'Bitcoin',
    balance: '5.35',
    usdValue: '$315,000',
    icon: '₿'
  },
  {
    id: 3,
    asset: 'BTC',
    name: 'Bitcoin',
    balance: '5.35',
    usdValue: '$315,000',
    icon: '₿'
  }
];

export const MyHoldings = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">My Holdings</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <SearchIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <SlidersIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontalIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <Card className="bg-gradient-card border-border/50">
        <CardContent className="p-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="fiat">Fiat</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="text-muted-foreground">Asset</TableHead>
                    <TableHead className="text-muted-foreground">Total Balance</TableHead>
                    <TableHead className="text-muted-foreground">Deposit</TableHead>
                    <TableHead className="text-muted-foreground">Withdraw</TableHead>
                    <TableHead className="text-muted-foreground">Convert</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdingsData.map((holding) => (
                    <TableRow key={holding.id} className="border-border/50 hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-web3-orange/20 flex items-center justify-center text-web3-orange font-bold">
                            {holding.icon}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{holding.asset}</div>
                            <div className="text-sm text-muted-foreground">{holding.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{holding.balance} {holding.asset}</div>
                          <div className="text-sm text-muted-foreground">{holding.usdValue} USD</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-web3-orange hover:text-web3-orange/80">
                          <ArrowUpIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-web3-orange hover:text-web3-orange/80">
                          <ArrowDownIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-web3-orange hover:text-web3-orange/80">
                          <RefreshCwIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="fiat">
              <div className="text-center py-8 text-muted-foreground">
                No fiat holdings to display
              </div>
            </TabsContent>
            
            <TabsContent value="crypto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="text-muted-foreground">Asset</TableHead>
                    <TableHead className="text-muted-foreground">Total Balance</TableHead>
                    <TableHead className="text-muted-foreground">Deposit</TableHead>
                    <TableHead className="text-muted-foreground">Withdraw</TableHead>
                    <TableHead className="text-muted-foreground">Convert</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdingsData.map((holding) => (
                    <TableRow key={holding.id} className="border-border/50 hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-web3-orange/20 flex items-center justify-center text-web3-orange font-bold">
                            {holding.icon}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{holding.asset}</div>
                            <div className="text-sm text-muted-foreground">{holding.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{holding.balance} {holding.asset}</div>
                          <div className="text-sm text-muted-foreground">{holding.usdValue} USD</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-web3-orange hover:text-web3-orange/80">
                          <ArrowUpIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-web3-orange hover:text-web3-orange/80">
                          <ArrowDownIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-web3-orange hover:text-web3-orange/80">
                          <RefreshCwIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};