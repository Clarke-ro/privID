import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserProfile } from '@/hooks/useUserProfile';
import heroBg from '@/assets/web3-hero-bg.jpg';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHero?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  title = "PrivID",
  subtitle = "Your Web3 Identity & Reputation Hub",
  showHero = true 
}) => {
  const isMobile = useIsMobile();
  const { profile } = useUserProfile();
  const [scrollY, setScrollY] = useState(0);
  
  // Use profile avatar if available, otherwise use default hero background
  const backgroundImage = profile.avatar || heroBg;

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (!isMobile) {
    return <>{children}</>;
  }

  const heroHeight = 60; // vh
  const blurStart = (window.innerHeight * heroHeight) / 100 * 0.6;
  const blurMax = (window.innerHeight * heroHeight) / 100;
  
  const blurAmount = Math.min(Math.max((scrollY - blurStart) / (blurMax - blurStart), 0), 1) * 8;
  const overlayOpacity = Math.min(Math.max(scrollY / blurMax, 0), 0.7);

  return (
    <div className="min-h-screen bg-background">
      {showHero && (
        <>
          {/* Hero Background Image */}
          <div 
            className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: `blur(${blurAmount}px)`,
              transform: `translateY(${scrollY * 0.5}px)`, // Parallax effect
            }}
          />
          
          {/* Overlay for blur effect */}
          <div 
            className="fixed top-0 left-0 w-full h-screen bg-background z-10"
            style={{
              opacity: overlayOpacity,
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-20">
        {showHero && (
          /* Hero Content */
          <div className="min-h-[60vh] flex flex-col justify-end p-6 pb-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                {title}
              </h1>
              <p className="text-lg text-white/90 drop-shadow-md">
                {subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-background rounded-t-3xl min-h-screen relative">
          <div className="p-6 pt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};