import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "./Header";
import "./ClubDetails.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();

  const [isMember, setIsMember] = useState(false);

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/event/${id}`);

      return res.json();
    },
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const checkMembership = async () => {
      try {
        const res = await fetch(`http://localhost:3000/check-event-register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, id }),
        });

        const data = await res.json();
        if (data) setIsMember(true);
      } catch (err) {
        console.error(err);
      }
    };

    checkMembership();
  }, [user, id]);

  const createCheckoutMutation = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await fetch(
        "http://localhost:3000/create-checkout-session-event",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(paymentInfo),
        }
      );

      const data = await res.json();
      console.log("Backend Response:", data);
      return data;
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      }
    },
    onError: (err) => {
      console.error("Stripe session creation failed:", err);
    },
  });

  // --- Buy handler ---
  const handleBuy = () => {
    if (
      event.maxAttendees === event.attendees ||
      event.maxAttendees < event.attendees ||
      isMember
    ) {
      toast("no seat available");
    }

    const paymentInfo = {
      cost: event.eventFee,
      name: event.title,
      type: "event",
      eventId: id,
      email: user.email,
    };

    createCheckoutMutation.mutate(paymentInfo);
  };

  if (isLoading)
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
  if (isError)
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Error loading event
      </p>
    );

  return (
    <div className="group-details-container">
      <Header />

      <div className="group-details-card">
        <div className="group-banner">
          <img src={event.bannerImage || "/banner1.jpg"} alt={event.title} />
        </div>

        <div className="group-content">
          <h1 className="group-title">{event.title}</h1>

          <div className="group-meta">
            <span>Location: {event.location}</span>
            <span>Date: {new Date(event.eventDate).toLocaleString()}</span>
            {event.isPaid ? (
              <span>Fee: ${event.eventFee}</span>
            ) : (
              <span>Fee: Free</span>
            )}
            {event.maxAttendees && (
              <span>Max Attendees: {event.maxAttendees}</span>
            )}
          </div>

          <p className="group-description">{event.description}</p>

          <button
            disabled={isMember}
            onClick={handleBuy}
            className="contact-btn"
          >
            {" "}
            {isMember ? "Already Joined" : "Join Event"} <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
