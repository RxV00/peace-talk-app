
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface Profile {
  id: string;
  name: string;
  avatar: string;
}

interface Couple {
  id: string;
  profiles: Profile[];
  activeProfileId: string | null;
  points: number;
  createdAt: string;
}

interface CoupleContextType {
  couple: Couple | null;
  loading: boolean;
  error: string | null;
  setActiveProfile: (profileId: string) => void;
  createCouple: (profile1: Omit<Profile, "id">, profile2: Omit<Profile, "id">) => void;
  updatePoints: (points: number) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const defaultCouple: Couple = {
  id: "default",
  profiles: [
    { id: "1", name: "Partner 1", avatar: "avatar1" },
    { id: "2", name: "Partner 2", avatar: "avatar2" },
  ],
  activeProfileId: null,
  points: 0,
  createdAt: new Date().toISOString(),
};

const CoupleContext = createContext<CoupleContextType>({
  couple: null,
  loading: false,
  error: null,
  setActiveProfile: () => {},
  createCouple: () => {},
  updatePoints: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export const useCouple = () => useContext(CoupleContext);

export const CoupleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [couple, setCouple] = useState<Couple | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedCouple = localStorage.getItem("couple");
    if (storedCouple) {
      try {
        setCouple(JSON.parse(storedCouple));
      } catch (e) {
        setError("Failed to load saved data");
      }
    }
    setLoading(false);
  }, []);

  // Save couple data to localStorage whenever it changes
  useEffect(() => {
    if (couple) {
      localStorage.setItem("couple", JSON.stringify(couple));
    }
  }, [couple]);

  const setActiveProfile = (profileId: string) => {
    if (couple) {
      setCouple({
        ...couple,
        activeProfileId: profileId,
      });
    }
  };

  const createCouple = (profile1: Omit<Profile, "id">, profile2: Omit<Profile, "id">) => {
    const newCouple: Couple = {
      id: crypto.randomUUID(),
      profiles: [
        { ...profile1, id: crypto.randomUUID() },
        { ...profile2, id: crypto.randomUUID() },
      ],
      activeProfileId: null,
      points: 0,
      createdAt: new Date().toISOString(),
    };
    setCouple(newCouple);
  };

  const updatePoints = (points: number) => {
    if (couple) {
      setCouple({
        ...couple,
        points: couple.points + points,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("couple");
    setCouple(null);
  };

  return (
    <CoupleContext.Provider
      value={{
        couple,
        loading,
        error,
        setActiveProfile,
        createCouple,
        updatePoints,
        isAuthenticated: !!couple,
        logout,
      }}
    >
      {children}
    </CoupleContext.Provider>
  );
};
