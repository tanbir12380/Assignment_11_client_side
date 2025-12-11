import React from 'react';
import './RecentClubs.css'
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const RecentClubs = () => {
  return (
    <div className="latest-clubs-section">

    <p>LATEST CLUBS</p>
    <h3>Discover the <span>Clubs</span> Leading the Way</h3>

  <div className="latest-clubs-container">





          <div className="club-card">
      <div>
        <img src="/banner1.jpg" alt="" />
      </div>

      <div>
        <h4>UI/UX designers club</h4>
                <div className="club-meta">
          <span className="category">Design</span>
          <span className="fee">$10</span>
        </div>
<div className='group-info-middle'>
          <p>4300 members</p>
        <p>4.9 <FaRegStar></FaRegStar> </p>
</div>

<button>Join group <FaArrowRightLong></FaArrowRightLong> </button>

      </div>
    </div>

<div className="club-card">
  <div>
    <img src="/banner3.jpg" alt="" />
  </div>

  <div>
    <h4>Photography & Creative Arts Club</h4>
    <div className="club-meta">
      <span className="category">Photography</span>
      <span className="fee">$5</span>
    </div>

    <div className='group-info-middle'>
      <p>2100 members</p>
      <p>4.7 <FaRegStar /></p>
    </div>

    <button>Join group <FaArrowRightLong /></button>
  </div>
</div>


<div className="club-card">
  <div>
    <img src="/banner3.jpg" alt="" />
  </div>

  <div>
    <h4>Entrepreneurship & Business Club</h4>
    <div className="club-meta">
      <span className="category">Business</span>
      <span className="fee">$15</span>
    </div>

    <div className='group-info-middle'>
      <p>5200 members</p>
      <p>4.8 <FaRegStar /></p>
    </div>

    <button>Join group <FaArrowRightLong /></button>
  </div>
</div>


<div className="club-card">
  <div>
    <img src="/banner1.jpg" alt="" />
  </div>

  <div>
    <h4>Music & Performing Arts Club</h4>
    <div className="club-meta">
      <span className="category">Music</span>
      <span className="fee">$8</span>
    </div>

    <div className='group-info-middle'>
      <p>3800 members</p>
      <p>4.6 <FaRegStar /></p>
    </div>

    <button>Join group <FaArrowRightLong /></button>
  </div>
</div>


<div className="club-card">
  <div>
    <img src="/banner1.jpg" alt="" />
  </div>

  <div>
    <h4>Fitness & Healthy Lifestyle Club</h4>
    <div className="club-meta">
      <span className="category">Fitness</span>
      <span className="fee">$12</span>
    </div>

    <div className='group-info-middle'>
      <p>3000 members</p>
      <p>4.5 <FaRegStar /></p>
    </div>

    <button>Join group <FaArrowRightLong /></button>
  </div>
</div>


<div className="club-card">
  <div>
    <img src="/banner3.jpg" alt="" />
  </div>

  <div>
    <h4>Robotics & Engineering Club</h4>
    <div className="club-meta">
      <span className="category">Engineering</span>
      <span className="fee">$20</span>
    </div>

    <div className='group-info-middle'>
      <p>4500 members</p>
      <p>4.9 <FaRegStar /></p>
    </div>

    <button>Join group <FaArrowRightLong /></button>
  </div>
</div>


  </div>
</div>

  );
};

export default RecentClubs;