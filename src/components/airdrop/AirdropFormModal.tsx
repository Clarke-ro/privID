import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface AirdropFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAirdrop: (airdropData: {
    name: string;
    url: string;
    type: 'NFT' | 'Game' | 'Tool' | 'DeFi' | 'Infrastructure';
    eligibility: 'eligible' | 'ineligible' | 'unknown';
    datePeriod: string;
  }) => void;
}

export const AirdropFormModal = ({ open, onOpenChange, onAddAirdrop }: AirdropFormModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: '',
    description: '',
    eligibility: 'unknown' as 'eligible' | 'ineligible' | 'unknown',
    datePeriod: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onAddAirdrop({
      name: formData.name,
      url: formData.url,
      type: formData.type as 'NFT' | 'Game' | 'Tool' | 'DeFi' | 'Infrastructure',
      eligibility: formData.eligibility,
      datePeriod: formData.datePeriod
    });
    
    toast({
      title: "Airdrop Added",
      description: `${formData.name} has been added to your tracking list.`,
    });
    
    // Reset form and close modal
    setFormData({
      name: '',
      url: '',
      type: '',
      description: '',
      eligibility: 'unknown',
      datePeriod: ''
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-border bg-card text-card-foreground shadow-glow">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Airdrop to Track</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Airdrop Name</Label>
            <Input
              id="name"
              placeholder="e.g. Uniswap V4 Airdrop"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Airdrop URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://app.uniswap.org/"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NFT">NFT</SelectItem>
                  <SelectItem value="Game">Game</SelectItem>
                  <SelectItem value="Tool">Tool</SelectItem>
                  <SelectItem value="DeFi">DeFi</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eligibility">Eligibility Status</Label>
              <Select value={formData.eligibility} onValueChange={(value) => handleInputChange('eligibility', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select eligibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eligible">Eligible</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                  <SelectItem value="ineligible">Ineligible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="datePeriod">Date Period</Label>
            <Input
              id="datePeriod"
              placeholder="e.g. 2024-01-01 to 2024-12-31"
              value={formData.datePeriod}
              onChange={(e) => handleInputChange('datePeriod', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description about this airdrop..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Will be marked as "Unknown" initially
            </Badge>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:shadow-glow">
              Add Airdrop
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};