
import React from 'react';
import { useCoupleContext } from '../context/CoupleContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ProfileSelection: React.FC = () => {
  const { profiles, selectProfile, logout } = useCoupleContext();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="ios-card max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Who's using the app?</h1>
          <p className="text-muted-foreground">Select your profile to continue</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <Button
              key={profile.id}
              onClick={() => selectProfile(profile.id)}
              variant="outline"
              className="flex flex-col items-center justify-center h-40 p-6 hover:bg-accent/20 transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-50 flex items-center justify-center text-4xl mb-3 animate-pulse-gentle">
                {profile.avatar}
              </div>
              <span className="text-lg font-medium">{profile.name}</span>
            </Button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            variant="ghost" 
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            Back to Login <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;
