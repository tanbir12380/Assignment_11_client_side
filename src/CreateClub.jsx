import React, { useContext } from "react";
import Header from "./Header";
import { Link } from "react-router";
import { AuthContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export default function CreateClub() {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createClubMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:3000/clubs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accesstoken: user.accessToken,
        },
        body: JSON.stringify(data),
      });

      return res.json();
    },
  });

  const handleFormSubmit = async (formData) => {
    const now = new Date();

    const finalData = {
      clubName: formData.clubName,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      bannerImage: formData.bannerImage,
      membershipFee: parseInt(formData.membershipFee),
      status: "pending",
      managerEmail: user.email,
      createdAt: now,
      updatedAt: now,
      memberCount: 0,
      eventCount: 0,
    };

    try {
      createClubMutation.mutate(finalData);
      reset();
      Swal.fire({
        icon: "success",
        allowOutsideClick: false,
        title: "Your club is created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        allowOutsideClick: false,
        title: "Failed",
        text: error.message.slice(9),
      });
    }
  };

  return (
    <div>
      <div className="create-club-container">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="create-club-card"
        >
          <h2>Create Club</h2>

          <div className="input-group">
            <label>Club Name</label>
            <input type="text" {...register("clubName", { required: true })} />
            {errors.clubName && (
              <p className="error-text">Club name is required</p>
            )}
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              style={{
                width: "100%",
                border: "1px solid rgba(219, 219, 219, 0.802)",
                borderRadius: "5px",
              }}
              rows="3"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <p className="error-text">Description is required</p>
            )}
          </div>

          <div className="input-group">
            <label>Category</label>
            <input
              type="text"
              {...register("category", { required: true })}
              placeholder="e.g. Photography, Tech, Sports"
            />
            {errors.category && (
              <p className="error-text">Category is required</p>
            )}
          </div>

          <div className="input-group">
            <label>Location (City / Area)</label>
            <input type="text" {...register("location", { required: true })} />
            {errors.location && (
              <p className="error-text">Location is required</p>
            )}
          </div>

          <div className="input-group">
            <label>Banner Image URL</label>
            <input
              type="text"
              {...register("bannerImage", { required: true })}
            />
            {errors.bannerImage && (
              <p className="error-text">Banner image is required</p>
            )}
          </div>

          <div className="input-group">
            <label>Membership Fee</label>
            <input
              type="number"
              {...register("membershipFee", { required: true })}
            />
            {errors.membershipFee && (
              <p className="error-text">Membership fee is required</p>
            )}
          </div>

          <div className="input-group">
            <label>Manager Email</label>
            <input type="email" defaultValue={user.email} readOnly />
          </div>

          <button
            className="register-btn"
            disabled={createClubMutation.isPending}
          >
            {createClubMutation.isPending ? "Creating..." : "Create Club"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
