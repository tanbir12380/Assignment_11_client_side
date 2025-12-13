import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Forbidden from "./Forbidden";
import { Navigate } from "react-router";

const PrivateRoute_Manager = ({ children }) => {
  const { userRole } = useContext(AuthContext);
  if (userRole == "clubManager") {
    return children;
  } else {
    return <Navigate to="/forbidden" replace />;
  }
};

export default PrivateRoute_Manager;
