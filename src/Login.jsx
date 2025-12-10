import React, { useContext } from "react";
import "./Register.css";
import Header from "./Header";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { SignInUser, signInWithGoogle, userLocationS, setUserLocation } =
    useContext(AuthContext);

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignIn = (data) => {
    const { email, password } = data;

    SignInUser(email, password)
      .then(() => {
        reset();
        navigate(userLocationS || "/");
        setUserLocation(null);
      })
      .catch((error) => {
        toast(error.message.slice(9));
      });
  };

  const signWithGoogle1 = () => {
    signInWithGoogle().then(() => {
      navigate(userLocationS || "/");
      setUserLocation(null);
    });
  };

  return (
    <div className="register-container-pro">
      <Header />

      <div className="register-container">
        <form onSubmit={handleSubmit(handleSignIn)} className="register-card">
          <h2>Login to your Account</h2>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              required
            />
            {errors.email && (
              <p className="error-text">Email is required</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              required
              style={{ marginBottom: "0px" }}
            />
            {errors.password && (
              <p className="error-text">Password is required</p>
            )}
          </div>

          <p
            className="login-link"
            style={{ textAlign: "left", marginTop: "0px" }}
          >
            <Link to="/forget">Forget your password?</Link>
          </p>

          <button className="register-btn" style={{ marginTop: "20px" }}>
            Login
          </button>

          <p className="login-link">
            Don't have any account? <Link to="/register">Register</Link>
          </p>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={signWithGoogle1}
            className="google-btn"
            style={{
              background: "white",
              color: "black",
              border: "1px solid #e5e5e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "10px",
              width: "100%",
              boxShadow: "2px 2px 5px rgba(30, 30, 30, 0.25)",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              viewBox="0 0 512 512"
            >
              <g>
                <path fill="#fff" d="m0 0H512V512H0"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}
