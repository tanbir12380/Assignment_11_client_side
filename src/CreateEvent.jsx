import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { AuthContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "./register.css"; 

export default function CreateEvent() {
  const { user } = useContext(AuthContext);
  const [clubs, setClubs] = useState([]);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: { isPaid: "false" },
  });

  const isPaidValue = watch("isPaid");


  const { data: userClubs, isLoading: clubsLoading } = useQuery({
    queryKey: ["userClubs", user.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/getClubs/${user.email}`);
      if (!res.ok) throw new Error("Failed to fetch clubs");
      return res.json();
    },
  });

  useEffect(() => {


    if (userClubs) setClubs(userClubs);
  }, [userClubs]);

  // Mutation to create event
  const createEventMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return res.json();
    },
    onSuccess: () => {
      toast.success("Event created successfully!");
      reset();
    },
    onError: () => toast.error("Failed to create event."),
  });

  const handleFormSubmit = (formData) => {
    const now = new Date().toISOString();

    const finalData = {
      clubId: formData.clubId, 
      title: formData.title,
      description: formData.description,
      eventDate: formData.eventDate,
      location: formData.location,
      isPaid: formData.isPaid === "true",
      eventFee: formData.isPaid === "true" ? Number(formData.eventFee) : 0,
      maxAttendees:  Number(formData.maxAttendees) ,
      createdAt: now,
      managerEmail: user.email,
      attendees : 0
    };

    createEventMutation.mutate(finalData);
  };

  if (clubsLoading) return <p style={{ textAlign: "center", padding: "40px" }}>Loading clubs...</p>;

  if (!clubs || clubs.length === 0)
    return <p style={{ textAlign: "center", padding: "40px" }}>You have no approved clubs to create events for.</p>;

  return (
    <div>

      <div className="register-container">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="register-card">
          <h2>Create Event</h2>

          {/* CLUB SELECT */}
          <div className="input-group">
            <label>Select Club</label>
            <select {...register("clubId", { required: true })}>
              {clubs.map((club) => (
                <option key={club._id} value={club._id}>
                  {club.clubName}
                </option>
              ))}
            </select>
            {errors.clubId && <p className="error-text">Please select a club</p>}
          </div>

          {/* EVENT TITLE */}
          <div className="input-group">
            <label>Event Title</label>
            <input type="text" {...register("title", { required: true })} />
            {errors.title && <p className="error-text">Title is required</p>}
          </div>

          {/* DESCRIPTION */}
          <div className="input-group">
            <label>Description</label>
            <textarea
              rows="3"
              {...register("description", { required: true })}
              style={{ width: "100%", border: "1px solid rgba(219,219,219,0.8)", borderRadius: "5px" }}
            ></textarea>
            {errors.description && <p className="error-text">Description is required</p>}
          </div>

          {/* EVENT DATE */}
          <div className="input-group">
            <label>Event Date</label>
            <input type="date" {...register("eventDate", { required: true })} />
            {errors.eventDate && <p className="error-text">Event date is required</p>}
          </div>

          {/* LOCATION */}
          <div className="input-group">
            <label>Location</label>
            <input type="text" {...register("location", { required: true })} />
            {errors.location && <p className="error-text">Location is required</p>}
          </div>

          {/* IS PAID */}
          <div className="input-group">
            <label>Is Paid Event?</label>
            <select {...register("isPaid", { required: true })}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* EVENT FEE (only if paid) */}
          {isPaidValue === "true" && (
            <div className="input-group">
              <label>Event Fee</label>
              <input type="number" {...register("eventFee", { required: true })} />
              {errors.eventFee && <p className="error-text">Event fee is required</p>}
            </div>
          )}

          {/* MAX ATTENDEES */}
          <div className="input-group">
            <label>Max Attendees</label>
            <input required type="number" {...register("maxAttendees")} />
          </div>

          {/* SUBMIT */}
          <button className="register-btn" disabled={createEventMutation.isPending}>
            {createEventMutation.isPending ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
