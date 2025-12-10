



import React from 'react';
    import "./DropdownAvatar.css";
const NavDrop = () => {


  return (
      <div className="dropdown-container">
      <img 
        src="https://i.pravatar.cc/40" 
        alt="avatar" 
        className="avatar"
      />

      <div className="dropdown">
        <a href="/profile">Profile</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/logout">Log Out</a>
      </div>
    </div>
  );
};

export default NavDrop;