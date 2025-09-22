import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AttestationCardProps {
  title: string;
  status: 'linked' | 'not-linked' | 'pending';
  onLink?: () => void;
  className?: string;
}

export const AttestationCard = ({ title, status, onLink, className }: AttestationCardProps) => {
  return (
    <Card className={cn(
      "relative h-32 bg-slate-900 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group",
      className
    )}>
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white leading-tight">
            {title}
          </h3>
          <Badge 
            variant={status === 'linked' ? 'default' : 'secondary'}
            className={cn(
              "text-xs",
              status === 'linked' 
                ? 'bg-green-600 text-white' 
                : status === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-slate-700 text-slate-300'
            )}
          >
            {status === 'linked' ? 'Linked' : status === 'pending' ? 'Pending' : 'Not Linked'}
          </Badge>
        </div>
        
        {status === 'not-linked' && (
          <Button 
            size="sm" 
            variant="outline"
            className="w-full text-xs h-7 border-slate-600 text-slate-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onLink}
          >
            Link
          </Button>
        )}
      </CardContent>
    </Card>
  );
};