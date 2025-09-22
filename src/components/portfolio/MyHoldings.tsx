import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown, RefreshCw, Search, Settings, MoreHorizontal } from 'lucide-react';

export const MyHoldings = () => {
  const holdings = [
    {
      id: 1,
      asset: "BTC",
      name: "Bitcoin",
      amount: "5.55 BTC",
      usdValue: "$315,000 USD",
      icon: "₿"
    },
    {
      id: 2,
      asset: "BTC",
      name: "Bitcoin",
      amount: "5.55 BTC",
      usdValue: "$315,000 USD",
      icon: "₿"
    },
    {
      id: 3,
      asset: "BTC", 
      name: "Bitcoin",
      amount: "5.55 BTC",
      usdValue: "$315,000 USD",
      icon: "₿"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">My Holdings</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-card border-border">
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="p-6 pb-0">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="fiat">Fiat</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium">Asset</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Total Balance</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Deposit</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Withdraw</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Convert</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdings.map((holding) => (
                    <TableRow key={holding.id} className="border-border hover:bg-muted/5">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-web3-orange/10 flex items-center justify-center">
                            <span className="text-web3-orange font-bold text-sm">{holding.icon}</span>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{holding.asset}</div>
                            <div className="text-sm text-muted-foreground">{holding.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{holding.amount}</div>
                          <div className="text-sm text-muted-foreground">{holding.usdValue}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="hover:bg-web3-orange/10">
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="hover:bg-web3-orange/10">
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="hover:bg-web3-orange/10">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="fiat" className="mt-0">
              <div className="p-8 text-center text-muted-foreground">
                No fiat holdings to display
              </div>
            </TabsContent>

            <TabsContent value="crypto" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium">Asset</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Total Balance</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Deposit</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Withdraw</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Convert</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdings.map((holding) => (
                    <TableRow key={holding.id} className="border-border hover:bg-muted/5">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-web3-orange/10 flex items-center justify-center">
                            <span className="text-web3-orange font-bold text-sm">{holding.icon}</span>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{holding.asset}</div>
                            <div className="text-sm text-muted-foreground">{holding.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{holding.amount}</div>
                          <div className="text-sm text-muted-foreground">{holding.usdValue}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="hover:bg-web3-orange/10">
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="hover:bg-web3-orange/10">
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="hover:bg-web3-orange/10">
                          <RefreshCw className="w-4 h-4" />
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