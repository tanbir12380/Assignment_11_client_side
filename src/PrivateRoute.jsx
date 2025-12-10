import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading, setUserLocation } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    if (!user && !loading) {
      setUserLocation(location.pathname);
    }
  }, [user, loading, location.pathname, setUserLocation]);

  if (loading) {
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

  if (user) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};

export default PrivateRoute;
