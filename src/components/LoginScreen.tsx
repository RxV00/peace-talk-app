
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "../hooks/use-toast";
import CustomEmojiSelector from "./CustomEmojiSelector";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useCouple();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("👤");

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate login
      // In a real app, we would connect to Firebase Auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedCouple = localStorage.getItem("couple");
      if (storedCouple) {
        // Login success
        toast({ 
          title: "Login successful", 
          description: "Welcome back to Peace Talk",
          variant: "default" 
        });
        
        // Use navigate instead of changing window.location to prevent page refresh
        navigate("/profile");
      } else {
        toast({ 
          title: "Login failed", 
          description: "No account found. Please sign up.",
          variant: "destructive" 
        });
      }
    } catch (error) {
      toast({ 
        title: "Login error", 
        description: "Please check your credentials and try again",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    if (typeof emoji === "string") {
      setSelectedEmoji(emoji);
    } else {
      setSelectedEmoji(emoji.emoji);
    }
    setShowEmojiSelector(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blueTheme-light to-white px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl border border-blueTheme-medium/30">
        <div className="text-center mb-6">
          <div 
            className="mx-auto mb-4 w-16 h-16 rounded-full bg-blueTheme-light flex items-center justify-center text-3xl cursor-pointer border-2 border-blueTheme"
            onClick={() => setShowEmojiSelector(true)}
          >
            {selectedEmoji}
          </div>
          <h1 className="text-3xl font-bold text-blueTheme-dark mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>
        
        {showEmojiSelector ? (
          <div className="mb-6">
            <CustomEmojiSelector 
              onSelectEmoji={handleEmojiSelect}
              selectedEmoji={selectedEmoji}
            />
            <Button 
              className="w-full mt-4 blue-gui-button"
              onClick={() => setShowEmojiSelector(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-blueTheme-dark">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="blue-gui-input w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm font-medium text-blueTheme-dark">
                  Password
                </label>
                <a href="#" className="text-sm text-blueTheme hover:text-blueTheme-hover">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="blue-gui-input w-full"
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full blue-gui-button"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        )}
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blueTheme hover:text-blueTheme-hover">
            Create one now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
