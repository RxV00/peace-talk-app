
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCouple } from "../context/CoupleContext";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useCouple();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationComplete && !loading) {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [animationComplete, isAuthenticated, loading, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blueTheme-light to-white">
      <div className="text-center">
        <div className="mb-6">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
          >
            <path
              d="M50 12.5C29.8 12.5 13.5 28.8 13.5 49C13.5 69.2 29.8 85.5 50 85.5C70.2 85.5 86.5 69.2 86.5 49C86.5 28.8 70.2 12.5 50 12.5Z"
              fill="#1EAEDB"
            />
            <path
              d="M65 35C65 41.6 59.6 47 53 47C46.4 47 41 41.6 41 35C41 28.4 46.4 23 53 23C59.6 23 65 28.4 65 35Z"
              fill="white"
            />
            <path
              d="M35 47C41.6 47 47 52.4 47 59C47 65.6 41.6 71 35 71C28.4 71 23 65.6 23 59C23 52.4 28.4 47 35 47Z"
              fill="white"
            />
            <path
              d="M41 59C41 52.4 46.4 47 53 47C59.6 47 65 52.4 65 59C65 65.6 59.6 71 53 71C46.4 71 41 65.6 41 59Z"
              fill="white"
            />
            <path
              d="M35 35C41.6 35 47 40.4 47 47C47 53.6 41.6 59 35 59C28.4 59 23 53.6 23 47C23 40.4 28.4 35 35 35Z"
              fill="white"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-blueTheme-dark mb-2 animate-fade-in">
          Peace Talk
        </h1>
        <p className="text-blueTheme animate-fade-in">
          Build harmony together
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
