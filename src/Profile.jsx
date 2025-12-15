import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./Profile.css";
import Header from "./Header";

const Profile = () => {
  const { user } = useContext(AuthContext); 

const { data: fullUser, isLoading, isError } = useQuery({
  queryKey: ["user", user?.email],
  queryFn: async () => {
    const res = await fetch(`http://localhost:3000/user/${user.email}`);
    return res.json();
  },
});


  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Error loading profile</p>;
  if (!fullUser) return null;

  return (
    <div className="profile-container">

<Header></Header>

<div className="profile-card-pro"> 
        <div className="profile-card">
        <div className="profile-photo">
          <img src={fullUser.photoURL} alt={fullUser.name} />
        </div>

        <div className="profile-details">
          <h2 className="profile-name">{fullUser.name}</h2>
          <p className="profile-email">{fullUser.email}</p>
          <p className="profile-role">Role: {fullUser.role}</p>
          <p className="profile-created">
            Member since: {new Date(fullUser.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
</div>
    </div>
  );
};

export default Profile;

