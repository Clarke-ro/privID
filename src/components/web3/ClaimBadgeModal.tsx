import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge3D } from './Badge3D';
import { Award, Trophy, Crown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClaimBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    id: string;
    title: string;
    description: string;
    tier: string;
    icon: typeof Award;
    points: number;
  };
  onClaimed: () => void;
}

export const ClaimBadgeModal = ({ isOpen, onClose, achievement, onClaimed }: ClaimBadgeModalProps) => {
  const [stage, setStage] = useState<'rotating' | 'opening' | 'revealed'>('rotating');

  useEffect(() => {
    if (isOpen) {
      setStage('rotating');
      
      // Rotation phase (2 seconds)
      const rotateTimer = setTimeout(() => {
        setStage('opening');
      }, 2000);

      // Opening phase (1 second)
      const openTimer = setTimeout(() => {
        setStage('revealed');
      }, 3000);

      // Auto-save after reveal (2 seconds)
      const saveTimer = setTimeout(() => {
        onClaimed();
        onClose();
        setStage('rotating'); // Reset for next time
      }, 5000);

      return () => {
        clearTimeout(rotateTimer);
        clearTimeout(openTimer);
        clearTimeout(saveTimer);
      };
    }
  }, [isOpen, onClaimed, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-none bg-gradient-to-br from-background to-muted p-12">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          {/* Box Container */}
          <div className="relative perspective-1000 w-full h-64 flex items-center justify-center">
            {/* Rotating/Opening Box */}
            {stage !== 'revealed' && (
              <div
                className={cn(
                  'box-container relative w-48 h-48 transition-all duration-1000',
                  stage === 'rotating' && 'animate-spin-slow',
                  stage === 'opening' && 'animate-none'
                )}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Box Top */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 border-4 border-amber-900 rounded-lg shadow-2xl transition-all duration-1000',
                    stage === 'opening' && 'open-box-top'
                  )}
                  style={{
                    transformOrigin: 'top center',
                    transform: stage === 'opening' ? 'rotateX(-120deg) translateZ(96px)' : 'translateZ(96px)',
                  }}
                >
                  <div className="absolute inset-4 border-2 border-amber-700 rounded" />
                </div>

                {/* Box Sides */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 border-4 border-amber-900 rounded-lg shadow-2xl" />
              </div>
            )}

            {/* Revealed Badge */}
            {stage === 'revealed' && (
              <div className="animate-scale-in">
                <Badge3D
                  tier={achievement.tier}
                  icon={achievement.icon}
                  title={achievement.title}
                  size="lg"
                  className="animate-float"
                />
                <div className="mt-8 text-center space-y-2">
                  <h3 className="text-2xl font-bold text-web3-orange">Achievement Unlocked!</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                  <p className="text-xl font-bold text-primary">+{achievement.points.toLocaleString()} Points</p>
                  <p className="text-sm text-muted-foreground animate-pulse">Saving to portfolio...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
