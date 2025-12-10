import React from 'react';
import NavDrop from './NavDrop';

const Header = () => {
  return (
    <div className='header'>
      <h1 className='logo'>ClubSphere</h1>
      <ul className='navLinks'>
        <li>Home</li>
        <li>Clubs</li>
        <li>Events</li>
        <li>Login</li>
        <li>Register</li>
        <li>
          <NavDrop></NavDrop>
        </li>
      </ul>
    </div>
  );
};

export default Header;