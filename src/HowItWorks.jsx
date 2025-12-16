import React from "react";
import "./HowIt.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdGroups, MdEventAvailable } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import { IoBarChartSharp } from "react-icons/io5";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const textFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  const textFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.5, staggerChildren: 0.2 },
    },
  };

  return (
    <section className="how-wrapper">
      <div className="how-left">
        <motion.p
          className="section-label"
          variants={textFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          HOW IT WORKS
        </motion.p>

        <motion.h2
          className="how-title"
          variants={textFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Experience Club Growth With <br />
          <span>Every Step You Take</span>
        </motion.h2>

        <motion.p
          className="how-desc"
          variants={textFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          ClubSphere follows a simple but powerful step-by-step process that
          helps clubs grow their community, organize events, onboard members,
          and manage everything smoothly. Whether you're starting a new club or
          joining one, we support you every step of the way.
        </motion.p>

        <motion.button
          className="cta-btn"
          variants={textFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Contact Us <FaArrowRightLong />
        </motion.button>
      </div>

      <div className="how-right">
        <div className="step">
          <div className="icon">
            <MdGroups />
          </div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>01. Create or Join a Club</h3>
            <p>
              Register your account and either create a new club or join an
              existing one within your community.
            </p>
          </motion.div>
        </div>

        <div className="step">
          <div className="icon">
            <RiFilePaper2Line />
          </div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>02. Membership Setup</h3>
            <p>
              Choose membership type (free or paid), complete verification, and
              get access to club tools and activities.
            </p>
          </motion.div>
        </div>

        <div className="step">
          <div className="icon">
            <MdEventAvailable />
          </div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>03. Participate in Events</h3>
            <p>
              Browse upcoming events, register instantly, and enjoy engaging
              activities planned by your club managers.
            </p>
          </motion.div>
        </div>

        <div className="step">
          <div className="icon">
            <IoBarChartSharp />
          </div>
          <motion.div
            variants={textFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>04. Track Your Activity</h3>
            <p>
              Keep track of your event history, payments, and club engagement
              through your personal dashboard.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
