
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "../hooks/use-toast";
import { MessageSquare, Bell, User, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { couple, isAuthenticated, updatePoints, logout } = useCouple();
  
  // Protect route - only check once on mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!couple?.activeProfileId) {
      navigate("/profile");
    }
  }, []);
  
  // Handle alarm button
  const handleAlarm = () => {
    // Set a session storage flag to indicate alarm was triggered
    sessionStorage.setItem("alarmTriggered", "true");
    
    toast({
      title: "Alarm activated",
      description: "Your partner has been notified",
      variant: "default",
    });
    // In a real app, this would trigger a push notification to the partner
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  
  if (!couple) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }
  
  // Find active profile
  const activeProfile = couple.profiles.find(p => p.id === couple.activeProfileId);
  const partnerProfile = couple.profiles.find(p => p.id !== couple.activeProfileId);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleTheme-light to-white p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-purpleTheme-light mr-3 flex items-center justify-center">
                <span className="text-xl">{activeProfile?.avatar || '👤'}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purpleTheme-dark">
                  Hi, {activeProfile?.name || 'User'}
                </h1>
                <p className="text-sm text-purpleTheme-dark">
                  Harmony Points: {couple.points}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-purpleTheme text-purpleTheme-dark"
                onClick={() => navigate("/profile")}
              >
                <User size={20} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-purpleTheme text-purpleTheme-dark"
                onClick={handleLogout}
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </header>
        
        <div className="mb-8">
          <Card className="p-6 bg-purpleTheme-light border-purpleTheme-medium shadow-sm">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-purpleTheme-dark mb-4">
                Need to talk?
              </h2>
              <p className="text-purpleTheme-dark mb-6">
                Press the alarm button to send an urgent message to {partnerProfile?.name || 'your partner'}
              </p>
              <Button
                className="bg-purpleTheme hover:bg-purpleTheme-hover w-full h-16 rounded-full text-xl shadow-lg"
                onClick={handleAlarm}
              >
                <Bell className="mr-2" size={24} />
                Ring Alarm
              </Button>
              <p className="text-xs text-purpleTheme-dark mt-4">
                Use only in important situations (3 per day)
              </p>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          <Link to="/road-of-peace">
            <Card className="p-6 hover:bg-purpleTheme-light transition-colors border-purpleTheme-medium">
              <div className="flex items-center">
                <div className="mr-4 bg-purpleTheme-light p-3 rounded-full">
                  <MessageSquare size={24} className="text-purpleTheme-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-purpleTheme-dark">Road of Peace</h3>
                  <p className="text-sm text-purpleTheme-dark">
                    Work through disagreements together
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        <div className="bg-purpleTheme-light rounded-lg p-4 text-center mb-8">
          <h3 className="font-semibold text-purpleTheme-dark mb-2">Daily Quote</h3>
          <p className="text-purpleTheme-dark italic">
            "The best relationships are not about winning arguments, but understanding each other."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
