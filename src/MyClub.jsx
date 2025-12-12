import React from 'react';
import { FaPlus } from "react-icons/fa";
import { NavLink } from 'react-router';

const MyClub = () => {
  return (
    <div>
      
      <button className='contact-btn'>
<NavLink to='/dashboard/createClub'><FaPlus></FaPlus> Create Club</NavLink>
      </button>

    </div>
  );
};

export default MyClub;