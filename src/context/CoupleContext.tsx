
import React, { createContext, useContext, useState, useEffect } from 'react';

type Profile = {
  id: string;
  name: string;
  avatar: string;
  speakingPoints: number;
  likePoints: number;
};

type Message = {
  id: string;
  profileId: string;
  content: string;
  timestamp: number;
  isApology?: boolean;
  apologyReason?: string;
};

type NewProfileInput = {
  name: string;
  avatar: string;
};

type CoupleContextType = {
  isLoggedIn: boolean;
  currentProfile: Profile | null;
  partnerProfile: Profile | null;
  profiles: Profile[];
  alarmActive: boolean;
  alarmTime: number | null;
  roadOfPeaceActive: boolean;
  currentTurn: string | null;
  messages: Message[];
  maxSteps: number;
  currentStep: number;
  login: (password: string) => boolean;
  selectProfile: (profileId: string) => void;
  triggerAlarm: () => void;
  acknowledgeAlarm: () => void;
  startRoadOfPeace: (steps: number) => void;
  addMessage: (content: string, isApology?: boolean, apologyReason?: string) => void;
  endRoadOfPeace: (resolved: boolean) => void;
  logout: () => void;
  registerCouple: (password: string, profiles: NewProfileInput[]) => boolean;
};

const CoupleContext = createContext<CoupleContextType | undefined>(undefined);

// Password for the demo
const COUPLE_PASSWORD = 'love123';

