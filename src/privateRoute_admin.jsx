import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Forbidden from "./Forbidden";
import { Navigate } from "react-router";

const PrivateRoute_admin = ({ children }) => {
  const { userRole } = useContext(AuthContext);
  if (userRole == "admin") {
    return children;
  } else {
    return <Navigate to="/forbidden" replace />;
  }
};

export default PrivateRoute_admin;
