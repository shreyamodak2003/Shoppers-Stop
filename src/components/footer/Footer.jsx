import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <>
      <hr />

      <footer>
        <div className="footer-logo">
          <img src={logo} alt="logo" />
          <h1> Shoppers Stop!</h1>
        </div>
        <div className="footer-info-one">
        <h3>About Us</h3>
            <ul>
                <li>Our Story</li>
                <li>Mission & Vision</li>
                <li>Meet the Team</li>
                <li>Contact Us</li>
            </ul>
        </div>
        <div className="footer-info-two">
        <h3>Our Services</h3>
            <ul>
                <li>Product Catalog</li>
                <li>Order Tracking</li>
                <li>Returns & Exchanges</li>
                <li>Customer Support</li>
            </ul>
           
        </div>
        <div className="footer-contact">
          <i class="bi bi-facebook"></i>
          <i class="bi bi-instagram"></i>
          <i class="bi bi-twitter-x"></i>
        </div>
      </footer>
      <hr />
      <p style={{ textAlign: "center" }}>
        Designed & developed by <b> Shreya </b> &copy; 2024
      </p>
    </>
  );
}