
import React from 'react';
import { useCoupleContext } from '../context/CoupleContext';
import LoginScreen from './LoginScreen';
import ProfileSelection from './ProfileSelection';
import Dashboard from './Dashboard';

const AppContent: React.FC = () => {
  const { isLoggedIn, currentProfile } = useCoupleContext();
  
  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <LoginScreen />;
  }
  
  // Show profile selection if logged in but no profile selected
  if (!currentProfile) {
    return <ProfileSelection />;
  }
  
  // Show dashboard if logged in and profile selected
  return <Dashboard />;
};

export default AppContent;
