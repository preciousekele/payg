import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './Receipt.css';

const Receipt = ({ transaction, onBack }) => {
  if (!transaction) return null;

  // Debug log to see what data we're receiving
  console.log("Receipt transaction data:", transaction);

  // Get service details based on network and transaction data
  const getServiceDetails = (transaction) => {
    const networkName = transaction.network || transaction.telecom || 'Unknown';
    const keyword = transaction.keyword || 'N/A';
    
    return {
      service: 'Airtime',
      description: `Airtime top-up for ${networkName} - ${transaction.phoneNumber}`,
      phone: transaction.phoneNumber,
      network: networkName,
      keyword: keyword
    };
  };

  const serviceDetails = getServiceDetails(transaction);

  // Format the amount to ensure it has proper currency symbol
  const formatAmount = (amount) => {
    if (typeof amount === 'string' && amount.includes('₦')) {
      return amount;
    }
    return `₦${parseFloat(amount || 0).toFixed(2)}`;
  };

  // Get percentage value for display - Fixed logic
  const getPercentageDisplay = () => {
    // Check if percentage exists in transaction data
    let percentageValue = transaction.percentage;
    
    // If percentage is null, undefined, or empty string, return N/A
    if (percentageValue == null || percentageValue === '') {
      return 'N/A';
    }
    
    // Convert to number and check if it's valid
    const numericPercentage = parseFloat(percentageValue);
    if (isNaN(numericPercentage)) {
      return 'N/A';
    }
    
    return `${numericPercentage}%`;
  };

  // Get percentage amount for display - Fixed logic
  const getPercentageAmountDisplay = () => {
    // First check if percentageAmount exists in transaction data
    if (transaction.percentageAmount != null && transaction.percentageAmount !== 0) {
      return formatAmount(transaction.percentageAmount);
    }
    
    // Fallback to calculation if server data not available
    const percentageValue = transaction.percentage;
    let amountValue = transaction.amount;
    
    // Handle amount conversion - remove currency symbols and parse
    if (typeof amountValue === 'string') {
      amountValue = amountValue.replace(/[₦,]/g, '');
    }
    
    // Check if both values exist and are valid
    if (percentageValue == null || percentageValue === '' || amountValue == null) {
      return 'N/A';
    }
    
    const numericPercentage = parseFloat(percentageValue);
    const numericAmount = parseFloat(amountValue);
    
    if (isNaN(numericPercentage) || isNaN(numericAmount) || numericPercentage === 0) {
      return 'N/A';
    }
    
    const calculatedAmount = (numericAmount * numericPercentage) / 100;
    return formatAmount(calculatedAmount);
  };

  // Get clean amount value for calculations
  const getCleanAmount = () => {
    let amount = transaction.amount;
    if (typeof amount === 'string') {
      amount = amount.replace(/[₦,]/g, '');
    }
    return parseFloat(amount || 0);
  };

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Receipt</span>
        </button>
      </div>

      <div className="receipt-content">
        <div className="receipt-amount-section">
          <p className="amount-label">Amount</p>
          <h1 className="receipt-amount">{formatAmount(getCleanAmount())}</h1>
        </div>

        <div className="receipt-details">
          <div className="detail-row">
            <span className="detail-label">Purchase Method</span>
            <span className="detail-value">{serviceDetails.service}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Network</span>
            <span className="detail-value">{serviceDetails.network}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{serviceDetails.phone}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value">{formatAmount(getCleanAmount())}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Percentage</span>
            <span className="detail-value">{getPercentageDisplay()}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Percentage Amount</span>
            <span className="detail-value">{getPercentageAmountDisplay()}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Keyword</span>
            <span className="detail-value">{serviceDetails.keyword}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Transaction fee</span>
            <span className="detail-value">₦0.00</span>
          </div>

          <div className="detail-row total-row">
            <span className="detail-label">Total</span>
            <span className="detail-value">{formatAmount(getCleanAmount())}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Transaction Date</span>
            <span className="detail-value">{transaction.date || new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="account-info">
          <div className="account-row">
            <span className="account-label">Into</span>
            <div className="account-details">
              <span className="account-type">Personal Accnt.</span>
              <span className="account-balance">{formatAmount(getCleanAmount())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;