import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./ShowAllPayments.css";

const AllPayments = () => {
  const { user } = useContext(AuthContext);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-11-server-rosy-five.vercel.app/get-all-payments",
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );
      return res.json();
    },
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
    <div className="payments-container">
      <h2 className="payments-title">All Payments</h2>

      <div className="payments-table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Cost</th>
              <th>User Email</th>
              <th>Type</th>
              <th>Club / Event ID</th>
              <th>Payment ID</th>
              <th>Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>${payment.cost}</td>

                <td>{payment.userEmail}</td>

                <td>
                  <span>{payment.type}</span>
                </td>

                <td>
                  {payment.type === "club" ? payment.clubId : payment.eventId}
                </td>

                <td>{payment.paymentId}</td>

                <td>{new Date(payment.joinedAt).toLocaleString()}</td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="no-payments">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPayments;
