import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, XCircle } from 'lucide-react';

interface AirdropItem {
  id: string;
  name: string;
  location: string;
  eligible: boolean;
  type: 'NFT' | 'Game' | 'Tool';
  lastInteraction: string;
  lastModified: string;
  avatar?: string;
}

export const AirdropTable = () => {
  const airdrops: AirdropItem[] = [
    {
      id: '1',
      name: 'LearnUIto',
      location: 'Centmalevel',
      eligible: true,
      type: 'NFT',
      lastInteraction: 'Centmalevel',
      lastModified: '25 May 2020'
    },
    {
      id: '2',
      name: 'Design-Pictures',
      location: 'main.level',
      eligible: true,
      type: 'NFT',
      lastInteraction: 'main.level',
      lastModified: '75 May 2023'
    },
    {
      id: '3',
      name: 'UI/UX designer',
      location: 'bylayer.level',
      eligible: true,
      type: 'Game',
      lastInteraction: 'bylayer.level',
      lastModified: '25 May 2023'
    },
    {
      id: '4',
      name: 'Node.js pdf',
      location: 'graphics.level',
      eligible: false,
      type: 'Tool',
      lastInteraction: 'graphics.level',
      lastModified: '25 May 2023'
    },
    {
      id: '5',
      name: 'Weekly Report',
      location: 'bylayer.level',
      eligible: false,
      type: 'Tool',
      lastInteraction: 'bylayer.level',
      lastModified: '25 May 2023'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'NFT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Game': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Tool': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recently Interacted</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Eligible</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last</TableHead>
              <TableHead>Last Modified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {airdrops.map((airdrop) => (
              <TableRow key={airdrop.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-primary text-white">
                        {airdrop.location.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{airdrop.location}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{airdrop.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {airdrop.eligible ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                          Eligible
                        </Badge>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <Badge variant="outline" className="text-red-700 border-red-300 bg-red-50">
                          Ineligible
                        </Badge>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeColor(airdrop.type)}>
                    {airdrop.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {airdrop.lastInteraction}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {airdrop.lastModified}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};