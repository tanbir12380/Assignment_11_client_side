import React, { useContext } from "react";
import "./Register.css";
import Header from "./Header";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const {
    createUser,
    updateUsersDetails,
    signInWithGoogle,
    userLocationS,
    setUserLocation,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const saveUserMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      return response.json();
    },
  });

  const handleFormSubmit = (data) => {
    const { name, photo, email, password } = data;

    if (!passwordRegex.test(password)) {
      toast(
        "Password must be at least 6 characters long and include at least one uppercase and one lowercase letter"
      );
      return;
    }

    Swal.fire({
      title: "Processing...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    createUser(email, password)
      .then((response) => {
        const user = response.user;

        updateUsersDetails(user, name, photo)
          .then(() => {
            reset();

            const userData = {
              name,
              email,
              photoURL: photo,
              role: "member",
              createdAt: new Date().toISOString(),
            };

            saveUserMutation.mutate(userData);

            Swal.close();

            Swal.fire({
              icon: "success",
              allowOutsideClick: false,
              title: "Your Account is registered successfully!",
              showConfirmButton: false,
              timer: 2000,
            });

            navigate(userLocationS || "/");
            setUserLocation(null);
          })
          .catch(() => {});
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          allowOutsideClick: false,
          title: "Failed",
          text: error.message.slice(9),
        });
      });
  };

  const signWithGoogle1 = () => {
    Swal.fire({
      title: "Processing...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    signInWithGoogle()
      .then((response) => {
        const user = response.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "member",
          createdAt: new Date().toISOString(),
        };

        saveUserMutation.mutate(userData);
        Swal.close();

        Swal.fire({
          icon: "success",
          allowOutsideClick: false,
          title: "Your Account is registered successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(userLocationS || "/");
        setUserLocation(null);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          allowOutsideClick: false,
          title: "Failed",
          text: error.message.slice(9),
        });
      });
  };

  return (
    <div className="register-container-pro">
      <Header />

      <div className="register-container">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="register-card"
        >
          <h2>Create Account</h2>

          <div className="input-group">
            <label>Full Name</label>
            <input type="text" {...register("name", { required: true })} />
            {errors.name && <p className="error-text">Name is required</p>}
          </div>

          <div className="input-group">
            <label>Upload your photo</label>
            <input type="text" {...register("photo", { required: true })} />
            {errors.photo && (
              <p className="error-text">Photo URL is required</p>
            )}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && <p className="error-text">Email is required</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">Password is required</p>
            )}
          </div>

          <button className="register-btn">Sign Up</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>

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
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "2px 2px 5px rgba(30, 30, 30, 0.25)",
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
