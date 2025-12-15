import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./AuthContext";
import AdminDashboard from "./AdminDashboard";
import ClubManagerDashboard from "./ClubManagerDashboard";
import MemberDashboard from "./MemberDashboard";
import { useQuery } from "@tanstack/react-query";
import Forbidden from "./Forbidden";
import PrivateRoute from "./PrivateRoute";
import PrivateRoute_admin from "./privateRoute_admin";
import PrivateRoute_Manager from "./PrivateRoute_Manager";

const RoleBasedDashboard = () => {
  const {user,loading} = useContext(AuthContext);

  const { data: fullUser, isLoading } = useQuery({
  queryKey: ["user", user?.email],
  queryFn: async () => {
    const res = await fetch(`http://localhost:3000/user/${user.email}`);
    return res.json();
  },
});


if(isLoading,loading){
  return      <div
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
}


  if (!user) return <Navigate to="/login" />;




  if (fullUser?.role === "admin") {
    return (
      <PrivateRoute_admin>
        <AdminDashboard />
      </PrivateRoute_admin>
    );
  } else if (fullUser?.role === "clubManager") {
    return (
      <PrivateRoute_Manager>
        <ClubManagerDashboard />
      </PrivateRoute_Manager>
    );
  } else if (fullUser?.role === "member") {
    return <MemberDashboard />;
  } else {
    return <Forbidden />;
  }
};



export default RoleBasedDashboard;
