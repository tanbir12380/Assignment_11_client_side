import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./ShowAllPayments.css";

const ClubMembersTable = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["managerMembers", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/clubManager-dashboard-ClubMember/${user.email}`,
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );
      const jsonData = await res.json();
      console.log(jsonData);
      return jsonData;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
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
  }

  return (
    <div className="payments-container" style={{ padding: "20px" }}>
      <h1 className="payments-title">My Club Members</h1>

      {data?.map((club, index) => (
        <>
          <h2
            style={{
              fontFamily: "bebas neue",
              fontSize: "22px",
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            {club.clubName}
          </h2>
          <div className="payments-table-wrapper" key={index}>
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Cost</th>
                  <th>Joined At</th>
                </tr>
              </thead>

              <tbody>
                {club?.members?.map((member, i) => (
                  <tr key={i}>
                    <td>{member.userEmail}</td>
                    <td>${member.cost}</td>
                    <td>{new Date(member.joinedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ))}
    </div>
  );
};

export default ClubMembersTable;
