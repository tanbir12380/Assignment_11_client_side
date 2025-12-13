import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div
      className=" flex items-center justify-center px-6"
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "calc( 100vh)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "30px",
        }}
      >
        {/* Status Code */}
        <h1
          className="text-7xl tracking-widest"
          style={{
            fontFamily: "Bebas Neue",
            color: "var(--bg-secondary)",
          }}
        >
          403
        </h1>

        {/* Title */}
        <h2
          className="text-3xl"
          style={{
            fontFamily: "Bebas Neue",
            color: "var(--bg-secondary-light)",
          }}
        >
          Access Forbidden
        </h2>

        {/* Description */}
        <p
          className="text-base leading-relaxed"
          style={{
            fontFamily: "Inter",
            color: "var(--bg-secondary-semi-light)",
          }}
        >
          You don't have permission to access this page. Please contact an
          administrator or return to a safe area.
        </p>

        {/* Action */}
        <Link
          to="/"
          style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--bg-primary)",
            width: "200px",
            textAlign: "center",
            borderRadius: "8px",
            padding: "8px 20px",
            display: "flex",
            justifyContent: "center",
            fontFamily: "bebas neue",
            fontSize: "22px",
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
