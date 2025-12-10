import React from "react";
import "./Register.css";
import Header from "./Header";
import { Link } from "react-router";

export default function Forget() {
  return (
<div className="register-container-pro">
<Header></Header>
     <div className="register-container">
      <form className="register-card">
        <h2>Login to your Account</h2>

        <div className="input-group">
          <label>Email</label>
          <input type="email" required />
          
        </div>

           
        

        <button style={{
            marginTop:'20px',
          }}  className="register-btn">Reset Password</button>

        <p className="login-link">
          Remember your password ? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
</div>
  );
}
