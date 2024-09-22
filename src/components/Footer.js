import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AboutUs() {
  return (
    <div className="Footer">
      <div className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h1 className="logo-text"><span>SAMA</span>SKIES</h1>
            <p>A place where you embrace nature and nurture your soul</p>
            <div className="contact">
              <span><i className="fas fa-phone"></i> &nbsp; 013-457-254</span>
              <span><i className="fas fa-envelope"></i> &nbsp; info@samaskies.com</span>
            </div>
            <div className="socials">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-section links">
            <h2>Quick Links</h2>
            <br />
            <ul>
              <a href="#"><li>Events</li></a>
              <a href="#"><li>Team</li></a>
              <a href="#"><li>Mentores</li></a>
              <a href="#"><li>Gallery</li></a>
              <a href="#"><li>Terms and Conditions</li></a>
            </ul>
          </div>

          <div className="footer-section contact-form">
            <h2>Contact us</h2>
            <br />
            <form action="https://formsubmit.co/safaezghari100@gmail.com" method="POST" className="Safae">
              <input type="email" name="email" className="text-input contact-input lp" placeholder="Your email address..." />
              <textarea rows="4" name="message" className="text-input contact-input" placeholder="Your message..."></textarea>
              <button type="submit" className="btn btn-big contact-btn">
                <i className="fas fa-envelope"></i>
                Send
              </button>
            </form>
          </div>
        </div>

        
      </div>
      <div className="footer-bottom">&copy; codingpoets.com | Designed Safae Zgari</div>
    </div>
  );
}

export default AboutUs;
