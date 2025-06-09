import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Preloader from "./pages/preloader/Preloader";
import LoginSignup from "./pages/LoginSignUp/LoginSignUp";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import Sidebar from "./pages/userdashboard/common/Sidebar"; 
import Airtime from "./pages/userdashboard/Home/Airtime/Airtime"
import Transfer from "./pages/userdashboard/Home/TransferPayment/Transfer";
import Card from "./pages/userdashboard/Home/Atm/Atm";
import Account from "./pages/userdashboard/account/Account";
import Transaction from "./pages/userdashboard/transaction/Transaction";
import InsurancePackages from "./pages/userdashboard/Home/packages/Packages";
import Investment from "./pages/userdashboard/Home/investment/Investment";
// Dashboard Layout (wraps UserDashboard and nested routes with Sidebar)
const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet /> {/* This renders the nested routes */}
      </div>
    </div>
  );
};

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
          {/* Public routes */}
          <Route path="/PayG/" element={<Home />} />
          <Route path="/PayG/register" element={<LoginSignup />} />

          {/* Dashboard routes - Nested approach */}
          <Route path="/PayG/userdashboard" element={<DashboardLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="home" element={<UserDashboard />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="account" element={<Account />} />
            <Route path="airtime" element={<Airtime />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="card" element={<Card />} />
            <Route path="insurancepackages" element={<InsurancePackages />} />
            <Route path="investment" element={<Investment />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/PayG/" />} />
        </Routes>
      )}
    </>
  );
};

export default App;