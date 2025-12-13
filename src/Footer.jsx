import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <section className="subscribe">
          <h2>Join for ClubSphere Updates, News & Events!</h2>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>
              <NavLink to="/login">Join us</NavLink>
            </button>
          </div>
        </section>

        <div className="footer-content">
          <div className="footer-col footer-col-brand brand">
            <h3 className="brand-title">ClubSphere</h3>
            <p>
              Connecting communities through clubs, passions, and shared
              experiences. Manage memberships, explore local clubs, join events,
              and stay engaged — all in one place.
            </p>

            <h4 className="social-title">Follow US ON : </h4>

            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXLine />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Explore Clubs</li>
              <li>Events</li>
              <li>Membership Plans</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Platform Features</h4>
            <ul>
              <li>Club Management Dashboard</li>
              <li>Member Registration System</li>
              <li>Event Scheduling & Booking</li>
              <li>Stripe-Based Payments</li>
              <li>Admin Monitoring Tools</li>
            </ul>
          </div>

          <div className="footer-col contact">
            <h4>Contact Info</h4>
            <p>
              <a>
                <MdPhone />
              </a>{" "}
              Dhaka, Bangladesh
            </p>
            <p>
              <a>
                <MdEmail />
              </a>{" "}
              support@clubsphere.com
            </p>
            <p>
              <a>
                {" "}
                <MdLocationOn />
              </a>{" "}
              +880 - 123 456 789
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © {new Date().getFullYear()} ClubSphere. All Rights
            Reserved.
          </p>
          <div className="bottom-links">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
