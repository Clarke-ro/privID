import { WelcomeSection } from '@/components/dashboard/WelcomeSection';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none" />
      <WelcomeSection />
    </div>
  );
};

export default Landing;