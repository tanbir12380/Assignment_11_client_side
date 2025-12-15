import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./AdminDashboard.css";

const MemberDashboard = () => {
  const { user } = useContext(AuthContext);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["memberDashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/memberDashboard/${user.email}`
      );

      return res.json();
    },
  });

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (

<>
                <h2
        style={{
          fontFamily: "bebas neue",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Member Dashboard
      </h2>
    <div className="dashboard-container">

      <div className="dashboard-card">
        <h3> Clubs Joined</h3>
        <p>{data.clubJoined}</p>
      </div>

      <div className="dashboard-card">
        <h3>Events Joined</h3>
        <p>{data.eventJoined}</p>
      </div>
    </div>
</>
  );
};

export default MemberDashboard;
