
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "../hooks/use-toast";
import { MessageSquare, Bell, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { couple, isAuthenticated, updatePoints } = useCouple();
  
  // Protect route
  React.useEffect(() => {
    if (!isAuthenticated || !couple?.activeProfileId) {
      navigate("/profile");
    }
  }, [isAuthenticated, couple, navigate]);
  
  // Handle alarm button
  const handleAlarm = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-purple-200 mr-3 flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Hi, {activeProfile?.name}
                </h1>
                <p className="text-sm text-gray-600">
                  Harmony Points: {couple.points}
                </p>
              </div>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              onClick={() => navigate("/profile")}
            >
              <User size={20} />
            </Button>
          </div>
        </header>
        
        <div className="mb-8">
          <Card className="p-6 bg-red-50 border-red-200 shadow-sm">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-4">
                Need to talk?
              </h2>
              <p className="text-red-700 mb-6">
                Press the alarm button to send an urgent message to {partnerProfile?.name}
              </p>
              <Button
                className="bg-red-600 hover:bg-red-700 w-full h-16 rounded-full text-xl shadow-lg"
                onClick={handleAlarm}
              >
                <Bell className="mr-2" size={24} />
                Ring Alarm
              </Button>
              <p className="text-xs text-red-600 mt-4">
                Use only in important situations (3 per day)
              </p>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          <Link to="/road-of-peace">
            <Card className="p-6 hover:bg-purple-50 transition-colors border-purple-200">
              <div className="flex items-center">
                <div className="mr-4 bg-purple-100 p-3 rounded-full">
                  <MessageSquare size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Road of Peace</h3>
                  <p className="text-sm text-gray-600">
                    Work through disagreements together
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        <div className="bg-purple-100 rounded-lg p-4 text-center mb-8">
          <h3 className="font-semibold text-purple-800 mb-2">Daily Quote</h3>
          <p className="text-purple-700 italic">
            "The best relationships are not about winning arguments, but understanding each other."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
