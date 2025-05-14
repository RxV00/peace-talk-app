
import React, { useState } from 'react';
import { useCoupleContext } from '../context/CoupleContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RoadOfPeace from './RoadOfPeace';

const Dashboard: React.FC = () => {
  const { 
    currentProfile, 
    partnerProfile,
    alarmActive, 
    alarmTime,
    triggerAlarm, 
    acknowledgeAlarm,
    roadOfPeaceActive,
    startRoadOfPeace,
    logout
  } = useCoupleContext();
  
  const { toast } = useToast();
  const [isAlarmDialogOpen, setIsAlarmDialogOpen] = useState(false);
  const [inputSteps, setInputSteps] = useState("20");
  
  if (!currentProfile || !partnerProfile) return null;
  
  const handleAlarmClick = () => {
    triggerAlarm();
    toast({
      title: "Alarm Sent",
      description: `You've notified ${partnerProfile.name} about an issue.`,
      duration: 5000,
    });
  };
  
  const handlePeaceButtonClick = () => {
    setIsAlarmDialogOpen(true);
  };
  
  const startPeaceRoad = () => {
    const steps = Math.min(parseInt(inputSteps) || 20, 20);
    startRoadOfPeace(steps);
    setIsAlarmDialogOpen(false);
  };
  
  // Calculate time since alarm if active
  const getTimeSinceAlarm = () => {
    if (alarmActive && alarmTime) {
      const minutes = Math.floor((Date.now() - alarmTime) / (1000 * 60));
      if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
      } else {
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`;
      }
    }
    return '';
  };

  if (roadOfPeaceActive) {
    return <RoadOfPeace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-lg mx-auto">
        {/* Profile Header */}
        <div className="ios-card mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-4xl mr-3">{currentProfile.avatar}</div>
            <div>
              <h2 className="font-semibold text-lg">{currentProfile.name}</h2>
              <div className="text-sm text-muted-foreground flex gap-2">
                <span>💬 {currentProfile.speakingPoints}</span>
                <span>👍 {currentProfile.likePoints}</span>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={logout}>
            Log out
          </Button>
        </div>
        
        {/* Main Card */}
        <Card className="ios-card mb-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Harmony Dashboard</h1>
            <p className="text-muted-foreground">Find peace together</p>
          </div>
          
          {alarmActive ? (
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="text-lg font-medium text-amber-700">Alarm Active</h3>
                <p className="text-amber-600">Time since alarm: {getTimeSinceAlarm()}</p>
              </div>
              
              <Button 
                onClick={handlePeaceButtonClick}
                className="w-full ios-button py-6 bg-primary/80 hover:bg-primary"
              >
                <span className="mr-2">☮️</span>
                <span>Start Road of Peace</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-700">
                  All is peaceful. Use the alarm button if you need to discuss something important with {partnerProfile.name}.
                </p>
              </div>
              
              <Button
                onClick={handleAlarmClick}
                className="w-full ios-button py-6 bg-red-500 hover:bg-red-600"
              >
                <span className="mr-2">🔔</span>
                <span>Trigger Alarm</span>
              </Button>
            </div>
          )}
        </Card>
        
        {/* Partner Card */}
        <Card className="ios-card">
          <div className="flex items-center">
            <div className="text-3xl mr-3">{partnerProfile.avatar}</div>
            <div>
              <h3 className="font-medium">{partnerProfile.name}</h3>
              <div className="text-sm text-muted-foreground flex gap-2">
                <span>💬 {partnerProfile.speakingPoints}</span>
                <span>👍 {partnerProfile.likePoints}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Steps Dialog */}
      <Dialog open={isAlarmDialogOpen} onOpenChange={setIsAlarmDialogOpen}>
        <DialogContent className="ios-card">
          <DialogHeader>
            <DialogTitle>Road of Peace Settings</DialogTitle>
            <DialogDescription>
              How many steps would you like on your journey to resolution? (Maximum 20)
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <input
              type="number"
              value={inputSteps}
              onChange={(e) => setInputSteps(e.target.value)}
              min="1"
              max="20"
              className="ios-input w-full"
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={startPeaceRoad} className="ios-button">
              Begin Journey
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
