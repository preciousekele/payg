import React from "react";
import { Copy, Check, ArrowLeft } from "lucide-react";
import "./Transfer.css";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const [copiedField, setCopiedField] = React.useState(null);
  const [transferAmount, setTransferAmount] = React.useState("");
  const [hasConfirmedTransfer, setHasConfirmedTransfer] = React.useState(false);

  const navigate = useNavigate();

  const bankDetails = {
    accountNumber: "00000988",
    accountName: "Joshua Edeh",
    bankName: "Providus"
  };

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleTransferConfirmation = () => {
    setHasConfirmedTransfer(true);
    // Add your logic here for what happens after transfer confirmation
  };

  return (
    <div className="transfer-payment-container">
      <button className="back-button" onClick={() => navigate("/PayG/userdashboard/home")}>
        <ArrowLeft /> Transfer Payment
      </button>

      <p className="instructions">
        Send money to this account details below:
      </p>

      {/* Amount Form */}
      <div className="amount-form-container">
        <div className="amount-form">
          <label className="amount-label">
            Please proceed to transfer the <span className="exact-amount">exact amount</span> below:
          </label>
          <div className="amount-input-container">
            <span className="amount-label-small">Amount</span>
            <div className="amount-display">
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Enter amount"
                className="amount-input"
              />
              <span className="currency">NGN</span>
              <button
                onClick={() => handleCopy("amount", transferAmount)}
                className="copy-button"
              >
                {copiedField === "amount" ? (
                  <Check size={16} color="green" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bank-details-container">
        <div className="bank-detail-item">
          <span className="detail-label">Account number</span>
          <div className="detail-value-container">
            <span className="detail-value">{bankDetails.accountNumber}</span>
            <button
              onClick={() => handleCopy("accountNumber", bankDetails.accountNumber)}
              className="copy-button"
            >
              {copiedField === "accountNumber" ? (
                <Check size={16} color="green" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>

        <div className="bank-detail-item">
          <span className="detail-label">Account name</span>
          <div className="detail-value-container">
            <span className="detail-value">{bankDetails.accountName}</span>
            <button
              onClick={() => handleCopy("accountName", bankDetails.accountName)}
              className="copy-button"
            >
              {copiedField === "accountName" ? (
                <Check size={16} color="green" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>

        <div className="bank-detail-item">
          <span className="detail-label">Bank</span>
          <div className="detail-value-container">
            <span className="detail-value">{bankDetails.bankName}</span>
            <button
              onClick={() => handleCopy("bankName", bankDetails.bankName)}
              className="copy-button"
            >
              {copiedField === "bankName" ? (
                <Check size={16} color="green" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expiry Notice and Confirmation */}
      <div className="transfer-notice-container">
        <p className="refund-notice">
          <span className="note-label">Note:</span> A wrong transfer may take up to 72hrs to be refunded.
        </p>
        
        <button 
          className="confirm-transfer-button"
          onClick={handleTransferConfirmation}
        >
          I have made the transfer
        </button>
      </div>
    </div>
  );
};

export default Transfer;