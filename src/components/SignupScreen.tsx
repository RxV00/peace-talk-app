
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoupleContext } from '../context/CoupleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';

const SignupScreen: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [couplePassword, setCouplePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [person1Name, setPerson1Name] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person1Avatar, setPerson1Avatar] = useState('👨‍🦱');
  const [person2Avatar, setPerson2Avatar] = useState('👩‍🦰');
  const { registerCouple } = useCoupleContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const avatarOptions = ['👨‍🦱', '👩‍🦰', '👨‍🦲', '👩‍🦳', '👨‍🦳', '👩‍🦲', '👨', '👩', '🧑', '🧔', '👱‍♂️', '👱‍♀️'];

  const handleNextStep = () => {
    if (!couplePassword || couplePassword.length < 6) {
      toast({
        title: "Invalid password",
        description: "Please enter a password with at least 6 characters",
        variant: "destructive",
      });
      return;
    }
    
    if (couplePassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match",
        variant: "destructive",
      });
      return;
    }

    setStep(2);
  };

  const handleSignup = () => {
    if (!person1Name || !person2Name) {
      toast({
        title: "Names required",
        description: "Please enter names for both people",
        variant: "destructive",
      });
      return;
    }

    const success = registerCouple(couplePassword, [
      { name: person1Name, avatar: person1Avatar },
      { name: person2Name, avatar: person2Avatar }
    ]);

    if (success) {
      toast({
        title: "Account created!",
        description: "Your couple account has been created successfully",
      });
      navigate("/");
    } else {
      toast({
        title: "Signup failed",
        description: "There was a problem creating your account",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="ios-card max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Couple's Harmony</h1>
          <p className="text-muted-foreground">Create your shared couple account</p>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                <span className="text-xl">1</span>
              </div>
              <h2 className="text-xl font-medium">Set your couple password</h2>
              <p className="text-muted-foreground text-sm mt-1">You'll both use this to log in</p>
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  className="ios-input"
                  type="password"
                  placeholder="Create a password"
                  value={couplePassword}
                  onChange={(e) => setCouplePassword(e.target.value)}
                />
              </div>
              <div>
                <Input
                  className="ios-input"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleNextStep}
              className="ios-button w-full py-6"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                <span className="text-xl">2</span>
              </div>
              <h2 className="text-xl font-medium">Set up your profiles</h2>
              <p className="text-muted-foreground text-sm mt-1">Create profiles for both of you</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium">Person 1</label>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                        {person1Avatar}
                      </div>
                      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                        <Button 
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-full w-6 h-6 p-0"
                          onClick={() => {
                            const currentIndex = avatarOptions.indexOf(person1Avatar);
                            const nextIndex = (currentIndex + 1) % avatarOptions.length;
                            setPerson1Avatar(avatarOptions[nextIndex]);
                          }}
                        >
                          <span className="sr-only">Change avatar</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Input
                    className="ios-input"
                    placeholder="Name"
                    value={person1Name}
                    onChange={(e) => setPerson1Name(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">Person 2</label>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                        {person2Avatar}
                      </div>
                      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                        <Button 
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-full w-6 h-6 p-0"
                          onClick={() => {
                            const currentIndex = avatarOptions.indexOf(person2Avatar);
                            const nextIndex = (currentIndex + 1) % avatarOptions.length;
                            setPerson2Avatar(avatarOptions[nextIndex]);
                          }}
                        >
                          <span className="sr-only">Change avatar</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Input 
                    className="ios-input"
                    placeholder="Name"
                    value={person2Name}
                    onChange={(e) => setPerson2Name(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col space-y-4">
              <Button
                onClick={handleSignup}
                className="ios-button w-full py-6"
              >
                Create Couple Account
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full"
              >
                Back
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a 
              href="/"
              className="text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
