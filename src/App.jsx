import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Preloader from "./pages/preloader/Preloader";
import LoginSignup from "./pages/LoginSignUp/LoginSignUp";

const App = () => {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
};

const MainRoutes = () => {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("preloaderShown") !== "true";
    if (isFirstVisit) {
      localStorage.setItem("preloaderShown", "true");
      const timer = setTimeout(() => setShowPreloader(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowPreloader(false);
    }
  }, []);

  const allowedPaths = ["/", "/PayG/register", "/login"];
  const isInitialLoad =
    allowedPaths.includes(location.pathname) && showPreloader;

  return (
    <>
      {isInitialLoad ? (
        <Preloader />
      ) : (
        <Routes location={location}>
          <Route path="/PayG/" element={<Home />} />
          <Route path="/PayG/register" element={<LoginSignup />} />
          <Route path="*" element={<Navigate to="/PayG/" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
