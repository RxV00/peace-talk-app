
import React from 'react';
import { useCouple } from '../context/CoupleContext';
import { useNavigate } from 'react-router-dom';

const AppContent: React.FC = () => {
  const { isAuthenticated, couple } = useCouple();
  const navigate = useNavigate();
  
  // Use useEffect to handle navigation once on component mount
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!couple?.activeProfileId) {
      navigate('/profile');
    } else {
      navigate('/dashboard');
    }
  }, []);
  
  // Return empty div as routing is handled by react-router
  return <div></div>;
};

export default AppContent;
