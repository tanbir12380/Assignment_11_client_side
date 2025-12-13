import React, { useContext } from "react";
import NavDrop from "./NavDrop";
import { NavLink } from "react-router";
import { AuthContext } from "./AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { SignOutFromApp } = useContext(AuthContext);

  return (
    <div className="header">
      <h1 className="logo">ClubSphere</h1>
      <ul className="navLinks navLinks-main">
        <li>
          {" "}
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/allclubs">Clubs</NavLink>
        </li>
        <li>
          <NavLink to="/allEvents">Events</NavLink>
        </li>
        {!user && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}

        {!user && (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavDrop></NavDrop>
          </li>
        )}
      </ul>

      <a className="btn-90" href="#side">
        <GiHamburgerMenu id="hamb" />
      </a>

      <aside id="side">
        <header>
          <a className="btn-92 btn-90" href="#">
            <GiHamburgerMenu id="hamb" />
          </a>
        </header>
        <nav>
          <ul className="navLinks ">
            {user && (
              <li>
                <img src={user?.photoURL} alt="avatar" className="avatar" />
              </li>
            )}

            <li>
              {" "}
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allclubs">Clubs</NavLink>
            </li>
            <li>
              <NavLink to="/allEvents">Events</NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}

            {!user && (
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            )}
            {user && (
              <>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => {
                      SignOutFromApp();
                    }}
                  >
                    Log Out{" "}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Header;
