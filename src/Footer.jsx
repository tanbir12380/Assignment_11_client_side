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
import { NavLink, } from "react-router";
import { AuthContext } from "./AuthContext";
import { motion } from "framer-motion";

const Footer = () => {


  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

    const textFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5,staggerChildren: 0.15 } },
  };

  

  const textFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 , staggerChildren: 0.2 } },
  };

    const textFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 , staggerChildren: 0.2 } },
  };

  return (
    <div>
      <motion.footer
        className="footer"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="subscribe">
          <motion.h2  variants={textFromLeft}
        initial="hidden"
        whileInView="visible" viewport={{ once: true }}>Join for ClubSphere Updates, News & Events!</motion.h2>
          <motion.div variants={textFromRight}
        initial="hidden"
        whileInView="visible" viewport={{ once: true }} className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>
              <NavLink>Join us</NavLink>
            </button>
          </motion.div>
        </div>

        <div className="footer-content"  >
          <motion.div className="footer-col footer-col-brand brand" initial="hidden"
        whileInView="visible" viewport={{ once: true }} variants={textFromBottom}>
            <h3 className="brand-title">ClubSphere</h3>
            <p>
              Connecting communities through clubs, passions, and shared
              experiences. Manage memberships, explore local clubs, join events,
              and stay engaged — all in one place.
            </p>

            <h4 className="social-title">Follow US ON : </h4>

            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><RiTwitterXLine /></a>
            </div>
          </motion.div>

          <motion.div className="footer-col" initial="hidden"
        whileInView="visible" viewport={{ once: true }} variants={textFromBottom}>
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Explore Clubs</li>
              <li>Events</li>
              <li>Membership Plans</li>
              <li>Contact</li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" initial="hidden"
        whileInView="visible" viewport={{ once: true }} variants={textFromBottom}>
            <h4>Platform Features</h4>
            <ul>
              <li>Club Management Dashboard</li>
              <li>Member Registration System</li>
              <li>Event Scheduling & Booking</li>
              <li>Stripe-Based Payments</li>
              <li>Admin Monitoring Tools</li>
            </ul>
          </motion.div>

          <motion.div className="footer-col contact" initial="hidden"
        whileInView="visible" viewport={{ once: true }} variants={textFromBottom}>
            <h4>Contact Info</h4>
            <p><MdLocationOn /> Dhaka, Bangladesh</p>
            <p><MdEmail /> support@clubsphere.com</p>
            <p><MdPhone /> +880 - 123 456 789</p>
          </motion.div>
        </div>

        <motion.div className="footer-bottom" variants={itemVariants}>
          <motion.p variants={textFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}>
            Copyright © {new Date().getFullYear()} ClubSphere. All Rights
            Reserved.
          </motion.p>
          <motion.div variants={textFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} className="bottom-links">
            <span >Terms & Conditions</span>
            <span  >Privacy Policy</span>
          </motion.div>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default Footer;
