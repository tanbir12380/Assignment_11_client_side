import React from "react";
import "./Features.css";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { FaArrowRightLong, FaCreditCard } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function Features() {
  const navigate = useNavigate();

  const textFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  const textFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 , staggerChildren: 0.2 } },
  };

  return (
    <section className="features-wrapper">
      {/* LEFT SIDE WITH BACKGROUND */}
      <div className="features-left">
        <div>
          <motion.p
            className="label"
            variants={textFromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            OUR FEATURES
          </motion.p>

          <motion.h2
            className="title"
            variants={textFromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Empowering Clubs On And Off The Platform
          </motion.h2>

          <motion.p
            className="desc"
            variants={textFromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            ClubSphere is built to support clubs of all kinds — from tech groups and
            fitness clubs to art circles and hobby communities. With tools for
            membership, event management, payments, and growth insights, your club
            can focus on what truly matters: people and passion.
          </motion.p>

          <motion.button
            onClick={() => navigate("/allClubs")}
            className="contact-btn"
            variants={textFromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Explore Clubs <FaArrowRightLong />
          </motion.button>
        </div>
      </div>

      {/* RIGHT SIDE FEATURE LIST */}
      <div className="features-right">
        <div className="feature-item">
          <div className="feature-icon">
            <GrGroup />
          </div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>Dedicated Club Management</h3>
            <p>
              Manage members, roles, announcements, and internal operations — all
              from one dashboard.
            </p>
          </motion.div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <BsFillCalendar2EventFill />
          </div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>Modern Event & Activity Tools</h3>
            <p>
              Create events, handle registrations, track attendance, and share
              activity updates with ease.
            </p>
          </motion.div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <FaCreditCard />
          </div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>Secure Membership Payments</h3>
            <p>
              Stripe-powered payment system for membership fees, event tickets,
              and premium club perks.
            </p>
          </motion.div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">📈</div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>Growth Insights & Analytics</h3>
            <p>
              Track member engagement, event performance, and club growth trends
              through insightful analytics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
