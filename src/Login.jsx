import React from "react";
import "./Register.css";
import Header from "./Header";
import { Link } from "react-router";

export default function LoginForm() {
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

        <div className="input-group">
          <label>Password</label>
          <input style={{
            marginBottom:'0px',
          }} type="password" required />
        </div>
        <p style={{
          textAlign:'left',
          marginTop:'0px'
        }} className="login-link"><Link  to="/forget">Forget your password?</Link></p>
           
        

        <button style={{
            marginTop:'20px',
          }}  className="register-btn">Login</button>

        <p className="login-link">
          Don't have any account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
</div>
  );
}
