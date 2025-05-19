import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'; 

function LoginSignup() {
  const [activeForm, setActiveForm] = useState('login');
  const navigate = useNavigate();

  useEffect(() => {
    const originalStyle = {
      overflow: document.body.style.overflow,
      background: document.body.style.background
    };

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.background = originalStyle.background;
    };
  }, []);

  const login = () => {
    setActiveForm('login');
  };

  const register = () => {
    setActiveForm('register');
  };

  const goToHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-signup-wrapper">
      <nav className="login-signup-nav">
        <div className="login-signup-nav-logo">
          <p onClick={goToHome} style={{ cursor: 'pointer' }}>PAYG</p>
        </div>
        <div className="login-signup-nav-button">
          <button 
            className={`login-signup-btn ${activeForm === 'login' ? 'login-signup-white-btn' : ''}`} 
            onClick={login}
          >
            Sign In
          </button>
          <button 
            className={`login-signup-btn ${activeForm === 'register' ? 'login-signup-white-btn' : ''}`} 
            onClick={register}
          >
            Sign Up
          </button>
        </div>
        <div className="login-signup-nav-menu-btn">
          <i className="bx bx-menu"></i>
        </div>
      </nav>

      {/* form box */}
      <div className="login-signup-form-box">
        {/* login form */}
        <div 
          className="login-signup-login-container" 
          style={{
            left: activeForm === 'login' ? '4px' : '-510px',
            opacity: activeForm === 'login' ? 1 : 0
          }}
        >
          <div className="login-signup-top">
            <header>Login</header>
          </div>
          <div className="login-signup-input-box">
            <input type="text" className="login-signup-input-field" placeholder="Username or Email" />
            <i className="bx bx-user"></i>
          </div>
          <div className="login-signup-input-box">
            <input type="password" className="login-signup-input-field" placeholder="Password" />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="login-signup-input-box">
            <input type="submit" className="login-signup-submit" value="Sign In" />
          </div>
          <div className="login-signup-two-col">
            <div className="login-signup-one">
              <input type="checkbox" id="login-check" />
              <label htmlFor="login-check"> Remember Me</label>
            </div>
            <div className="login-signup-two">
              <label><a href="#">Forgot password?</a></label>
            </div>
          </div>
           <div className="login-signup-top" style={{ marginTop: '40px' }}>
            <span>Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); register()}}>Sign Up</a></span>
            
          </div>
        </div>

        {/* reg form */}
        <div 
          className="login-signup-register-container" 
          style={{
            right: activeForm === 'register' ? '5px' : '-520px',
            opacity: activeForm === 'register' ? 1 : 0
          }}
        >
          <div className="login-signup-top">
            <header>Sign Up</header>
          </div>
          <div className="login-signup-two-forms">
            <div className="login-signup-input-box">
              <input type="text" className="login-signup-input-field" placeholder="Firstname" />
              <i className="bx bx-user"></i>
            </div>
            <div className="login-signup-input-box">
              <input type="text" className="login-signup-input-field" placeholder="Lastname" />
              <i className="bx bx-user"></i>
            </div>
          </div>
          <div className="login-signup-input-box">
            <input type="text" className="login-signup-input-field" placeholder="Email" />
            <i className="bx bx-envelope"></i>
          </div>
          <div className="login-signup-input-box">
            <input type="password" className="login-signup-input-field" placeholder="Password" />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="login-signup-input-box">
            <input type="submit" className="login-signup-submit" value="Register" />
          </div>
          <div className="login-signup-two-col">
            <div className="login-signup-one">
              <input type="checkbox" id="register-check" />
              <label htmlFor="register-check"> Remember Me</label>
            </div>
            
            <div className="login-signup-two">
              <label><a href="#">Terms & conditions</a></label>
            </div>
            
          </div>
          <div className="login-signup-top" style={{ marginTop: '31px' }}>
            <span>Have an account? <a href="#" onClick={(e) => {e.preventDefault(); login()}}>Login</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;