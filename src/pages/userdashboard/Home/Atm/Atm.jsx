import  { useState } from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Atm.css';

const Card = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [pin, setPin] = useState('');
  
  const navigate = useNavigate();

  const handleNumberClick = (number) => {
    if (pin.length < 4) {
      setPin(pin + number);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleVerify = () => {
    // Handle PIN verification logic here
    console.log('PIN verified:', pin);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const renderPinDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      dots.push(
        <div key={i} className={`pin-dot ${i < pin.length ? 'filled' : ''}`}></div>
      );
    }
    return dots;
  };

  return (
    <div className="atm-container">
      <button className="back-button" onClick={() => navigate("/userdashboard/home")}>
        <ArrowLeft /> Card Payment
      </button>

      {currentStep === 1 && (
        <>
          {/* Amount Form */}
          <div className="amount-form-container">
            <div className="amount-form">
              <label className="amount-label">
                Please proceed to pay the <span className="exact-amount">exact amount</span> below:
              </label>
              <div className="amount-input-container">
                <span className="amount-label-small">Amount</span>
                <div className="amount-display">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="amount-input"
                  />
                  <span className="currency">NGN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Tab */}
          <div className="payment-tabs">
            <button className="tab active">
              <CreditCard size={16} />
              Card
            </button>
          </div>

          {/* Card Form */}
          <div className="card-form-container">
            <div className="card-input-group">
              <label className="card-label">CARD NUMBER</label>
              <div className="card-input-wrapper">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="0000 0000 0000 0000"
                  className="card-input"
                  maxLength="19"
                />
                <CreditCard className="card-icon" size={20} />
              </div>
            </div>

            <div className="card-row">
              <div className="card-input-group">
                <label className="card-label">CARD EXPIRY DATE</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className="card-input"
                  maxLength="5"
                />
              </div>
              <div className="card-input-group">
                <label className="card-label">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="007"
                  className="card-input"
                  maxLength="3"
                />
              </div>
            </div>

            <button className="pay-button" onClick={handleNextStep}>
              Pay NGN{amount || '100'}
            </button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <div className="pin-container">
            <div className="pin-header">
              <div className="payment-tabs">
                <button className="tab active">
                  <CreditCard size={16} />
                  Card
                </button>
              </div>
            </div>

          <div className="pin-content">
            <h3 className="pin-title">Input Card PIN</h3>
            
            <div className="pin-dots-container">
              {renderPinDots()}
            </div>

            <div className="pin-keypad">
              <div className="keypad-row">
                <button className="keypad-btn" onClick={() => handleNumberClick('4')}>4</button>
                <button className="keypad-btn" onClick={() => handleNumberClick('2')}>2</button>
                <button className="keypad-btn" onClick={() => handleNumberClick('7')}>7</button>
                <button className="keypad-btn" onClick={() => handleNumberClick('6')}>6</button>
                <button className="keypad-btn" onClick={() => handleNumberClick('3')}>3</button>
                <button className="keypad-btn" onClick={() => handleNumberClick('8')}>8</button>
              </div>
              <div className="keypad-row">
                <button className="keypad-btn" onClick={() => handleNumberClick('9')}>9</button>
                <button className="keypad-btn" onClick={() => handleNumberClick('0')}>0</button>
                <button className="keypad-btn" onClick={() => handleNumberClick('5')}>5</button>
                <button className="keypad-btn" onClick={() => handleNumberClick('1')}>1</button>
                <button className="keypad-btn delete-btn" onClick={handleDelete}>Del</button>
                <button className="keypad-btn clear-btn" onClick={handleClear}>Clear</button>
              </div>
            </div>

            <button className="verify-button" onClick={handleVerify}>
              Verify
            </button>

            <button className="go-back-button" onClick={() => setCurrentStep(1)}>
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;