import React from 'react';
import Header from './Header';
import { FaArrowRightLong } from "react-icons/fa6";
import HowItWorks from './HowItWorks';
import Features from './Features';
import RecentClubs from './RecentClubs';
import { useNavigate } from 'react-router';
import { motion } from "framer-motion";

const Home = () => {

  const navigate = useNavigate();
  const textFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };
  return (
<div className='HomeContainerClass'>
      <div className='navAndbanner'>
      <div className='innerNavAndBanner'>
        <Header></Header>
        <motion.div  variants={textFromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} className='bannerText'>
          <h3>Your Next Adventure Starts Here: Events from Every Club, Anytime</h3>
          <p>From parties to workshops, meetups to performances — there's always something happening. Find your vibe, meet new people, and dive in.</p>
        <button onClick={()=>{navigate('/allClubs')}} className='banner-btn'><span>Explore Clubs</span> <FaArrowRightLong /></button>
        </motion.div>
      </div> 
    </div>

 <RecentClubs></RecentClubs>
    <Features></Features>
      <HowItWorks></HowItWorks>


   
      
</div>
  );
};

export default Home;