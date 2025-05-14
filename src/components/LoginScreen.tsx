
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoupleContext } from '../context/CoupleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const LoginScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const { login } = useCoupleContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isSuccessful = login(password);
    
    if (!isSuccessful) {
      setShowError(true);
      toast({
        title: "Login failed",
        description: "The password is incorrect. Please try again.",
        variant: "destructive",
      });
      
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="ios-card max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Couple's Harmony</h1>
          <p className="text-muted-foreground">Sign in to your shared couple account</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex gap-4 text-4xl">
            <span className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center shadow-sm">👨‍🦱</span>
            <div className="flex items-center text-primary">❤️</div>
            <span className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center shadow-sm">👩‍🦰</span>
          </div>
        </div>
      
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input
              className={`ios-input w-full ${showError ? 'border-red-500 bg-red-50' : ''}`}
              type="password"
              placeholder="Enter your couple password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Button 
              type="submit"
              className="ios-button w-full py-6"
            >
              Login Together
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground mb-4">
            Don't have an account yet?{" "}
            <a 
              href="/signup"
              onClick={handleSignup}
              className="text-primary hover:underline"
            >
              Create a couple account
            </a>
          </p>
          
          <p className="text-muted-foreground">
            Hint: Try "love123" as the password for this demo
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
