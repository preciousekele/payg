import { useState } from "react";
import logo from "./images/Logopagy.png";
import "boxicons";
import "boxicons/css/boxicons.min.css";
import "./home.css";
import Hero from "./hero/Hero";
import About from "./about/About";
import Goals from "./goal/Goal";
import Packages from "./packages/Packages"
import Footer from "./footer/Footer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="home-container">
      {/* Background elements */}
      <div className="bg-wrapper">
        <div className="gradient-overlay" />
        <div className="blur-overlay" />
      </div>

      {/* Header */}
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="nav__logo">
            <span className="nav__logo-circle">
              <img src={logo} alt="logo" />
            </span>
            <span className="nav__logo-name">PayG</span>
          </a>

          {/* Desktop Menu */}
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#" className="nav__link active-link">
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">
                  About
                </a>
              </li>
              <li className="nav__item">
                <a href="#packages" className="nav__link">
                  Packages
                </a>
              </li>
              <li className="nav__item">
                {/* <a href="/PayG/register" className="nav__link-button">
                  <i className="bx bx-log-in"></i>
                </a> */}
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Fixed Mobile Menu Button */}
      <div className="nav__toggle nav__toggle--fixed" id="nav-toggle" onClick={toggleMenu}>
        <i className="bx bx-menu"></i>
      </div>

      {/* Mobile Menu - Slides from right */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`} onClick={closeMenu}></div>
      <div className={`mobile-menu-container ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <button className="mobile-menu-close" onClick={closeMenu}>
            <i className="bx bx"></i>
          </button>
        </div>
        <ul className="mobile-nav__list">
          <li className="mobile-nav__item">
            <a href="#home" className="mobile-nav__link" onClick={closeMenu}>
             Home
            </a>
          </li>
          <li className="mobile-nav__item">
            <a href="#about" className="mobile-nav__link" onClick={closeMenu}>
              About
            </a>
          </li>
          <li className="mobile-nav__item">
            <a href="#packages" className="mobile-nav__link" onClick={closeMenu}>
             Packages
            </a>
          </li>
          <li className="mobile-nav__item">
            <a href="/PayG/register" className="mobile-nav__link-button" onClick={closeMenu}>
              Get Started
              <i className="bx bx-log-in"></i> 
            </a>
          </li>
        </ul>
      </div>
      
      <Hero />
      <About />
      <Goals />
      <Packages />
      <Footer />
    </div>
  );
};

export default Header;