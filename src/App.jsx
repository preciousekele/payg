import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

  // Correct path check (Option 2)
  const allowedPaths = ["/", "/register", "/login"];
  const isInitialLoad = allowedPaths.includes(location.pathname) && showPreloader;

  return (
    <>
      {isInitialLoad ? (
        <Preloader />
      ) : (
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<LoginSignup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

export default App;