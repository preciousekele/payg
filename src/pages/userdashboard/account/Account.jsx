import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut, 
  Trash2,
  ChevronRight 
} from 'lucide-react';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          firstName: parsedUser.firstName || '',
          lastName: parsedUser.lastName || ''
        });
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  const getInitials = () => {
    const firstInitial = user.firstName?.[0] || '';
    const lastInitial = user.lastName?.[0] || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  const menuItems = [
    {
      id: 'account-settings',
      icon: Building2,
      label: 'Account Settings',
      hasArrow: true,
      color: '#10b981'
    },
    {
      id: 'account-number',
      icon: CreditCard,
      label: 'Registered Number',
      hasArrow: true,
      color: '#8b5cf6'
    },
    {
      id: 'account-statement',
      icon: FileText,
      label: 'Account Statement',
      hasArrow: true,
      color: '#f59e0b'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      hasArrow: true,
      color: '#6b7280'
    },
    {
      id: 'logout',
      icon: LogOut,
      label: 'Logout',
      hasArrow: false,
      color: '#10b981'
    },
    {
      id: 'delete-account',
      icon: Trash2,
      label: 'Delete Account',
      hasArrow: false,
      color: '#ef4444'
    }
  ];

  const handleMenuClick = (itemId) => {
    if (itemId === 'logout') {
      // Clear user data from localStorage
      localStorage.removeItem("user");
      // Navigation will be handled by Link component
      return;
    }
    
    console.log(`Clicked on: ${itemId}`);
    // Add navigation or action logic for other menu items here
  };

  const renderMenuItem = (item) => {
    const IconComponent = item.icon;
    
    const menuContent = (
      <>
        <div className="menu-item-left">
          <div 
            className="menu-icon"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <IconComponent 
              size={20} 
              color={item.color}
            />
          </div>
          <span className="menu-label">{item.label}</span>
        </div>
        {item.hasArrow && (
          <ChevronRight 
            size={20} 
            className="menu-arrow"
          />
        )}
      </>
    );

    if (item.id === 'logout') {
      return (
        <Link 
          to="/PayG/register" 
          key={item.id}
          className={`menu-item ${item.id === 'delete-account' ? 'danger' : ''}`}
          onClick={() => handleMenuClick(item.id)}
        >
          {menuContent}
        </Link>
      );
    }

    return (
      <div 
        key={item.id}
        className={`menu-item ${item.id === 'delete-account' ? 'danger' : ''}`}
        onClick={() => handleMenuClick(item.id)}
      >
        {menuContent}
      </div>
    );
  };

  return (
    <div className="account-page">
      <div className="account-header">
        <h1>Account</h1>
      </div>

      <div className="welcome-card">
        <div className="welcome-content">
          <div className="user-avatar">
            <span>{getInitials()}</span>
          </div>
          <div className="welcome-text">
            <p className="welcome-label">Welcome</p>
            <h2 className="user-name">{fullName || 'Guest User'}</h2>
          </div>
        </div>
        <button className="profile-button">
          Profile
        </button>
      </div>

      <div className="menu-list">
        {menuItems.map(renderMenuItem)}
      </div>
    </div>
  );
};

export default Account;