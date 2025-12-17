import React, { useContext } from "react";
import Header from "./Header";
import { Link, useParams } from "react-router";
import { AuthContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export default function UpdateClub() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: club, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/clubs/${id}`, {
        headers: {
          accesstoken: user.accessToken,
        },
      });
      console.log(id);
      return res.json();
    },
  });

  const updateClubMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`http://localhost:3000/clubs/${id}`, {
        method: "PATCH",
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
      updatedAt: now,
    };

    try {
      updateClubMutation.mutate(finalData);
      Swal.fire({
        icon: "success",
        allowOutsideClick: false,
        title: "Your club is updated successfully!",
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

  if (isLoading) {
    return (
      <div
        className="loaders3"
        style={{
          width: "100%",
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="create-club-container">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="create-club-card"
        >
          <h2>Create Club</h2>

          {/* CLUB NAME */}
          <div className="input-group">
            <label>Club Name</label>
            <input
              defaultValue={club.clubName}
              type="text"
              {...register("clubName", { required: true })}
            />
            {errors.clubName && (
              <p className="error-text">Club name is required</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="input-group">
            <label>Description</label>
            <textarea
              defaultValue={club.description}
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

          {/* CATEGORY (TEXT INPUT) */}
          <div className="input-group">
            <label>Category</label>
            <input
              defaultValue={club.category}
              type="text"
              {...register("category", { required: true })}
              placeholder="e.g. Photography, Tech, Sports"
            />
            {errors.category && (
              <p className="error-text">Category is required</p>
            )}
          </div>

          {/* LOCATION */}
          <div className="input-group">
            <label>Location (City / Area)</label>
            <input
              defaultValue={club.location}
              type="text"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <p className="error-text">Location is required</p>
            )}
          </div>

          {/* BANNER IMAGE */}
          <div className="input-group">
            <label>Banner Image URL</label>
            <input
              defaultValue={club.bannerImage}
              type="text"
              {...register("bannerImage", { required: true })}
            />
            {errors.bannerImage && (
              <p className="error-text">Banner image is required</p>
            )}
          </div>

          {/* MEMBERSHIP FEE */}
          <div className="input-group">
            <label>Membership Fee</label>
            <input
              defaultValue={club.membershipFee}
              type="number"
              {...register("membershipFee", { required: true })}
            />
            {errors.membershipFee && (
              <p className="error-text">Membership fee is required</p>
            )}
          </div>

          {/* MANAGER EMAIL */}
          <div className="input-group">
            <label>Manager Email</label>
            <input type="email" defaultValue={user.email} readOnly />
          </div>

          {/* SUBMIT BUTTON */}
          <button className="register-btn">
            {updateClubMutation.isPending ? "Updating..." : "Update Club"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
