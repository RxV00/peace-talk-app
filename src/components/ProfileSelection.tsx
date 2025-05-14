
import React from 'react';
import { useCoupleContext } from '../context/CoupleContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ProfileSelection: React.FC = () => {
  const { profiles, selectProfile } = useCoupleContext();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="ios-card max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Who's using the app?</h1>
          <p className="text-muted-foreground">Select your profile</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {profiles.map((profile) => (
            <Card 
              key={profile.id}
              className="ios-card bg-white hover:bg-accent transition-all cursor-pointer"
              onClick={() => selectProfile(profile.id)}
            >
              <div className="flex flex-col items-center py-4">
                <div className="text-5xl mb-3">{profile.avatar}</div>
                <h3 className="text-xl font-medium mb-1">{profile.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>💬 {profile.speakingPoints}</span>
                  <span>•</span>
                  <span>👍 {profile.likePoints}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;
