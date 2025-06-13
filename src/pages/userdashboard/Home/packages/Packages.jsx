import { Shield, Star, Crown, Check } from 'lucide-react';
import './InsurancePackages.css';

const InsurancePackages = () => {

  const packages = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Essential healthcare coverage for individuals',
      price: '25,000',
      icon: Shield,
      features: [
        'General practitioner visits',
        'Basic diagnostic tests',
        'Emergency care coverage'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Comprehensive coverage for families and individuals',
      price: '50,000',
      icon: Star,
      isPopular: true,
      features: [
        'All Basic plan benefits',
        'Specialist consultations',
        'Advanced diagnostic imaging'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Premium healthcare with exclusive benefits',
      price: '100,000',
      icon: Crown,
      features: [
        'All Standard plan benefits',
        'Private hospital rooms',
        'International coverage',
        'Alternative medicine coverage'
      ]
    }
  ];

  return (
    <div className="packages-container">
      {/* Main Content */}
      <div className="packages-main">
        {/* Title Section */}
        <div className="packages-title-section">
          <h1 className="packages-main-title">
            PayG Insurance Packages
          </h1>
          <p className="packages-subtitle">Want to upgrade your plan?</p>
          <p className="packages-description">
            Choose the healthcare coverage that fits your needs and budget
          </p>
        </div>

        {/* Package Cards */}
        <div className="packages-grid">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <div key={pkg.id} className={`package-card ${pkg.id}`}>
                
                <div className="package-icon">
                  <div className={`icon-circle ${pkg.id}`}>
                    <IconComponent />
                  </div>
                </div>
                
                <div className="package-info">
                  <h2 className="package-name">{pkg.name}</h2>
                  <p className="package-desc">{pkg.description}</p>
                  <div className="package-price">
                    <span className="price-amount">{pkg.price}</span>
                    <span className="price-period">/year</span>
                  </div>
                </div>

                <div className="package-features">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <Check className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {pkg.id !== 'premium' && (
                  <button className={`package-button ${pkg.id}`}>
                    UPGRADE PLAN
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InsurancePackages;