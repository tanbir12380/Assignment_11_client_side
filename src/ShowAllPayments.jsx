import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./ShowAllPayments.css";

const AllPayments = () => {
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/get-all-payments");
      return res.json();
    },
  });

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
