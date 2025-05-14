
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import ProfileSelection from "./components/ProfileSelection";
import Dashboard from "./components/Dashboard";
import RoadOfPeace from "./components/RoadOfPeace";
import NotFound from "./pages/NotFound";
import { CoupleProvider } from "./context/CoupleContext";

function App() {
  return (
    <CoupleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/profile" element={<ProfileSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/road-of-peace" element={<RoadOfPeace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="top-center" richColors />
    </CoupleProvider>
  );
}

export default App;
