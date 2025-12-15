import React from "react";
import { useQuery } from "@tanstack/react-query";
import "./AdminDashboard.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/admin-dashboard-stats");
      if (!res.ok) throw new Error("Failed to fetch dashboard stats");
      return res.json();
    },
  });

  const { data: allClubs, isLoading: isLoading1 } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/clubs");
      return res.json();
    },
  });

  if (isLoading || isLoading1)
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

  return (
    <>
      <h2
        style={{
          fontFamily: "bebas neue",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Admin Dashboard
      </h2>
       <h3 style={{  
          fontFamily: "bebas neue",
          fontSize: "25px",
         textAlign: "center",
          marginTop: "50px" }}>Summary Cards</h3>
      <div className="dashboard-container">
        {/* Total Users */}
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{data.totalUsers}</p>
        </div>

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

        {/* Total Memberships */}
        <div className="dashboard-card">
          <h3>Total Memberships</h3>
          <p>{data.totalMemberships}</p>
        </div>

        {/* Total Payments Amount */}
        <div className="dashboard-card">
          <h3>Total Payments</h3>
          <p>${data.totalPaymentsAmount}</p>
        </div>
      </div>

  <h3 style={{  
          fontFamily: "bebas neue",
          fontSize: "25px",
          marginBottom:'20px',
         textAlign: "center",
          marginTop: "50px" }}>Club Members Chart</h3>
      <div style={{ width: "100%", height: 600 }}>
       
<div style={{
  width:'100%',
  overflowX:'scroll'
}}>
            <BarChart data={allClubs} style={{minWidth:'1000px'}} width="100%" height={600}>
            <CartesianGrid  />
            <XAxis dataKey="clubName"   interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="memberCount" fill="rgb(29, 77, 55)" />
          </BarChart>
</div>
      </div>

    </>
  );
};

export default AdminDashboard;
