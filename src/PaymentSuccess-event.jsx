import React from "react";
import { NavLink, useSearchParams } from "react-router";
import "./paymentSucess.css";
import Header from "./Header";

const PaymentSuccessEvent = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  const saveMembership = async () => {
    const res = await fetch(
      "https://assignment-11-server-phi-teal.vercel.app/save-membership-event",
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
    <div style={{ paddingTop: "20px" }}>
      <Header></Header>
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
          You've successfully registered for this event! Your spot is confirmed,
          and you're all set to join and enjoy every activity planned. Get ready
          to connect with other participants, take part in engaging sessions,
          and make the most of this experience. We're excited to have you on
          board!
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessEvent;
