import React, { useContext } from "react";
import "./DropdownAvatar.css";
import { AuthContext } from "./AuthContext";
import { NavLink } from "react-router";

const NavDrop = () => {
  const { user, SignOutFromApp } = useContext(AuthContext);

  return (
    <div className="dropdown-container">
      <img src={user?.photoURL} alt="avatar" className="avatar" />

      <div className="dropdown">
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink
          onClick={() => {
            SignOutFromApp();
          }}
        >
          Log Out{" "}
        </NavLink>
      </div>
    </div>
  );
};

export default NavDrop;
