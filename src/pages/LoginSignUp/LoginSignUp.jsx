import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignUp.css";

function LoginSignup() {
  const [activeForm, setActiveForm] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  // Add loading states
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Add error states
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  
  // Error timeout refs - using useRef instead of useState
  const loginErrorTimeoutRef = useRef(null);
  const registerErrorTimeoutRef = useRef(null);
  
  const navigate = useNavigate();

  // Function to set login error with auto-clear
  const setLoginErrorWithTimeout = (error) => {
    setLoginError(error);
    if (loginErrorTimeoutRef.current) {
      clearTimeout(loginErrorTimeoutRef.current);
    }
    loginErrorTimeoutRef.current = setTimeout(() => {
      setLoginError("");
    }, 5000);
  };

  // Function to set register error with auto-clear
  const setRegisterErrorWithTimeout = (error) => {
    setRegisterError(error);
    if (registerErrorTimeoutRef.current) {
      clearTimeout(registerErrorTimeoutRef.current);
    }
    registerErrorTimeoutRef.current = setTimeout(() => {
      setRegisterError("");
    }, 5000);
  };

  useEffect(() => {
    const originalStyle = {
      overflow: document.body.style.overflow,
      background: document.body.style.background,
    };

    // Cleanup timeouts on unmount
    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.background = originalStyle.background;
      if (loginErrorTimeoutRef.current) {
        clearTimeout(loginErrorTimeoutRef.current);
      }
      if (registerErrorTimeoutRef.current) {
        clearTimeout(registerErrorTimeoutRef.current);
      }
    };
  }, []);

  const login = () => {
    setActiveForm("login");
    setLoginError(""); // Clear login error when switching forms
    setRegisterError(""); // Clear register error when switching forms
    // Clear any existing timeouts
    if (loginErrorTimeoutRef.current) {
      clearTimeout(loginErrorTimeoutRef.current);
    }
    if (registerErrorTimeoutRef.current) {
      clearTimeout(registerErrorTimeoutRef.current);
    }
  };
  
  const register = () => {
    setActiveForm("register");
    setLoginError(""); // Clear login error when switching forms
    setRegisterError(""); // Clear register error when switching forms
    // Clear any existing timeouts
    if (loginErrorTimeoutRef.current) {
      clearTimeout(loginErrorTimeoutRef.current);
    }
    if (registerErrorTimeoutRef.current) {
      clearTimeout(registerErrorTimeoutRef.current);
    }
  };
  
  const goToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(""); // Clear previous errors
    
    // Clear any existing timeout when starting new login attempt
    if (loginErrorTimeoutRef.current) {
      clearTimeout(loginErrorTimeoutRef.current);
    }
    
    try {
      const response = await axios.post(
        "https://paygbackend.onrender.com/api/auth/login",
        loginData
      );

      if (response.data && response.data.token) {
        // Store authentication data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Store individual user data for easy access
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("userPhoneNumber", response.data.user.phoneNumber);
        localStorage.setItem("userId", response.data.user.id);

        console.log("Login successful, user data stored:", response.data.user);

        // Navigate to dashboard
        navigate("/userdashboard");
      } else {
        setLoginErrorWithTimeout("Login failed: Invalid response");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginErrorWithTimeout(
        error.response?.data?.message || error.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setRegisterError(""); // Clear previous errors

    // Clear any existing timeout when starting new registration attempt
    if (registerErrorTimeoutRef.current) {
      clearTimeout(registerErrorTimeoutRef.current);
    }

    const registrationData = {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
      phoneNumber: registerData.phoneNumber,
    };

    console.log("Sending registration data:", registrationData);

    try {
      const response = await axios.post(
        "https://paygbackend.onrender.com/api/auth/register",
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.token) {
        // Store authentication data in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Store individual user data for easy access
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("userPhoneNumber", response.data.user.phoneNumber);
        localStorage.setItem("userId", response.data.user.id);

        console.log("Registration successful, user data stored:", response.data.user);

        // Navigate to dashboard
        navigate("/userdashboard");
      } else {
        setRegisterErrorWithTimeout("Registration failed: Invalid response");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterErrorWithTimeout(
        error.response?.data?.message || error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="login-signup-wrapper">
      <nav className="login-signup-nav">
        <div className="login-signup-nav-logo">
          <p onClick={goToHome} style={{ cursor: "pointer" }}>
            PayG
          </p>
        </div>
        <div className="login-signup-nav-button">
          <button
            className={`login-signup-btn ${
              activeForm === "login" ? "login-signup-white-btn" : ""
            }`}
            onClick={login}
          >
            Sign In
          </button>
          <button
            className={`login-signup-btn ${
              activeForm === "register" ? "login-signup-white-btn" : ""
            }`}
            onClick={register}
          >
            Sign Up
          </button>
        </div>
        <div className="login-signup-nav-menu-btn">
          <i className="bx bx-menu"></i>
        </div>
      </nav>

      <div className="login-signup-form-box">
        {/* LOGIN */}
        <div
          className="login-signup-login-container"
          style={{
            left: activeForm === "login" ? "4px" : "-510px",
            opacity: activeForm === "login" ? 1 : 0,
          }}
        >
          <div className="login-signup-top">
            <header>Login</header>
          </div>
          <form onSubmit={handleLogin}>
            <div className="login-signup-input-box">
              <input
                type="email"
                className="login-signup-input-field"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
                disabled={isLoggingIn}
              />
              <i className="bx bx-user"></i>
            </div>
            <div className="login-signup-input-box">
              <input
                type="password"
                className="login-signup-input-field"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
                disabled={isLoggingIn}
              />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className="login-signup-input-box">
              <input
                type="submit"
                className="login-signup-submit"
                value={isLoggingIn ? "Signing in..." : "Sign In"}
                disabled={isLoggingIn}
              />
            </div>
          </form>
          
          {/* Login Error Message */}
          {loginError && (
            <div className="login-signup-error-message">
              {loginError}
            </div>
          )}
          
          <div className="login-signup-two-col">
            <div className="login-signup-one">
              <input type="checkbox" id="login-check" />
              <label htmlFor="login-check"> Remember Me</label>
            </div>
            <div className="login-signup-two">
              <label>
                <a href="#">Forgot password?</a>
              </label>
            </div>
          </div>
          <div className="login-signup-top" style={{ marginTop: "40px" }}>
            <span>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  register();
                }}
              >
                Sign Up
              </a>
            </span>
          </div>
        </div>

        {/* REGISTER FORM */}
        <div
          className="login-signup-register-container"
          style={{
            right: activeForm === "register" ? "5px" : "-520px",
            opacity: activeForm === "register" ? 1 : 0,
          }}
        >
          <div className="login-signup-top">
            <header>Sign Up</header>
          </div>
          <form onSubmit={handleRegister}>
            <div className="login-signup-two-forms">
              <div className="login-signup-input-box">
                <input
                  type="text"
                  className="login-signup-input-field"
                  placeholder="First Name"
                  value={registerData.firstName}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      firstName: e.target.value,
                    })
                  }
                  required
                  disabled={isRegistering}
                />
                <i className="bx bx-user"></i>
              </div>
              <div className="login-signup-input-box">
                <input
                  type="text"
                  className="login-signup-input-field"
                  placeholder="Last Name"
                  value={registerData.lastName}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      lastName: e.target.value,
                    })
                  }
                  required
                  disabled={isRegistering}
                />
                <i className="bx bx-user"></i>
              </div>
            </div>
            <div className="login-signup-input-box">
              <input
                type="email"
                className="login-signup-input-field"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                required
                disabled={isRegistering}
              />
              <i className="bx bx-envelope"></i>
            </div>
            <div className="login-signup-input-box">
              <input
                type="tel"
                className="login-signup-input-field"
                placeholder="Phone Number"
                value={registerData.phoneNumber}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    phoneNumber: e.target.value,
                  })
                }
                required
                disabled={isRegistering}
              />
              <i className="bx bx-phone"></i>
            </div>
            <div className="login-signup-input-box">
              <input
                type="password"
                className="login-signup-input-field"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                required
                disabled={isRegistering}
              />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className="login-signup-input-box">
              <input
                type="submit"
                className="login-signup-submit"
                value={isRegistering ? "Signing up..." : "Sign Up"}
                disabled={isRegistering}
              />
            </div>
          </form>
          
          {/* Register Error Message */}
          {registerError && (
            <div className="login-signup-error-message">
              {registerError}
            </div>
          )}
          
          <div className="login-signup-two-col">
            <div className="login-signup-one">
              <input type="checkbox" id="register-check" />
              <label htmlFor="register-check"> Remember Me</label>
            </div>
            <div className="login-signup-two">
              <label>
                <a href="#">Terms & conditions</a>
              </label>
            </div>
          </div>
          <div className="login-signup-top" style={{ marginTop: "31px" }}>
            <span>
              Have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Login
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;