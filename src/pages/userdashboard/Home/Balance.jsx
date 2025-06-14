import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import "./Balance.css";

const Balance = () => {
  const [totalPackage, setTotalPackage] = useState(null);
  const [balanceToPay, setBalanceToPay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Get user data from localStorage
        const userEmail = localStorage.getItem('userEmail');
        const userPhoneNumber = localStorage.getItem('userPhoneNumber');
        const authToken = localStorage.getItem('authToken');

        if (!userEmail || !userPhoneNumber) {
          console.log('Missing user data in localStorage:', { userEmail, userPhoneNumber });
          setError("User information not found. Please log in again.");
          setLoading(false);
          return;
        }

        if (!authToken) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        console.log('Fetching package balance for:', { email: userEmail });

        // Fetch package balance
        const packageBalanceRes = await axios.get(`https://paygbackend.onrender.com/api/package-balance?email=${userEmail}`);

        console.log('Package balance response:', packageBalanceRes.data);
        
        // Set both balances from package balance data
        if (packageBalanceRes.data.data) {
          setTotalPackage(packageBalanceRes.data.data.totalPackage);
          setBalanceToPay(packageBalanceRes.data.data.balanceTbPaid);
        } else {
          // This should not happen with the updated backend, but kept as fallback
          setTotalPackage(25000); // Default BASIC package
          setBalanceToPay(25000);
        }
        
      } catch (err) {
        console.error("Failed to fetch balance:", err.response?.data || err.message);
        
        // Handle authentication errors
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Could not load balance");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="balance-card">
      <div className="balance-info">
        <span className="balance-label">Package Amount</span>
        {loading ? (
          <span className="balance-amount">Loading...</span>
        ) : error ? (
          <span className="balance-amount error">{error}</span>
        ) : (
          <span className="balance-amount">₦{totalPackage?.toLocaleString()}.00</span>
        )}
        
        {/* Balance to be paid section */}
        <span className="balance-label balance-to-pay-label">Balance</span>
        {loading ? (
          <span className="balance-amount balance-to-pay-amount">Loading...</span>
        ) : error ? (
          <span className="balance-amount balance-to-pay-amount error">{error}</span>
        ) : (
          <span className="balance-amount balance-to-pay-amount">₦{balanceToPay?.toLocaleString()}.00</span>
        )}
      </div>
    </div>
  );
};

export default Balance;