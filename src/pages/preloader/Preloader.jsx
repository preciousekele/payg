import React, { useEffect, useState } from "react";
import "./preloader.css";
import Preloaderimg from "./Preloaderimg.png"; 

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!loading) return null;
  
  return (
    <div className="preloader">
      <div className="preloader-content">
        <img src={Preloaderimg} alt="Loading..." className="preloader-image" />
      </div>
    </div>
  );
};

export default Preloader;