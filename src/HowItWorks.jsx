import React from "react";
import "./HowIt.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import { MdEventAvailable } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";

export default function HowItWorks() {
  return (
    <section className="how-wrapper">
      <div className="how-left">
        <p className="section-label">HOW IT WORKS</p>
        <h2 className="how-title">
          Experience Club Growth With <br />
          <span>Every Step You Take</span>
        </h2>

        <p className="how-desc">
          ClubSphere follows a simple but powerful step-by-step process that helps
          clubs grow their community, organize events, onboard members, and manage
          everything smoothly. Whether you're starting a new club or joining one,
          we support you every step of the way.
        </p>

        <button className="cta-btn">Contact Us <FaArrowRightLong></FaArrowRightLong></button>
      </div>

      <div className="how-right">
        <div className="step">
          <div className="icon"> <MdGroups></MdGroups></div>
          <div>
            <h3>01. Create or Join a Club</h3>
            <p>
              Register your account and either create a new club or join an
              existing one within your community.
            </p>
          </div>
        </div>


        <div className="step">
          <div className="icon"><RiFilePaper2Line></RiFilePaper2Line></div>
          <div>
            <h3>02. Membership Setup</h3>
            <p>
              Choose membership type (free or paid), complete verification, and
              get access to club tools and activities.
            </p>
          </div>
        </div>


        <div className="step">
          <div className="icon"><MdEventAvailable></MdEventAvailable></div>
          <div>
            <h3>03. Participate in Events</h3>
            <p>
              Browse upcoming events, register instantly, and enjoy engaging
              activities planned by your club managers.
            </p>
          </div>
        </div>

        <div className="step">
          <div className="icon"><IoBarChartSharp></IoBarChartSharp></div>
          <div>
            <h3>04. Track Your Activity</h3>
            <p>
              Keep track of your event history, payments, and club engagement
              through your personal dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
