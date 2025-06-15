import React, { useState, useEffect } from 'react';
import { Smartphone, CreditCard, Send } from 'lucide-react';
import Receipt from './Receipt';
import './Transaction.css';

const Transaction = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch airtime purchase history from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token'); 
        
        const response = await fetch('https://paygbackend.onrender.com/api/airtime/airtime-history', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transaction history');
        }

        const data = await response.json();
        
        // Transform the backend data to match the frontend structure
        const transformedTransactions = data.data.map((transaction, index) => ({
          id: index + 1, 
          type: 'airtime', 
          title: 'Airtime Payment',
          date: formatDate(transaction.createdAt),
          amount: `₦${transaction.amountDeducted.toFixed(2)}`,
          status: transaction.status === 'pending' ? 'Pending' : 
                  transaction.status === 'completed' ? 'Success' : 'Failed',
          // Additional fields for receipt
          phoneNumber: transaction.phoneNumber,
          network: transaction.network,
          keyword: transaction.keyword,
          createdAt: transaction.createdAt,
          amountDeducted: transaction.amountDeducted,
          // Include percentage data from backend
          percentage: transaction.percentage,
          percentageAmount: transaction.percentageAmount
        }));

        setTransactions(transformedTransactions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, []);

  // Format date to match the required format: "Jan 11th, 2024 16:42PM"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Add ordinal suffix to day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
    
    // Format time
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${month} ${dayWithSuffix}, ${year} ${hours}:${minutes}${ampm}`;
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'airtime':
        return (
          <div className="transaction-icon airtime-icon">
            <Smartphone size={20} />
          </div>
        );
      case 'transfer':
        return (
          <div className="transaction-icon transfer-icon">
            <Send size={20} />
          </div>
        );
      case 'card':
        return (
          <div className="transaction-icon card">
            <CreditCard size={20} />
          </div>
        );
      default:
        return (
          <div className="transaction-icon card-icon">
            <CreditCard size={20} />
          </div>
        );
    }
  };

  const handleTransactionClick = (transaction) => {
    // Debug log to see the transaction data being passed
    console.log('Transaction clicked:', transaction);
    setSelectedTransaction(transaction);
    setShowReceipt(true);
  };

  const handleBackToTransactions = () => {
    setShowReceipt(false);
    setSelectedTransaction(null);
  };

  // Close modal when clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleBackToTransactions();
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.network?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="transaction-page">
        <div className="transaction-header">
          <h1>Transactions</h1>
        </div>
        <div className="loading-container">
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="transaction-page">
        <div className="transaction-header">
          <h1>Transactions</h1>
        </div>
        <div className="error-container">
          <p>Error loading transactions: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-page">
      <div className="transaction-header">
        <h1>Transactions</h1>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
          </svg>
          <input
            type="text"
            placeholder="Search by transaction, phone number, or network"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="filter-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <div className="no-transactions">
            <p>No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="transaction-item"
              onClick={() => handleTransactionClick(transaction)}
              style={{ cursor: 'pointer' }}
            >
              {getTransactionIcon(transaction.type)}
              <div className="transaction-details">
                <h3 className="transaction-title">{transaction.title}</h3>
                <p className="transaction-date">{transaction.date}</p>
              </div>
              <div className="transaction-amount-status">
                <span className="transaction-amount">{transaction.amount}</span>

                {/* status to be added */}
                {/* <span className={`transaction-status ${transaction.status.toLowerCase()}`}>
                  {transaction.status}
                </span> */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Receipt 
              transaction={selectedTransaction}
              onBack={handleBackToTransactions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
