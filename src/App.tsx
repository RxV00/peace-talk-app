
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoupleProvider } from "./context/CoupleContext";
import AppContent from "./components/AppContent";
import SignupScreen from "./components/SignupScreen";
import SplashScreen from "./components/SplashScreen";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CoupleProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {showSplash ? (
              <SplashScreen />
            ) : (
              <Routes>
                <Route path="/" element={<AppContent />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="*" element={<AppContent />} />
              </Routes>
            )}
          </BrowserRouter>
        </CoupleProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
