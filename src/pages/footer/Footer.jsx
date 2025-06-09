import "./Footer.css";
import logo from "../images/Logopagy.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <div className="logo-section">
            <div className="logo">
              <span className="logo-text">
                {" "}
                <img src={logo} alt="logo" /> PayG{" "}
              </span>
              <span className="logo-icon"></span>
            </div>
            <div className="contact-email">
              <a href="mailto:contactpayg@gmail.com">contactpayg@gmail.com</a>
            </div>
            {/* <div className="contact-phone">08087878787</div> */}
            <div className="copyright">© 2025 PayG – All rights reserved.</div>
          </div>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Twitter">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="TikTok">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Customers</a>
              </li>
              <li>
                <a href="#">Reviews</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Legal</h3>
            <ul>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Security</h3>
            <ul>
              <li>
                <a href="#">Product Security</a>
              </li>
              <li>
                <a href="#">Trust Center</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
