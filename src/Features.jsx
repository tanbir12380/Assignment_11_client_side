import React from "react";
import "./Features.css";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function Features() {


  const navigate = useNavigate();

  return (
    <section className="features-wrapper">
      {/* LEFT SIDE WITH BACKGROUND */}
      <div className="features-left">
    <div>
          <p className="label">OUR FEATURES</p>
        <h2 className="title">
          Empowering Clubs On And Off The Platform
        </h2>

        <p className="desc">
          ClubSphere is built to support clubs of all kinds — from tech groups and
          fitness clubs to art circles and hobby communities. With tools for
          membership, event management, payments, and growth insights, your club
          can focus on what truly matters: people and passion.
        </p>

        <button onClick={()=>{navigate('/allClubs')}} className="contact-btn">Explore Clubs <FaArrowRightLong></FaArrowRightLong> </button>
    </div>
      </div>

      {/* RIGHT SIDE FEATURE LIST */}
      <div className="features-right">
        <div className="feature-item">
          <div className="feature-icon"><GrGroup /></div>
          <div>
            <h3>Dedicated Club Management</h3>
            <p>
              Manage members, roles, announcements, and internal operations — all
              from one dashboard.
            </p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon"><BsFillCalendar2EventFill></BsFillCalendar2EventFill></div>
          <div>
            <h3>Modern Event & Activity Tools</h3>
            <p>
              Create events, handle registrations, track attendance, and share
              activity updates with ease.
            </p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon"><FaCreditCard></FaCreditCard></div>
          <div>
            <h3>Secure Membership Payments</h3>
            <p>
              Stripe-powered payment system for membership fees, event tickets,
              and premium club perks.
            </p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">📈</div>
          <div>
            <h3>Growth Insights & Analytics</h3>
            <p>
              Track member engagement, event performance, and club growth trends
              through insightful analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
