
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "../hooks/use-toast";
import { MessageSquare, Bell, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { couple, isAuthenticated, updatePoints } = useCouple();
  
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
  
  if (!couple) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }
  
  // Find active profile
  const activeProfile = couple.profiles.find(p => p.id === couple.activeProfileId);
  const partnerProfile = couple.profiles.find(p => p.id !== couple.activeProfileId);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blueTheme-light to-white p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blueTheme-light mr-3 flex items-center justify-center">
                <span className="text-xl">{activeProfile?.avatar || '👤'}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blueTheme-dark">
                  Hi, {activeProfile?.name || 'User'}
                </h1>
                <p className="text-sm text-blueTheme-dark">
                  Harmony Points: {couple.points}
                </p>
              </div>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-blueTheme text-blueTheme-dark"
              onClick={() => navigate("/profile")}
            >
              <User size={20} />
            </Button>
          </div>
        </header>
        
        <div className="mb-8">
          <Card className="p-6 bg-blueTheme-light border-blueTheme-medium shadow-sm">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-blueTheme-dark mb-4">
                Need to talk?
              </h2>
              <p className="text-blueTheme-dark mb-6">
                Press the alarm button to send an urgent message to {partnerProfile?.name || 'your partner'}
              </p>
              <Button
                className="bg-blueTheme hover:bg-blueTheme-hover w-full h-16 rounded-full text-xl shadow-lg"
                onClick={handleAlarm}
              >
                <Bell className="mr-2" size={24} />
                Ring Alarm
              </Button>
              <p className="text-xs text-blueTheme-dark mt-4">
                Use only in important situations (3 per day)
              </p>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          <Link to="/road-of-peace">
            <Card className="p-6 hover:bg-blueTheme-light transition-colors border-blueTheme-medium">
              <div className="flex items-center">
                <div className="mr-4 bg-blueTheme-light p-3 rounded-full">
                  <MessageSquare size={24} className="text-blueTheme-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-blueTheme-dark">Road of Peace</h3>
                  <p className="text-sm text-blueTheme-dark">
                    Work through disagreements together
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        <div className="bg-blueTheme-light rounded-lg p-4 text-center mb-8">
          <h3 className="font-semibold text-blueTheme-dark mb-2">Daily Quote</h3>
          <p className="text-blueTheme-dark italic">
            "The best relationships are not about winning arguments, but understanding each other."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
