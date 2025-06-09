import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './Receipt.css';

const Receipt = ({ transaction, onBack }) => {
  if (!transaction) return null;

  // Generate a reference number based on transaction data
  const generateReference = (transaction) => {
    const year = new Date(transaction.createdAt).getFullYear();
    const month = String(new Date(transaction.createdAt).getMonth() + 1).padStart(2, '0');
    const day = String(new Date(transaction.createdAt).getDate()).padStart(2, '0');
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${year}${month}${day}${transaction.id}${randomSuffix}VKPQVOFM`;
  };

  // Get service details based on network and transaction data
  const getServiceDetails = (transaction) => {
    const networkName = transaction.network || 'Unknown';
    const keyword = transaction.keyword || 'N/A';
    
    return {
      service: 'PayG Insurance',
      description: `Airtime top-up for ${networkName} - ${transaction.phoneNumber}`,
      phone: transaction.phoneNumber,
      network: networkName,
      keyword: keyword
    };
  };

  const serviceDetails = getServiceDetails(transaction);
  const reference = generateReference(transaction);

  // Format the amount to ensure it has proper currency symbol
  const formatAmount = (amount) => {
    if (typeof amount === 'string' && amount.includes('₦')) {
      return amount;
    }
    return `₦${parseFloat(amount || 0).toFixed(2)}`;
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
          <h1 className="receipt-amount">{formatAmount(transaction.amount)}</h1>
        </div>

        <div className="receipt-details">
          <div className="detail-row">
            <span className="detail-label">Service</span>
            <span className="detail-value">{serviceDetails.service}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Telecom</span>
            <span className="detail-value">{serviceDetails.network}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Keyword</span>
            <span className="detail-value">{serviceDetails.keyword}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Description</span>
            <span className="detail-value">{serviceDetails.description}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Phone Number</span>
            <span className="detail-value">{serviceDetails.phone}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Amount Deducted</span>
            <span className="detail-value">{formatAmount(transaction.amountDeducted || transaction.amount)}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Transaction Date</span>
            <span className="detail-value">{transaction.date}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Receipt;