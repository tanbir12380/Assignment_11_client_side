import React, { useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function UpdateEvent() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isPaidValue = watch("isPaid");

  // 🔹 FETCH EVENT
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/event/${id}`, {
        headers: { accesstoken: user.accessToken },
      });
      return res.json();
    },
  });

  // 🔹 UPDATE MUTATION
  const updateEventMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accesstoken: user.accessToken,
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  });

  const handleFormSubmit = (formData) => {
    const finalData = {
      title: formData.title,
      description: formData.description,
      bannerImage: formData.bannerImage,
      location: formData.location,
      eventDate: formData.eventDate,
      isPaid: formData.isPaid === "true",
      eventFee: formData.isPaid === "true" ? Number(formData.eventFee) : 0,
      maxAttendees: Number(formData.maxAttendees),
      updatedAt: new Date(),
    };

    try {
      updateEventMutation.mutate(finalData);
      Swal.fire({
        icon: "success",
        title: "Event updated successfully!",
        timer: 1500,
        showConfirmButton: false,
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
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="create-club-container">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="create-club-card"
      >
        <h2>Update Event</h2>

        {/* TITLE */}
        <div className="input-group">
          <label>Event Title</label>
          <input
            defaultValue={event?.title}
            {...register("title", { required: true })}
          />
          {errors.title && <p className="error-text">Title is required</p>}
        </div>

        {/* DESCRIPTION */}
        <div className="input-group">
          <label>Description</label>
          <textarea
            style={{
              width: "100%",
              border: "1px solid rgba(219, 219, 219, 0.802)",
              borderRadius: "5px",
            }}
            defaultValue={event?.description}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="error-text">Description is required</p>
          )}
        </div>

        {/* BANNER */}
        <div className="input-group">
          <label>Banner Image URL</label>
          <input
            defaultValue={event?.bannerImage}
            {...register("bannerImage", { required: true })}
          />
          {errors.bannerImage && (
            <p className="error-text">Banner image is required</p>
          )}
        </div>

        {/* DATE */}
        <div className="input-group">
          <label>Event Date</label>
          <input
            type="date"
            defaultValue={event?.eventDate?.split("T")[0]}
            {...register("eventDate", { required: true })}
          />
          {errors.eventDate && (
            <p className="error-text">Event date is required</p>
          )}
        </div>

        {/* LOCATION */}
        <div className="input-group">
          <label>Location</label>
          <input
            defaultValue={event?.location}
            {...register("location", { required: true })}
          />
          {errors.location && (
            <p className="error-text">Location is required</p>
          )}
        </div>

        {/* IS PAID */}
        <div className="input-group">
          <label>Is Paid Event?</label>
          <select
            defaultValue={event?.isPaid ? "true" : "false"}
            {...register("isPaid", { required: true })}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          {errors.isPaid && (
            <p className="error-text">Please select an option</p>
          )}
        </div>

        {/* EVENT FEE */}
        {isPaidValue === "true" && (
          <div className="input-group">
            <label>Event Fee</label>
            <input
              type="number"
              defaultValue={event?.eventFee}
              {...register("eventFee", { required: true })}
            />
            {errors.eventFee && (
              <p className="error-text">Event fee is required</p>
            )}
          </div>
        )}

        {/* MAX ATTENDEES */}
        <div className="input-group">
          <label>Max Attendees</label>
          <input
            type="number"
            defaultValue={event?.maxAttendees}
            {...register("maxAttendees", { required: true })}
          />
          {errors.maxAttendees && (
            <p className="error-text">Max attendees is required</p>
          )}
        </div>

        <button className="register-btn">
          {updateEventMutation.isPending ? "Updating..." : "Update Event"}
        </button>
      </form>
    </div>
  );
}
