
import React from 'react';
import { useCouple } from '../context/CoupleContext';
import { useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import ProfileSelection from './ProfileSelection';
import Dashboard from './Dashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated, couple } = useCouple();
  const navigate = useNavigate();
  const currentProfile = couple?.activeProfileId ? couple : null;
  
  // Use useEffect to handle navigation
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!currentProfile) {
      navigate('/profile');
    } else {
      navigate('/dashboard');
    }
  }, [isAuthenticated, currentProfile, navigate]);
  
  // Return empty div as routing is handled by react-router
  return <div></div>;
};

export default AppContent;
