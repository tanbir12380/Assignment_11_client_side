import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import "./AdminDashboard.css";
import { AuthContext } from "./AuthContext";

const ClubManagerDashboard = () => {
  const {user} = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["managerStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/clubManager-dashboard-stats/${user.email}`
      );
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div
        style={{
          width: "100%",
          flex: 1,
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



  return (
    <>
      <h2
        style={{
          fontFamily: "bebas neue",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Club Manager Dashboard
      </h2>


      <div className="dashboard-container">
        {/* Total Clubs */}
        <div className="dashboard-card">
          <h3>Total Clubs</h3>
          <p>{data.totalClubs}</p>
          <small>
            Pending: {data.pendingClubs} | Approved: {data.approvedClubs} |
            Rejected: {data.rejectedClubs}
          </small>
        </div>

        {/* Total Events */}
        <div className="dashboard-card">
          <h3>Total Events</h3>
          <p>{data.totalEvents}</p>
        </div>

        {/* Total Members */}
        <div className="dashboard-card">
          <h3>Total Members</h3>
          <p>{data.totalMembers}</p>
        </div>

        {/* Total Payments Amount */}
        <div className="dashboard-card">
          <h3>Total Payments</h3>
          <p>${data.totalPaymentsAmount}</p>
        </div>
      </div>
    </>
  );
};

export default ClubManagerDashboard;
