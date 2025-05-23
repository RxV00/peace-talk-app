
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { Button } from "./ui/button";
import { toast } from "../hooks/use-toast";
import { motion } from "framer-motion";

const ProfileSelection = () => {
  const navigate = useNavigate();
  const { couple, setActiveProfile, isAuthenticated, logout } = useCouple();

  // Redirect if not authenticated - only check once on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, []);

  // Handle profile selection
  const handleSelectProfile = (profileId: string) => {
    setActiveProfile(profileId);
    toast({
      title: "Profile selected",
      description: "Welcome to your dashboard!",
      variant: "default",
    });
    navigate("/dashboard", { replace: true });
  };

  const handleSignOut = () => {
    logout(); // Use the logout function from context
    navigate("/login", { replace: true });
  };

  // Don't render anything while checking authentication
  if (!couple) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purpleTheme-light to-white">
        <div className="text-center">
          <p className="text-xl text-purpleTheme-dark">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purpleTheme-light to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purpleTheme-dark mb-2">Who's using the app?</h1>
          <p className="text-gray-600">Select your profile to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {couple.profiles.map((profile) => (
            <motion.div
              key={profile.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-purpleTheme-medium/30"
            >
              <button
                onClick={() => handleSelectProfile(profile.id)}
                className="w-full p-6 text-left focus:outline-none"
              >
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-purpleTheme-light mb-4 flex items-center justify-center border-2 border-purpleTheme">
                    <span className="text-4xl">{profile.avatar}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-purpleTheme-dark">{profile.name}</h2>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="text-purpleTheme-dark border-purpleTheme hover:bg-purpleTheme-light"
          >
            Not you? Sign out
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSelection;
