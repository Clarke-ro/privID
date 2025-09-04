import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useWeb3 } from "@/hooks/useWeb3";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Index from "./pages/Index";
import Activity from "./pages/Activity";
import Wallet from "./pages/Wallet";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Centralized route guard component
function RouteGuard({ children, requiredAuth, allowOnboarding = false }: { 
  children: React.ReactNode;
  requiredAuth: 'none' | 'wallet' | 'complete';
  allowOnboarding?: boolean;
}) {
  const { isConnected } = useWeb3();
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const navigatingRef = useRef(false);

  useEffect(() => {
    if (navigatingRef.current) return;

    const timer = setTimeout(() => {
      // Landing page - only accessible when wallet not connected
      if (requiredAuth === 'none' && isConnected) {
        if (profile.isOnboarded) {
          navigatingRef.current = true;
          navigate('/', { replace: true });
          setTimeout(() => { navigatingRef.current = false; }, 100);
        } else {
          navigatingRef.current = true;
          navigate('/onboarding', { replace: true });
          setTimeout(() => { navigatingRef.current = false; }, 100);
        }
        return;
      }

      // Onboarding page - only accessible when wallet connected but not onboarded
      if (requiredAuth === 'wallet' && allowOnboarding) {
        if (!isConnected) {
          navigatingRef.current = true;
          navigate('/landing', { replace: true });
          setTimeout(() => { navigatingRef.current = false; }, 100);
        } else if (profile.isOnboarded) {
          navigatingRef.current = true;
          navigate('/', { replace: true });
          setTimeout(() => { navigatingRef.current = false; }, 100);
        }
        return;
      }

      // Dashboard pages - only accessible when wallet connected and onboarded
      if (requiredAuth === 'complete') {
        if (!isConnected) {
          navigatingRef.current = true;
          navigate('/landing', { replace: true });
          setTimeout(() => { navigatingRef.current = false; }, 100);
        } else if (!profile.isOnboarded) {
          navigatingRef.current = true;
          navigate('/onboarding', { replace: true });
          setTimeout(() => { navigatingRef.current = false; }, 100);
        }
        return;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isConnected, profile.isOnboarded, navigate, location.pathname, requiredAuth, allowOnboarding]);

  // Show loading or nothing while redirecting
  if (requiredAuth === 'none' && isConnected) return null;
  if (requiredAuth === 'wallet' && allowOnboarding && (!isConnected || profile.isOnboarded)) return null;
  if (requiredAuth === 'complete' && (!isConnected || !profile.isOnboarded)) return null;

  return <>{children}</>;
}

const AppContent = () => {
  const { profile, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={
          <RouteGuard requiredAuth="none">
            <Landing />
          </RouteGuard>
        } />
        <Route path="/onboarding" element={
          <RouteGuard requiredAuth="wallet" allowOnboarding={true}>
            <Onboarding />
          </RouteGuard>
        } />
        <Route path="/" element={
          <RouteGuard requiredAuth="complete">
            <Index />
          </RouteGuard>
        } />
        <Route path="/activity" element={
          <RouteGuard requiredAuth="complete">
            <Activity />
          </RouteGuard>
        } />
        <Route path="/wallet" element={
          <RouteGuard requiredAuth="complete">
            <Wallet />
          </RouteGuard>
        } />
        <Route path="/explore" element={
          <RouteGuard requiredAuth="complete">
            <Explore />
          </RouteGuard>
        } />
        <Route path="/messages" element={
          <RouteGuard requiredAuth="complete">
            <Messages />
          </RouteGuard>
        } />
        <Route path="/profile" element={
          <RouteGuard requiredAuth="complete">
            <Profile />
          </RouteGuard>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="encrypted-reputation-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;