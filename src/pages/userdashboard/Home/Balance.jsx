import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import "./Balance.css";

const Balance = () => {
  const [totalAmount, setTotalAmount] = useState(null);
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

        console.log('Fetching balance for:', { email: userEmail, phoneNumber: userPhoneNumber });

        const res = await axios.get(
          `http://localhost:8080/api/total-balance?email=${userEmail}&phoneNumber=${userPhoneNumber}`
        );

        console.log('Balance response:', res.data);
        setTotalAmount(res.data.totalAmount);
        
      } catch (err) {
        console.error("Failed to fetch balance:", err.response?.data || err.message);
        
        // Handle authentication errors
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          // Optionally redirect to login or clear localStorage
          // localStorage.clear();
          // window.location.href = '/login';
        } else {
          setError("Could not load balance");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []); // Empty dependency array since we're getting data from localStorage

  return (
    <div className="balance-card">
      <div className="balance-info">
        <span className="balance-label">Balance</span>
        {loading ? (
          <span className="balance-amount">Loading...</span>
        ) : error ? (
          <span className="balance-amount error">{error}</span>
        ) : (
          <span className="balance-amount">₦{totalAmount?.toLocaleString()}.00</span>
        )}
      </div>
      {/* <button className="add-money-btn">
        <Plus size={16} />
        Add Money
      </button> */}
    </div>
  );
};

export default Balance;