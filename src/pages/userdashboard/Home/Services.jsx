// Services.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, CreditCard, Send, TrendingUp } from "lucide-react";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();

  const serviceItems = [
    { id: "airtime", label: "Airtime", icon: Smartphone, color: "purple" },
    { id: "send-money", label: "Transfer Payment", icon: Send, color: "blue" },
    { id: "card", label: "ATM Card", icon: CreditCard, color: "orange" },
    { id: "investment", label: "Package Status", icon: TrendingUp, color: "teal" },
  ];

  const handleServiceClick = (serviceId) => {
    if (serviceId === "airtime") {
      navigate("/PayG/userdashboard/airtime");
    } else if (serviceId === "send-money") {
      navigate("/PayG/userdashboard/transfer");
    } else if (serviceId === "card") {
      navigate("/PayG/userdashboard/card"); 
    } else if (serviceId === "investment") {
      navigate("/PayG/userdashboard/investment");
    } else {
      console.log(`${serviceId} clicked`);
    }
  };

  return (
    <div className="services-grid">
      {serviceItems.map((service) => {
        const IconComponent = service.icon;
        return (
          <div
            key={service.id}
            className={`service-item ${service.color}`}
            onClick={() => handleServiceClick(service.id)}
          >
            <IconComponent size={24} />
            <span>{service.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Services;