
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animation after a short delay
    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 300);

    // Redirect to main app after splash screen is shown
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 2500);

    // Cleanup timers
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 animate-fade-in">
      <div className="text-center">
        <div className={`transition-all duration-700 ${animate ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">👨‍🦱</span>
              </div>
              <div className="text-white text-5xl animate-pulse">❤️</div>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">👩‍🦰</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Couple's Harmony</h1>
          <p className="text-blue-100 text-lg">Grow together through communication</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
