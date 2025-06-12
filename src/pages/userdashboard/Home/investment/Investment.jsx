import React, { useState, useEffect, useCallback } from "react";
import { Shield, Star, Crown, Check, Loader2 } from "lucide-react";
import "./Investment.css";

const Investment = ({ userEmail: propUserEmail }) => {
  const [currentPackage, setCurrentPackage] = useState("basic");
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const userEmail = propUserEmail || 
    // Fallback to other methods if prop not provided
    (typeof window !== 'undefined' && localStorage.getItem('userEmail')) ||
    (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || '{}')?.email);

  const packages = {
    basic: {
      name: "Basic",
      price: "25,000",
      description: "Essential healthcare coverage for individuals",
      icon: Shield,
      color: "orange",
      features: [
        "General practitioner visits",
        "Basic diagnostic tests",
        "Emergency care coverage",
      ],
      backendValue: "BASIC"
    },
    standard: {
      name: "Standard",
      price: "50,000",
      description: "Comprehensive coverage for families and individuals",
      icon: Star,
      color: "gray",
      features: [
        "All Basic plan benefits",
        "Specialist consultations",
        "Advanced diagnostic imaging",
      ],
      backendValue: "STANDARD"
    },
    premium: {
      name: "Premium",
      price: "100,000",
      description: "Premium healthcare with exclusive benefits",
      icon: Crown,
      color: "gold",
      features: [
        "All Standard plan benefits",
        "Private hospital rooms",
        "International coverage",
        "Alternative medicine coverage",
      ],
      backendValue: "PREMIUM"
    },
  };
  
  const mapBackendToFrontend = (backendPackage) => {
    const mapping = {
      "BASIC": "basic",
      "STANDARD": "standard",
      "PREMIUM": "premium"
    };
    return mapping[backendPackage] || "basic";
  };

  // Fetch current user package from backend
  const fetchUserPackage = useCallback(async () => {
    // Check if userEmail is available
    if (!userEmail) {
      setError("User email not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://paygbackend.onrender.com/api/user/package?email=${encodeURIComponent(userEmail)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch package: ${response.statusText}`);
      }
      
      const data = await response.json();
      const frontendPackage = mapBackendToFrontend(data.currentPackage);
      setCurrentPackage(frontendPackage);
    } catch (err) {
      console.error("Error fetching user package:", err);
      setError("Failed to load your current package. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  // Upgrade user package via backend
  const handleUpgrade = async (packageType) => {
    // Check if userEmail is available
    if (!userEmail) {
      setError("User email not found. Please log in again.");
      return;
    }

    try {
      setUpgrading(true);
      setError(null);
      
      const backendPackageValue = packages[packageType].backendValue;
      
      const response = await fetch("https://paygbackend.onrender.com/api/user/upgrade-package", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          newPackage: backendPackageValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to upgrade package: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Update local state
      setCurrentPackage(packageType);
      
      // Show success message for 3 seconds
      const successMsg = `Successfully upgraded to ${packages[packageType].name} package!`;
      setSuccessMessage(successMsg);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
    } catch (err) {
      console.error("Error upgrading package:", err);
      setError(err.message || "Failed to upgrade package. Please try again.");
      alert(`Error: ${err.message || "Failed to upgrade package. Please try again."}`);
    } finally {
      setUpgrading(false);
    }
  };

  // Load user package on component mount
  useEffect(() => {
    if (userEmail) {
      fetchUserPackage();
    } else {
      setError("User email not found. Please log in again.");
      setLoading(false);
    }
  }, [fetchUserPackage, userEmail]);

  const getCurrentPackageData = () => packages[currentPackage];
  const getUpgradeOptions = () => {
    if (currentPackage === "basic") return ["standard", "premium"];
    if (currentPackage === "standard") return ["premium"];
    return [];
  };

  // Show loading state
  if (loading) {
    return (
      <div className="investment-container">
        <div className="investment-header">
          <h2>Your Insurance Package</h2>
          <p>Loading your package information...</p>
        </div>
        <div className="loading-state">
          <Loader2 className="spin" size={32} />
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !loading) {
    return (
      <div className="investment-container">
        <div className="investment-header">
          <h2>Your Insurance Package</h2>
          <p>Manage your healthcare coverage</p>
        </div>
        <div className="error-state">
          <p className="error-message">{error}</p>
          <button onClick={fetchUserPackage} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentPackageData = getCurrentPackageData();
  const upgradeOptions = getUpgradeOptions();
  const IconComponent = currentPackageData.icon;

  return (
    <div className="investment-container">
      <div className="investment-header">
        <h2>Your Insurance Package</h2>
        <p>Manage your healthcare coverage</p>
      </div>

      {/* Current Package Display */}
      <div className={`current-package ${currentPackageData.color}`}>
        <div className="package-icon">
          <IconComponent size={32} />
        </div>
        <div className="package-info">
          <h3>{currentPackageData.name}</h3>
          <p>{currentPackageData.description}</p>
          <div className="package-price">
            <span className="price">₦{currentPackageData.price}</span>
            <span className="period">/month</span>
          </div>
        </div>
        <div className="current-badge">Current Plan</div>
      </div>

      {/* Current Package Features */}
      <div className="package-features">
        <h4>Your Current Benefits</h4>
        <ul>
          {currentPackageData.features.map((feature, index) => (
            <li key={index}>
              <Check size={16} className="check-icon" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-banner">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      {/* Upgrade Options */}
      {upgradeOptions.length > 0 && (
        <div className="upgrade-section">
          <h4>Upgrade Your Plan</h4>
          <div className="upgrade-options">
            {upgradeOptions.map((packageKey) => {
              const packageData = packages[packageKey];
              const UpgradeIcon = packageData.icon;
              
              return (
                <div key={packageKey} className={`upgrade-card ${packageData.color}`}>
                  <div className="upgrade-header">
                    <div className="upgrade-icon">
                      <UpgradeIcon size={24} />
                    </div>
                    <div className="upgrade-info">
                      <h5>{packageData.name}</h5>
                      <p>{packageData.description}</p>
                    </div>
                  </div>
                  
                  <div className="upgrade-price">
                    <span className="price">₦{packageData.price}</span>
                    <span className="period">/month</span>
                  </div>

                  <div className="upgrade-features">
                    {packageData.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <Check size={14} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="upgrade-btn"
                    onClick={() => handleUpgrade(packageKey)}
                    disabled={upgrading}
                  >
                    {upgrading ? (
                      <>
                        <Loader2 className="spin" size={16} />
                        Upgrading...
                      </>
                    ) : (
                      "Upgrade Plan"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {upgradeOptions.length === 0 && (
        <div className="max-plan">
          <h4>You're on our highest plan!</h4>
          <p>You have access to all our premium features and benefits.</p>
        </div>
      )}
    </div>
  );
};

export default Investment;