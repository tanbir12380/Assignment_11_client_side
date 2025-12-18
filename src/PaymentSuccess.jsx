import React from "react";
import { NavLink, useSearchParams } from "react-router";
import "./paymentSucess.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  const saveMembership = async () => {
    const res = await fetch(
      "https://assignment-11-server-rosy-five.vercel.app/save-membership",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      }
    );

    const data = await res.json();
    console.log("Membership saved:", data);
  };

  if (session_id) saveMembership();

  return (
    <div className="paymentSucess">
      <h3
        style={{
          fontSize: "40px",
          fontFamily: "bebas neue",
        }}
      >
        Your payment has been received
      </h3>
      <p>
        You've successfully joined the club! Your membership is now active, and
        you can fully participate in all club activities and discussions.
        Connect with other members, explore available resources, and make the
        most of your membership. We're excited to welcome you to the community!
      </p>
    </div>
  );
};

export default PaymentSuccess;
