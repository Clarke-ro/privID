import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { AirdropItem } from '@/hooks/useAirdrops';

interface AirdropTableProps {
  airdrops: AirdropItem[];
  onUpdateEligibility: (id: string, eligibility: AirdropItem['eligibility']) => void;
  onDeleteAirdrop: (id: string) => void;
}

export const AirdropTable = ({ airdrops, onUpdateEligibility, onDeleteAirdrop }: AirdropTableProps) => {

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'NFT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Game': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Tool': return 'bg-green-100 text-green-800 border-green-200';
      case 'DeFi': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Infrastructure': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEligibilityIcon = (eligibility: AirdropItem['eligibility']) => {
    switch (eligibility) {
      case 'eligible': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'ineligible': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'unknown': return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getEligibilityBadge = (eligibility: AirdropItem['eligibility']) => {
    switch (eligibility) {
      case 'eligible': return 'text-green-700 border-green-300 bg-green-50';
      case 'ineligible': return 'text-red-700 border-red-300 bg-red-50';
      case 'unknown': return 'text-yellow-700 border-yellow-300 bg-yellow-50';
    }
  };

  const getNextEligibility = (current: AirdropItem['eligibility']): AirdropItem['eligibility'] => {
    switch (current) {
      case 'eligible': return 'ineligible';
      case 'ineligible': return 'unknown';
      case 'unknown': return 'eligible';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Airdrop List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Eligibility Status</TableHead>
              <TableHead>Date Period</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {airdrops.map((airdrop) => (
              <TableRow key={airdrop.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-primary text-white">
                        {new URL(airdrop.url).hostname.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <a 
                      href={airdrop.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {new URL(airdrop.url).hostname}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{airdrop.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeColor(airdrop.type)}>
                    {airdrop.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateEligibility(airdrop.id, getNextEligibility(airdrop.eligibility))}
                    className="flex items-center gap-2 h-8 px-2"
                  >
                    {getEligibilityIcon(airdrop.eligibility)}
                    <Badge variant="outline" className={getEligibilityBadge(airdrop.eligibility)}>
                      {airdrop.eligibility.charAt(0).toUpperCase() + airdrop.eligibility.slice(1)}
                    </Badge>
                  </Button>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {airdrop.datePeriod}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteAirdrop(airdrop.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};