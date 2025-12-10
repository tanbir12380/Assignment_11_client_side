import React, { useContext } from "react";
import "./Register.css";
import Header from "./Header";
import { Link } from "react-router";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function Forget() {
  const { resetYourPassword } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    resetYourPassword(data.email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Reset Link Sent!",
          allowOutsideClick: false,
          text: "Please check your email to reset your password.",
          confirmButtonText: "OK",
        });

        reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message.slice(9),
        });
      });
  };

  return (
    <div className="register-container-pro">
      <Header />

      <div className="register-container">
        <form onSubmit={handleSubmit(onSubmit)} className="register-card">

          <h2 className="register-title">Reset Your Password</h2>


          {/* EMAIL FIELD */}
          <div className="input-group">
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && <p className="error-text">Email is required</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button className="register-btn forget-btn" type="submit">
            Send Reset Link
          </button>

          <p className="login-link">
            Remember your password? <Link to="/login">Login</Link>
          </p>

        </form>
      </div>

    </div>
  );
}
