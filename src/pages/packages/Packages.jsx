import React from "react";
import { Shield, Star, Crown, Check } from "lucide-react";
import "./Packages.css";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const packages = [
    {
      id: "basic",
      name: "Basic",
      icon: Shield,
      color: "bronze",
      price: "25,000",
      period: "/month",
      description: "Essential healthcare coverage for individuals",
      features: [
        "General practitioner visits",
        "Basic diagnostic tests",
        "Emergency care coverage",
      ],
      popular: false,
    },
    {
      id: "standard",
      name: "Standard",
      icon: Star,
      color: "silver",
      price: "50,000",
      period: "/month",
      description: "Comprehensive coverage for families and individuals",
      features: [
        "All Basic plan benefits",
        "Specialist consultations",
        "Advanced diagnostic imaging",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      icon: Crown,
      color: "gold",
      price: "100,000",
      period: "/month",
      description: "Premium healthcare with exclusive benefits",
      features: [
        "All Standard plan benefits",
        "Private hospital rooms",
        "International coverage",
        "Alternative medicine coverage",
      ],
      popular: false,
    },
  ];
  const navigate = useNavigate();

  return (
    <section id="packages" role="packages">
      <div className="packages-container">
        <div className="packages-header">
          <h2>Health Insurance Plans</h2>
          <p>Choose the healthcare coverage that fits your needs and budget</p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <div
                key={pkg.id}
                className={`package-card ${pkg.color} ${
                  pkg.popular ? "popular" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}

                <div className="package-header">
                  <div className={`package-icon ${pkg.color}`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="package-name">{pkg.name}</h3>
                  <p className="package-description">{pkg.description}</p>
                </div>

                <div className="package-pricing">
                  <span className="price">{pkg.price}</span>
                  <span className="period">{pkg.period}</span>
                </div>

                <div className="package-features">
                  <ul>
                    {pkg.features.map((feature, index) => (
                      <li key={index}>
                        <Check size={16} className="check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`package-button ${pkg.color}`}
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Packages;
