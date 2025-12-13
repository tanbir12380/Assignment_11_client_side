import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./ShowAllPayments.css";

const MyPayments = () => {
  const { user } = useContext(AuthContext);

  const { data: payments = [] } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/get-my-payments/${user.email}`
      );
      return res.json();
    },
    enabled: !!user?.email,
  });

  return (
    <div className="payments-container">
      <h2 className="payments-title">My Payments</h2>

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
                <td>{payment.type}</td>
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

export default MyPayments;
