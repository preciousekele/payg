import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./Airtime.css";
import { useNavigate } from "react-router-dom";

const Airtime = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [keyword, setKeyword] = useState("PayG");
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  // Network providers data
  const networks = [
    { id: "mtn", name: "MTN", color: "#FFCC00", bgColor: "#FFF8E1" },
    { id: "airtel", name: "AIRTEL", color: "#FF0000", bgColor: "#FFEBEE" },
    { id: "9mobile", name: "9MOBILE", color: "#00A86B", bgColor: "#E8F5E8" },
    { id: "glo", name: "GLO", color: "#4CAF50", bgColor: "#E8F5E8" },
  ];

  // Predefined amounts
  const amounts = [
    "₦50.00",
    "₦100.00",
    "₦200.00",
    "₦500.00",
    "₦1,000.00",
    "₦2,000.00",
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    const numericAmount = amount.replace(/[₦,]/g, "");
    setCustomAmount(numericAmount);
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount("");
  };

  const handlePay = () => {
    if (selectedNetwork && (selectedAmount || customAmount) && phoneNumber) {
      setShowModal(true);
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    setShowModal(false);

    try {
      // Get token from localStorage (adjust based on your auth implementation)
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const amount = parseFloat(
        customAmount || selectedAmount.replace(/[₦,]/g, "")
      );

      const requestBody = {
        telecom: selectedNetwork.toUpperCase(),
        phoneNumber: phoneNumber.trim(),
        amount: amount,
        keyword: keyword,
      };

      console.log("Sending request:", requestBody);

      // Use the correct server port (8080) and API path
      const getApiUrl = () => {
        const baseUrl = "https://paygbackend.onrender.com";
        return `${baseUrl}/api/airtime/subscribe`;
      };

      const apiUrl = getApiUrl();
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Handle different response types
      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If it's not JSON, get the text response for debugging
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);

        // Check if it's an HTML error page or redirect
        if (
          textResponse.includes("<!DOCTYPE html>") ||
          textResponse.includes("<html>")
        ) {
          throw new Error(
            "Server returned HTML page instead of API response. Check if the API endpoint is correct."
          );
        } else {
          throw new Error(`Server returned: ${textResponse}`);
        }
      }

      console.log("Response data:", data);

      if (response.ok) {
        // Transaction successful
        setTimeout(() => {
          setIsProcessing(false);
          console.log("Transaction successful:", data);
          // Reset form
          setSelectedNetwork("");
          setSelectedAmount("");
          setPhoneNumber("");
          setCustomAmount("");
          setKeyword("PayG");
        }, 3000);
      } else {
        // Handle API error responses
        setTimeout(() => {
          setIsProcessing(false);
          const errorMessage =
            data?.message ||
            data?.error ||
            "Transaction failed. Please try again.";
          console.error("Transaction failed:", errorMessage);
        }, 3000);
      }
    } catch (error) {
      console.error("Error processing transaction:", error);
      setTimeout(() => {
        setIsProcessing(false);

        // Log more specific error messages
        let errorMessage = "An error occurred. Please try again.";

        if (error.message.includes("Failed to fetch")) {
          errorMessage =
            "Unable to connect to server. Please check your internet connection.";
        } else if (error.message.includes("Authentication token not found")) {
          errorMessage = "Please log in again to continue.";
        } else if (error.message.includes("HTML page")) {
          errorMessage = "Server configuration error. Please contact support.";
        } else {
          errorMessage = error.message;
        }

        console.error("Final error:", errorMessage);
      }, 3000);
    }
  };

  const getSelectedAmountValue = () => {
    return customAmount ? `₦${customAmount}.00` : selectedAmount;
  };

  const getAmountNumeric = () => {
    const amount = customAmount || selectedAmount.replace(/[₦,]/g, "");
    return parseFloat(amount) || 0;
  };

  return (
    <div className="airtime-container">
      <div className="airtime-header">
        <button
          className="back-button"
          onClick={() => navigate("/userdashboard/home")}
        >
          <ArrowLeft size={20} />
        </button>
        <h2>Airtime</h2>
      </div>

      <div className="airtime-content">
        {/* Network Selection */}
        <div className="network-selection">
          {networks.map((network) => (
            <button
              key={network.id}
              className={`network-button ${
                selectedNetwork === network.id ? "selected" : ""
              }`}
              onClick={() => setSelectedNetwork(network.id)}
            >
              <div
                className="network-icon"
                style={{ backgroundColor: network.color }}
              >
                {network.name.charAt(0)}
              </div>
              <span className="network-name">{network.name}</span>
              {selectedNetwork === network.id && (
                <div className="network-tick">✓</div>
              )}
            </button>
          ))}
        </div>

        {/* Amount Selection */}
        <div className="amount-section">
          <h3>Choose Amount</h3>
          <div className="amount-grid">
            {amounts.map((amount) => (
              <button
                key={amount}
                className={`amount-button ${
                  selectedAmount === amount ? "selected" : ""
                }`}
                onClick={() => handleAmountSelect(amount)}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="input-section phone-input-section">
          <label className="input-label">Phone Number</label>
          <input
            type="tel"
            placeholder="08022018787"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="phone-input"
          />
        </div>

        {/* Custom Amount Input */}
        <div className="input-section amount-input-section">
          <label className="input-label">Amount</label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">₦</span>
            <input
              type="number"
              placeholder="100"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="amount-input"
            />
          </div>
        </div>

        {/* Keyword Input */}
        <div className="input-section keyword-input-section">
          <label className="input-label">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="keyword-input"
          />
        </div>

        {/* Pay Button */}
        <button
          className="pay-button"
          onClick={handlePay}
          disabled={
            !selectedNetwork ||
            (!selectedAmount && !customAmount) ||
            !phoneNumber ||
            isProcessing
          }
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </div>

      {/* Processing Message */}
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-message">
            <div className="processing-spinner"></div>
            <p className="processing-text">
              Transaction processing, confirming...
            </p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="confirm-row">
                <span className="confirm-label">Purchase Method</span>
                <span className="confirm-value">Airtime</span>
              </div>

              <div className="confirm-row">
                <span className="confirm-label">Network</span>
                <span className="confirm-value">
                  {selectedNetwork.toUpperCase()}
                </span>
              </div>

              <div className="confirm-row">
                <span className="confirm-label">Phone</span>
                <span className="confirm-value">{phoneNumber}</span>
              </div>

              <div className="confirm-row">
                <span className="confirm-label">Amount</span>
                <span className="confirm-value">
                  {getSelectedAmountValue()}
                </span>
              </div>

              <div className="confirm-row">
                <span className="confirm-label">Keyword</span>
                <span className="confirm-value">{keyword}</span>
              </div>

              <div className="confirm-row">
                <span className="confirm-label">Transaction fee</span>
                <span className="confirm-value">₦0.00</span>
              </div>

              <div className="confirm-row total-row">
                <span className="confirm-label">Total</span>
                <span className="confirm-value">
                  {getSelectedAmountValue()}
                </span>
              </div>

              <div className="account-info">
                <div className="account-row">
                  <span className="account-label">Into</span>
                  <div className="account-details">
                    <span className="account-type">Personal Accnt.</span>
                    <span className="account-balance">
                      ₦{getAmountNumeric().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="confirm-button"
              onClick={handleConfirm}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Airtime;
