
import React from 'react';
import { useCouple } from '../context/CoupleContext';
import { useNavigate } from 'react-router-dom';

const AppContent: React.FC = () => {
  const { isAuthenticated, couple } = useCouple();
  const navigate = useNavigate();
  
  // Handle initial navigation only once
  React.useEffect(() => {
    const handleInitialNavigation = () => {
      if (!isAuthenticated) {
        navigate('/login', { replace: true });
      } else if (!couple?.activeProfileId) {
        navigate('/profile', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    };
    
    handleInitialNavigation();
    // Only run once on mount, no dependencies
  }, []);
  
  // Return empty div as routing is handled by react-router
  return <div></div>;
};

export default AppContent;
