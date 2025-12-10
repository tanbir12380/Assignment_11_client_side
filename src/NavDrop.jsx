



import React, { useContext } from 'react';
    import "./DropdownAvatar.css";
import { AuthContext } from './AuthContext';
import { NavLink } from 'react-router';

const NavDrop = () => {


  const { user,SignOutFromApp } = useContext(AuthContext);

  return (
      <div className="dropdown-container">
      <img 
        src={user?.photoURL}
        alt="avatar" 
        className="avatar"
      />

      <div className="dropdown">
        <a href="/profile">Profile</a>
        <a href="/dashboard">Dashboard</a>
        <NavLink  onClick={() => {
                SignOutFromApp();
              }}>Log Out </NavLink>
      </div>
    </div>
  );
};

export default NavDrop;