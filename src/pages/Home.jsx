import logo from './images/Logopagy.png';
import "boxicons";
import "boxicons/css/boxicons.min.css";
import "./home.css";
import Hero from './hero/Hero';

const Header = () => {
  return (
    <div className="home-container">
      {/* Background elements */}
      <div className="bg-wrapper">
        <div className="gradient-overlay" />
        <div className="blur-overlay" />
      </div>

      {/* Your existing content */}
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="nav__logo">
            <span className="nav__logo-circle">
              <img src={logo} alt="logo" />
            </span>
            <span className="nav__logo-name">
            PayG
            </span>
          </a>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link active-link" >
                  Home
                </a>
              </li>
              <li className="nav__item" >
                <a href="#" className="nav__link" >
                  About
                </a>
              </li>
              <li className="nav__item" >
                <a href="#" className="nav__link" >
                  Packages
                </a>
              </li>
              <li className="nav__item" >
                <a
                  href="/register"
                  className="nav__link-button"
                >
                   <i className="bx bx-log-in"></i>
                </a>
              </li>
            </ul>

            <div className="nav__close" id="nav-close">
              <i className="ri-close-line"></i>
            </div>
          </div>
        </nav>
      </header>
      <Hero/>
    </div>
  );
};

export default Header;