import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "./Header";
import "./ClubDetails.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isMember, setIsMember] = useState(false);
  const [toggole, setToggole] = useState(false);

  const {
    data: event,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-11-server-phi-teal.vercel.app/event/${id}`,
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );

      return res.json();
    },
  });

  const { data: club, isLoading: loading2 } = useQuery({
    queryKey: ["club", event?.clubId],
    enabled: !!event?.clubId,
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-11-server-phi-teal.vercel.app/clubs/${event.clubId}`,
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );

      return res.json();
    },
  });

  useEffect(() => {
    if (!user) return;

    const checkMembership = async () => {
      try {
        const res = await fetch(
          `https://assignment-11-server-phi-teal.vercel.app/check-event-register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, id }),
          }
        );

        const data = await res.json();
        if (data) setIsMember(true);
      } catch (err) {
        console.error(err);
      }
    };

    checkMembership();
  }, [user, id, toggole]);

  const createCheckoutMutation = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await fetch(
        "https://assignment-11-server-phi-teal.vercel.app/create-checkout-session-event",
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

  const freeMembershipMutation = useMutation({
    mutationFn: async (membershipData) => {
      const res = await fetch(
        "https://assignment-11-server-phi-teal.vercel.app/save-free-membership-event",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(membershipData),
        }
      );
      setToggole(!toggole);
      refetch();
      Swal.fire({
        icon: "success",
        allowOutsideClick: false,
        title: "Congratulations, You've successfully joined the event",
        showConfirmButton: false,
        timer: 2000,
      });
      return res.json();
    },
  });

  const isPast = (eventDate) => {
    const [year, month, day] = eventDate.split("-").map(Number);
    const today = new Date();

    console.log(today, year, month, day);

    if (today.getFullYear() > year) return true;
    if (today.getFullYear() < year) return false;

    if (today.getMonth() + 1 > month) return true;
    if (today.getMonth() + 1 < month) return false;

    return today.getDate() > day;
  };

  // --- Buy handler ---
  const handleBuy = () => {
    if (isPast(event.eventDate)) {
      toast("Sorry, this event has already passed and registration is closed");
      return;
    }

    if (
      event.maxAttendees === event.attendees ||
      event.maxAttendees < event.attendees
    ) {
      toast("no seat available");
    }

    if (event.eventFee === 0) {
      const freeMembershipData = {
        userEmail: user.email,
        eventId: id,
        clubId: event.clubId,
      };

      freeMembershipMutation.mutate(freeMembershipData);
      return;
    }

    const paymentInfo = {
      cost: event.eventFee,
      name: event.title,
      type: "event",
      eventId: id,
      email: user.email,
      clubId: event.clubId,
    };

    createCheckoutMutation.mutate(paymentInfo);
  };

  if (isLoading || loading2) {
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const itemVariants2 = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="group-details-container"
    >
      <Header />

      <motion.div variants={cardVariants} className="group-details-card">
        <motion.div variants={itemVariants2} className="group-banner">
          <img
            style={{ objectPosition: "top center" }}
            src={event.bannerImage || "/banner1.jpg"}
            alt={event.title}
          />
        </motion.div>

        <div className="group-content">
          <motion.h1
            variants={itemVariants}
            style={{ marginBottom: "0" }}
            className="group-title"
          >
            {event.title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            style={{
              marginBottom: "20px",
            }}
          >
            Created by : {club?.clubName}
          </motion.p>

          <motion.div variants={itemVariants} className="group-meta">
            <span> Location: {event.location}</span>
            <span>Date: {event.eventDate}</span>
            <span>
              Fee: {event.eventFee > 0 ? `$${event.eventFee}` : "Free"}
            </span>
            {event.maxAttendees && (
              <span>Max Attendees: {event.maxAttendees}</span>
            )}
            <span>
              People Joined : {event.memberCount ? event.memberCount : 0}
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="group-description">
            {event.description}
          </motion.p>

          <motion.button
            disabled={isMember}
            onClick={handleBuy}
            className="contact-btn"
            whileHover={{ scale: isMember ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            {isMember ? "Already Joined" : "Join Event"} <FaArrowRightLong />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventDetails;
