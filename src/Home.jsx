import React from 'react';
import Header from './Header';
import { FaArrowRightLong } from "react-icons/fa6";
import HowItWorks from './HowItWorks';
import Features from './Features';

const Home = () => {
  return (
<div>
      <div className='navAndbanner'>
      <div className='innerNavAndBanner'>
        <Header></Header>
        <div className='bannerText'>
          <h3>Your Next Adventure Starts Here: Events from Every Club, Anytime</h3>
          <p>From parties to workshops, meetups to performances — there's always something happening. Find your vibe, meet new people, and dive in.</p>
        <button className='banner-btn'><span>Explore Groups</span> <FaArrowRightLong /></button>
        </div>
      </div> 
    </div>
      <HowItWorks></HowItWorks>
      <Features></Features>
</div>
  );
};

export default Home;