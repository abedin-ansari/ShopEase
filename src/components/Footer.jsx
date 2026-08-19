import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ShopEase</h3>
          <p>
            Discover the latest fashion, clothing, shoes and more. Shop your
            favorite products easily at the best prices.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Subscribe</h3>
          <p>Get updates about new products and special offers.</p>

          <div className="footer-subscribe">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 ShopEase. All rights reserved. | Designed by Abedin
      </div>
    </footer>
  );
};

export default Footer;
