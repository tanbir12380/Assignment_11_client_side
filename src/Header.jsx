import React, { useContext } from 'react';
import NavDrop from './NavDrop';
import { NavLink } from 'react-router';
import { AuthContext } from './AuthContext';

const Header = () => {

  const {user} = useContext(AuthContext)

  return (
    <div className='header'>
      <h1 className='logo'>ClubSphere</h1>
      <ul className='navLinks'>
       <li> <NavLink to="/">Home</NavLink></li>
        <li>Clubs</li>
        <li>Events</li>
{
  !user &&          <li><NavLink to='/login'>Login</NavLink></li>
    
}

{
  !user &&          
        <li><NavLink to="/register">Register</NavLink></li>
}
{
  user &&         <li>
          <NavDrop></NavDrop>
        </li>
}
      </ul>
    </div>
  );
};

export default Header;