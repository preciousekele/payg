import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, LogOut, ReceiptText, User } from "lucide-react";
import "./Sidebar.css";
import logo from "../../images/Logopagy.png";

const SIDEBAR_ITEMS = [
  { name: "Home", icon: Home, color: "#6366f1", href: "home" },
  { name: "Transactions", icon: ReceiptText, color: "#8B5CF6", href: "transaction" },
  { name: "Account", icon: User, color: "#3B82F6", href: "account" },
];

const Sidebar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sidebarVariants = {
    desktop: { width: 256 },
    mobile: { width: "100%" }
  };

  return (
    <motion.div 
      className="sidebar-container" 
      animate={isMobile ? "mobile" : "desktop"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="sidebar-content">
        {/* Logo - Hidden on mobile */}
        <div className="logo">
          <span className="logo-text">
            <img src={logo} alt="logo" />
            PayG
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="nav-menu">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={location.pathname.includes(item.href) ? "active-nav-item" : ""}
            >
              <motion.div 
                className="nav-item" 
                whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="nav-icon" size={isMobile ? 24 : 20} />
                <span className="item-name">{item.name}</span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="logout-section">
          <Link to="/register">
            <motion.div 
              className="logout-item" 
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="logout-icon" size={isMobile ? 24 : 20} />
              <span className="logout-text">Logout</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;