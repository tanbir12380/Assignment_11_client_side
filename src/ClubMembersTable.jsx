import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./ShowAllPayments.css";

const ClubMembersTable = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["managerMembers", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/clubManager-dashboard-ClubMember/${user.email}`,{
        headers:{
          accesstoken: user.accessToken
        }
      });
         const jsonData = await res.json(); 
    console.log(jsonData); 
    return jsonData;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="members-loading">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="members-error">Failed to load memberships</p>;
  }

  return (
    <div className="payments-container">
      <h2 className="payments-title">Club Members</h2>

<div className="payments-table-wrapper"><table className="payments-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Club ID</th>
              <th>Cost</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.userEmail}</td>
                <td>{member.clubId}</td>
                <td>${member.cost}</td>
                <td>{new Date(member.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table></div>


    </div>
  );
};

export default ClubMembersTable;
