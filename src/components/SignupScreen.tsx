
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "../hooks/use-toast";
import { motion } from "framer-motion";

const SignupScreen = () => {
  const navigate = useNavigate();
  const { createCouple } = useCouple();
  
  // Form states
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile1Name, setProfile1Name] = useState("");
  const [profile2Name, setProfile2Name] = useState("");
  const [profile1Avatar, setProfile1Avatar] = useState("avatar1");
  const [profile2Avatar, setProfile2Avatar] = useState("avatar2");
  const [loading, setLoading] = useState(false);

  // Handle account creation
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate passwords
      if (password !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match",
          variant: "destructive",
        });
        return;
      }
      
      // Move to next step
      setStep(2);
      return;
    }
    
    // Handle final submission (step 2)
    setLoading(true);
    
    try {
      // In a real app, we would connect to Firebase Auth to create the user account
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create couple profiles
      createCouple(
        { name: profile1Name, avatar: profile1Avatar },
        { name: profile2Name, avatar: profile2Avatar }
      );
      
      toast({
        title: "Account created!",
        description: "Welcome to Peace Talk. Now select your profile.",
        variant: "default",
      });
      
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "There was an error creating your account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-100 to-purple-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">
            {step === 1 ? "Step 1: Account Details" : "Step 2: Profile Setup"}
          </p>
        </div>

        <form onSubmit={handleCreateAccount} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Partner 1</h2>
                <div className="space-y-2">
                  <label htmlFor="profile1Name" className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    id="profile1Name"
                    placeholder="Partner 1 name"
                    value={profile1Name}
                    onChange={(e) => setProfile1Name(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-2 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-purple-200 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Partner 2</h2>
                <div className="space-y-2">
                  <label htmlFor="profile2Name" className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    id="profile2Name"
                    placeholder="Partner 2 name"
                    value={profile2Name}
                    onChange={(e) => setProfile2Name(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-2 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {step === 1
              ? "Continue"
              : loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>

        {step === 1 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-800">
              Sign in
            </Link>
          </div>
        )}
        
        {step === 2 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="font-medium text-purple-600 hover:text-purple-800"
            >
              ← Back to Step 1
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SignupScreen;
