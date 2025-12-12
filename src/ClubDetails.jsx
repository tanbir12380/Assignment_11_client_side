import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "./Header";
import "./ClubDetails.css"
import { FaArrowRightLong } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const ClubDetails = () => {
  const { id } = useParams(); 

  const {user}= useContext(AuthContext);

    const [isMember, setIsMember] = useState(false);





  useEffect(() => {
    if (!user) return; 

    const checkMembership = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/check-club-register`, 
          {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, id })
          }
        );

        const data = await res.json();
        if (data) setIsMember(true); 
      } catch (err) {
        console.error( err);
      }
    };

    checkMembership();
  }, [user, id]);





  const { data: club, isLoading, isError } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/clubs/${id}`);
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



  // --- Buy handler ---
  const handleBuy = () => {
    const paymentInfo = {
      cost: club.membershipFee,
      name: club.clubName,
      type: "club",
      clubId: id,
      email: user.email,
    };

    createCheckoutMutation.mutate(paymentInfo);
  };



    if (isLoading) return <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>;
  if (isError) return <p style={{ textAlign: "center", padding: "40px" }}>Error loading club</p>;



  return (
    <div className="group-details-container">
      <Header />

      <div className="group-details-card">
        <div className="group-banner">
          <img src={club.bannerImage} alt={club.clubName} />
        </div>

        <div className="group-content">
          <h1 className="group-title">{club.clubName}</h1>

          <div className="group-meta">
            <span>Category: {club.category}</span>
            <span>Membership Fee: ${club.membershipFee}</span>
          </div>

          <div className="group-members">{club.memberCount} members</div>

          <p className="group-description">{club.description}</p>

          <button onClick={handleBuy} disabled={isMember} className=" contact-btn"> {isMember ? "Already Joined" : "Join Club"} <FaArrowRightLong /></button>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
