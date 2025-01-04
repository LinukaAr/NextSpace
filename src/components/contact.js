import React from "react";
import "../assets/css/contact.css";

// Contact component
const Contact = () => {
  return (
    <div className="contact-container">
      <div className="container">
        <h1>Contact Us</h1>
        <div className="row">
          <div className="col-md-6">
            {/* Contact form */}
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" className="form-control" rows="5"></textarea>
              </div>
              <button type="submit" className="btn btn-contact">Send Message</button>
            </form>
          </div>
          <div className="col-md-6">
            <p>
              If you have any questions or need assistance, please feel free to contact us. Our team is here to help you with all your real estate needs.
            </p>
            <div className="contact-details">
              <p>
                <strong>Email:</strong> info@nextspace.com
              </p>
              <p>
                <strong>Phone:</strong> +1 234 567 890
              </p>
              <p>
                <strong>Address:</strong> 123 Real Estate St, Property City, PC 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;