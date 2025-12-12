import React from 'react';
import { FaPlus } from "react-icons/fa";
import { NavLink } from 'react-router';

const MyEvents = () => {
  return (
    <div>
      
      <button className='contact-btn'>
<NavLink to='/dashboard/createEvent'><FaPlus></FaPlus> Create Event</NavLink>
      </button>

    </div>
  );
};

export default MyEvents;