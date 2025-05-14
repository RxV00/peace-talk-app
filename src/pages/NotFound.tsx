
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blueTheme-light to-white">
      <div className="text-center bg-white rounded-xl p-8 shadow-xl border border-blueTheme-medium/30">
        <h1 className="text-4xl font-bold mb-4 text-blueTheme-dark">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <a href="/" className="blue-gui-button px-4 py-2 rounded-md inline-block">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
