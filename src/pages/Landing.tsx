import { WelcomeSection } from '@/components/dashboard/WelcomeSection';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      
      <WelcomeSection />
    </div>
  );
};

export default Landing;