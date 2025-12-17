import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "./Header";
import "./ClubDetails.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ClubDetails = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [isMember, setIsMember] = useState(false);
  const [toggole, setToggole] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkMembership = async () => {
      try {
        const res = await fetch(`http://localhost:3000/check-club-register`, {
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
  }, [user, id, toggole]);

  const {
    data: club,
    isLoading,
    isError,
    refetch,
  } = useQuery({
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

  const createCheckoutMutation = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      });

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
      const res = await fetch("http://localhost:3000/save-free-membership", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(membershipData),
      });
      setToggole(!toggole);
      refetch();
      Swal.fire({
        icon: "success",
        allowOutsideClick: false,
        title: "Congratulations, You've successfully joined the club",
        showConfirmButton: false,
        timer: 2000,
      });
      return res.json();
    },
  });

  // --- Buy handler ---
  const handleBuy = () => {
    if (club.membershipFee === 0) {
      const freeMembershipData = {
        userEmail: user.email,
        clubId: id,
      };

      freeMembershipMutation.mutate(freeMembershipData);
      return;
    }

    const paymentInfo = {
      cost: club.membershipFee,
      name: club.clubName,
      type: "club",
      clubId: id,
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
      <p style={{ textAlign: "center", padding: "40px" }}>Error loading club</p>
    );

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
      className="group-details-container"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <Header />

      <motion.div className="group-details-card" variants={cardVariants}>
        <motion.div className="group-banner" variants={itemVariants2}>
          <img src={club.bannerImage} alt={club.clubName} />
        </motion.div>

        <div className="group-content">
          <motion.h1 className="group-title" variants={itemVariants}>
            {club.clubName}
          </motion.h1>

          <motion.div className="group-meta" variants={itemVariants}>
            <span>Category: {club.category}</span>
            <span>Membership Fee: ${club.membershipFee}</span>
          </motion.div>

          <motion.div className="group-members" variants={itemVariants}>
            {club.memberCount ? club.memberCount : "0"} members
          </motion.div>

          <motion.p className="group-description" variants={itemVariants}>
            {club.description}
          </motion.p>

          <motion.button
            className="contact-btn"
            onClick={handleBuy}
            disabled={isMember}
            whileHover={{ scale: isMember ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            {isMember ? "Already Joined" : "Join Club"} <FaArrowRightLong />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClubDetails;
