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
import Index from "./pages/Index";
import Activity from "./pages/Activity";
import Wallet from "./pages/Wallet";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Simplified route guard component
function RouteGuard({ children, requiredAuth }: { 
  children: React.ReactNode;
  requiredAuth: 'none' | 'wallet';
}) {
  const { isConnected } = useWeb3();
  const navigate = useNavigate();
  const navigatingRef = useRef(false);

  useEffect(() => {
    if (navigatingRef.current) return;

    const timer = setTimeout(() => {
      // Landing page - only accessible when wallet not connected
      if (requiredAuth === 'none' && isConnected) {
        navigatingRef.current = true;
        navigate('/', { replace: true });
        setTimeout(() => { navigatingRef.current = false; }, 100);
        return;
      }

      // Dashboard pages - only accessible when wallet connected
      if (requiredAuth === 'wallet' && !isConnected) {
        navigatingRef.current = true;
        navigate('/landing', { replace: true });
        setTimeout(() => { navigatingRef.current = false; }, 100);
        return;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isConnected, navigate, requiredAuth]);

  // Show loading or nothing while redirecting
  if (requiredAuth === 'none' && isConnected) return null;
  if (requiredAuth === 'wallet' && !isConnected) return null;

  return <>{children}</>;
}

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={
          <RouteGuard requiredAuth="none">
            <Landing />
          </RouteGuard>
        } />
        <Route path="/" element={
          <RouteGuard requiredAuth="wallet">
            <Index />
          </RouteGuard>
        } />
        <Route path="/activity" element={
          <RouteGuard requiredAuth="wallet">
            <Activity />
          </RouteGuard>
        } />
        <Route path="/wallet" element={
          <RouteGuard requiredAuth="wallet">
            <Wallet />
          </RouteGuard>
        } />
        <Route path="/explore" element={
          <RouteGuard requiredAuth="wallet">
            <Explore />
          </RouteGuard>
        } />
        <Route path="/messages" element={
          <RouteGuard requiredAuth="wallet">
            <Messages />
          </RouteGuard>
        } />
        <Route path="/profile" element={
          <RouteGuard requiredAuth="wallet">
            <Profile />
          </RouteGuard>
        } />
        <Route path="/leaderboard" element={
          <RouteGuard requiredAuth="wallet">
            <Leaderboard />
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