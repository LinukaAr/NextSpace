import React from "react";
import "../assets/css/footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// Footer component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a leading real estate company dedicated to helping you find your dream property.
            </p>
            {/* // Logo */}
            <img src="/images/logo.png" alt="Logo" className="footer-logo" /> 
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>
              Email: info@nextspace.com
              <br />
              Phone: +1 234 567 890
            </p>
            <h5>Branches</h5>
            <p>
              UK
              <br />
              Sri Lanka
              <br />
              New Zealand
            </p>
          </div>
          <div className="col-md-4 links">
            {/* // Social media links */}
            <h5>Follow Us</h5>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={30} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 text-center">
            <p>&copy; 2024 NextSpace. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;