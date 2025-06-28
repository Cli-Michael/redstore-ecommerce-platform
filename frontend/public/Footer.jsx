import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download Our App</h3>
              <p>Download our mobile app for a better experience.</p>
              <div className="app-logo">
                <img src="/app-store.png" alt="App Store" />
                <img src="/play-store.png" alt="Play Store" />
              </div>
            </div>
            <div className="footer-col-2">
              <img src="images/logo-white.png" alt="Logo" />
              <p>Our mission is to make your shopping experience smoother.</p>
            </div>
            <div className="footer-col-3">
              <h3>Useful Links</h3>
              <ul>
                <li><a href="#">Coupons</a></li>
                <li><a href="#">Blog Post</a></li>
                <li><a href="#">Return Policy</a></li>
                <li><a href="#">Affiliate Program</a></li>
              </ul>
            </div>
            <div className="footer-col-4">
              <h3>Follow Us</h3>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
