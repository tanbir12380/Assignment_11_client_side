import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./AdminDashboard.css";

const MemberDashboard = () => {
  const { user } = useContext(AuthContext);

  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["memberDashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/memberDashboard/${user.email}`, {
          headers:{
          accesstoken: user.accessToken
        }}
      );

      return res.json();
    },
  });

  if (isLoading) {
    return  <div
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
      </div>;
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
