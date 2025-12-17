import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./ShowAllPayments.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router";

const MyPayments = () => {
  const { user } = useContext(AuthContext);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/get-my-payments/${user.email}`,
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );
      return res.json();
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
    <div className="payments-container">
      <h2 className="payments-title">Your Payments</h2>

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
                <td
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  {payment.type === "club" ? (
                    <>
                      {" "}
                      {payment.clubId}{" "}
                      <NavLink
                        to={`/clubDetail/${payment.clubId}`}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "var(--bg-secondary)",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaArrowRightLong />
                      </NavLink>
                    </>
                  ) : (
                    <>
                      {" "}
                      {payment.eventId}{" "}
                      <NavLink
                        to={`/eventDetail/${payment.eventId}`}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "var(--bg-secondary)",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaArrowRightLong />
                      </NavLink>
                    </>
                  )}
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
