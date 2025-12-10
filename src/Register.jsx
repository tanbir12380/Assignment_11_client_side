import React from "react";
import "./Register.css";
import Header from "./Header";
import { Link } from "react-router";

export default function RegisterForm() {
  return (
<div className="register-container-pro">
<Header></Header>
     <div className="register-container">
      <form className="register-card">
        <h2>Create Account</h2>

        <div className="input-group">
           <label>Full Name</label>
          <input type="text" required />
         
        </div>

                <div className="input-group">
           <label>Upload your photo</label>
          
        </div>
        <input type="file" className="file-input file-upload" />

        <div className="input-group">
          <label>Email</label>
          <input type="email" required />
          
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" required />
          
        </div>

        <button className="register-btn">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
</div>
  );
}