export const CoupleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmTime, setAlarmTime] = useState<number | null>(null);
  const [roadOfPeaceActive, setRoadOfPeaceActive] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [maxSteps, setMaxSteps] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  const [alarmSender, setAlarmSender] = useState<string | null>(null);
  const [storedPassword, setStoredPassword] = useState(COUPLE_PASSWORD);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('coupleProfiles');
    const savedPassword = localStorage.getItem('couplePassword');
    
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    } else {
      // Default profiles if none are saved
      setProfiles([
        {
          id: 'profile1',
          name: 'Alex',
          avatar: '👨‍🦱',
          speakingPoints: 5,
          likePoints: 1500,
        },
        {
          id: 'profile2',
          name: 'Jordan',
          avatar: '👩‍🦰',
          speakingPoints: 5,
          likePoints: 1500,
        },
      ]);
    }
    
    if (savedPassword) {
      setStoredPassword(savedPassword);
    }
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem('coupleProfiles', JSON.stringify(profiles));
    }
  }, [profiles]);

  // Get the partner profile based on current profile
  const partnerProfile = currentProfile 
    ? profiles.find(p => p.id !== currentProfile.id) || null 
    : null;

  // Handle login
  const login = (password: string) => {
    if (password === storedPassword) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  // Handle couple registration
  const registerCouple = (password: string, newProfiles: NewProfileInput[]) => {
    if (password.length < 6 || newProfiles.length !== 2) {
      return false;
    }

    const formattedProfiles: Profile[] = newProfiles.map((profile, index) => ({
      id: `profile${index + 1}`,
      name: profile.name,
      avatar: profile.avatar,
      speakingPoints: 5,
      likePoints: 1500,
    }));

    setProfiles(formattedProfiles);
    setStoredPassword(password);
    localStorage.setItem('couplePassword', password);
    
    // Auto login after registration
    setIsLoggedIn(true);
    return true;
  };

  // Select a profile after login
  const selectProfile = (profileId: string) => {
    const selectedProfile = profiles.find((p) => p.id === profileId);
    if (selectedProfile) {
      setCurrentProfile(selectedProfile);
      
      // Check if there's an active alarm for this user
      if (alarmActive && alarmSender && alarmSender !== profileId && alarmTime) {
        // Calculate speaking point penalty
        const hoursSinceAlarm = Math.floor((Date.now() - alarmTime) / (1000 * 60 * 60));
        
        if (hoursSinceAlarm > 1) {
          const penalty = -(hoursSinceAlarm - 1);
          
          // Update speaking points
          setProfiles(prevProfiles => 
            prevProfiles.map(p => 
              p.id === profileId 
                ? {...p, speakingPoints: Math.max(0, p.speakingPoints + penalty)}
                : p
            )
          );
        }
      }
    }
  };

  // Trigger alarm
  const triggerAlarm = () => {
    if (currentProfile) {
      setAlarmActive(true);
      setAlarmTime(Date.now());
      setAlarmSender(currentProfile.id);
    }
  };

  // Acknowledge alarm
  const acknowledgeAlarm = () => {
    if (alarmActive && currentProfile && alarmSender !== currentProfile.id) {
      // The alarm recipient has acknowledged
      // Don't reset alarm yet, it gets reset when road of peace starts
    }
  };

  // Start road of peace
  const startRoadOfPeace = (steps: number) => {
    const finalSteps = Math.min(steps, 20);
    setMaxSteps(finalSteps);
    setRoadOfPeaceActive(true);
    setCurrentStep(0);
    setMessages([]);
    
    // Alarm sender goes first
    if (alarmSender) {
      setCurrentTurn(alarmSender);
    } else if (currentProfile) {
      // Fallback if somehow alarm sender is not set
      setCurrentTurn(currentProfile.id);
    }
  };

  // Add message during road of peace
  const addMessage = (content: string, isApology = false, apologyReason = '') => {
    if (!currentProfile || !roadOfPeaceActive || currentTurn !== currentProfile.id) return;

    // Add the message
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      profileId: currentProfile.id,
      content,
      timestamp: Date.now(),
      isApology,
      apologyReason: isApology ? apologyReason : undefined
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setCurrentStep(prev => prev + 1);

    // Check if apology grants like points
    if (isApology && !messages.some(m => m.isApology && m.profileId === currentProfile.id)) {
      // First apology from this user - award points
      setProfiles(prevProfiles => 
        prevProfiles.map(p => 
          p.id === currentProfile.id 
            ? {...p, likePoints: p.likePoints + 1000}
            : p
        )
      );
    }

    // Switch turns
    if (partnerProfile) {
      setCurrentTurn(partnerProfile.id);
    }

    // Check if we've reached the end of the road
    if (currentStep + 1 >= maxSteps) {
      // Restart the road of peace
      setTimeout(() => {
        setCurrentStep(0);
        setMessages([]);
        // Reset turn to the alarm sender
        if (alarmSender) {
          setCurrentTurn(alarmSender);
        }
      }, 1000);
    }
  };

  // End road of peace
  const endRoadOfPeace = (resolved: boolean) => {
    setRoadOfPeaceActive(false);
    setAlarmActive(false);
    setAlarmTime(null);
    setAlarmSender(null);
    
    if (resolved) {
      // Award points to both users for resolving within time limit
      const timeSinceStart = messages.length > 0 
        ? Date.now() - messages[0].timestamp 
        : 0;
        
      if (timeSinceStart <= 30 * 60 * 1000) { // 30 minutes
        setProfiles(prevProfiles => 
          prevProfiles.map(p => ({...p, likePoints: p.likePoints + 500}))
        );
      }
    }
  };

  // Logout
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentProfile(null);
  };

  return (
    <CoupleContext.Provider
      value={{
        isLoggedIn,
        currentProfile,
        partnerProfile,
        profiles,
        alarmActive,
        alarmTime,
        roadOfPeaceActive,
        currentTurn,
        messages,
        maxSteps,
        currentStep,
        login,
        selectProfile,
        triggerAlarm,
        acknowledgeAlarm,
        startRoadOfPeace,
        addMessage,
        endRoadOfPeace,
        logout,
        registerCouple,
      }}
    >
      {children}
    </CoupleContext.Provider>
  );
};

export const useCoupleContext = () => {
  const context = useContext(CoupleContext);
  if (context === undefined) {
    throw new Error('useCoupleContext must be used within a CoupleProvider');
  }
  return context;
};
