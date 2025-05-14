
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MotionConfig } from 'framer-motion';

// Wrap the App component with MotionConfig to provide the necessary context for framer-motion
createRoot(document.getElementById("root")!).render(
  <MotionConfig reducedMotion="user">
    <App />
  </MotionConfig>
);
