import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./ShowAllPayments.css";

const EventMembersTable = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["managerMembers", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-11-server-rosy-five.vercel.app/clubManager-dashboard-EventMember/${user.email}`,
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

  return (
    <div className="payments-container" style={{ padding: "20px" }}>
      <h1 className="payments-title">your Event Perticipents</h1>

      {data?.map((event, index) => (
        <div key={index}>
          <h2
            style={{
              fontFamily: "bebas neue",
              fontSize: "22px",
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            {event.title}
          </h2>
          <div className="payments-table-wrapper">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Cost</th>
                  <th>Joined At</th>
                </tr>
              </thead>

              <tbody>
                {event?.members?.map((member, i) => (
                  <tr key={i}>
                    <td>{member.userEmail}</td>
                    <td>${member.cost}</td>
                    <td>{new Date(member.joinedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventMembersTable;
