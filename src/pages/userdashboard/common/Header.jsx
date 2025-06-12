import  { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isUserDashboard = location.pathname.includes('/userdashboard');
  const [initials, setInitials] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const firstInitial = user.firstName?.[0] || "";
        const lastInitial = user.lastName?.[0] || "";
        const combined = `${firstInitial}${lastInitial}`.toUpperCase();
        setInitials(combined);
      } catch (error) {
        console.error("Failed to parse user info:", error);
      }
    }
  }, []);

  const handleViewPackage = () => {
    navigate("/userdashboard/insurancepackages");
  };

  return (
      <header className={`header ${isUserDashboard ? 'header-dashboard' : ''}`}>
      <button className="switch-btn" onClick={handleViewPackage}>
        View Packages
      </button>
      <div className="user-avatar">
        {initials || "??"}
      </div>
    </header>
  );
};

export default Header;