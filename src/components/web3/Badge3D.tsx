import { cn } from '@/lib/utils';
import { Award, Trophy, Crown, Star } from 'lucide-react';

interface Badge3DProps {
  tier: string;
  icon: typeof Award;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge3D = ({ tier, icon: Icon, title, className, size = 'md' }: Badge3DProps) => {
  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'Common':
        return 'from-gray-400 via-gray-300 to-gray-400';
      case 'Rare':
        return 'from-blue-400 via-blue-300 to-blue-500';
      case 'Epic':
        return 'from-purple-400 via-purple-300 to-purple-600';
      case 'Legendary':
        return 'from-yellow-400 via-yellow-300 to-yellow-500';
      default:
        return 'from-gray-400 via-gray-300 to-gray-400';
    }
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  return (
    <div className={cn('relative perspective-1000', className)}>
      <div
        className={cn(
          'badge-3d relative rounded-full bg-gradient-to-br',
          getTierGradient(tier),
          sizeClasses[size],
          'shadow-2xl animate-float'
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(15deg) rotateY(-15deg)',
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-white/30 backdrop-blur-sm" />
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={cn(iconSizes[size], 'text-white drop-shadow-lg')} />
        </div>
        
        {/* Shine effect */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent"
          style={{ transform: 'translateZ(10px)' }}
        />
      </div>
      
      {/* Badge name */}
      {size !== 'sm' && (
        <div className="mt-4 text-center">
          <p className="font-bold text-sm">{title}</p>
        </div>
      )}
    </div>
  );
};
