import React, { useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import "./UserList.css";
import "./ShowAllPayments.css";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

const UserList = () => {

  const {user}= useContext(AuthContext);

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/users",{
        headers:{
          accesstoken: user.accessToken
        }});
      return res.json();
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
           accesstoken: user.accessToken
         },
        body: JSON.stringify({ role }),
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Role updated successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });

  if (isLoading) return  <div
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
      </div>;

  return (
    <div className="user-list-container">
      <h2>User List</h2>

<div className="payments-table-wrapper">
        <table className="payments-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="action-button-container">
                <button
                  className="role-btn admin-btn"
                  onClick={() =>
                    updateRoleMutation.mutate({ id: user._id, role: "admin" })
                  }
                  disabled={user.role === "admin"}
                >
                  Make Admin
                </button>

                <button
                  className="role-btn club-manager-btn"
                  onClick={() =>
                    updateRoleMutation.mutate({
                      id: user._id,
                      role: "clubManager",
                    })
                  }
                  disabled={user.role === "clubManager"}
                >
                  Make Club Manager
                </button>

                <button
                  className="role-btn user-btn"
                  onClick={() =>
                    updateRoleMutation.mutate({ id: user._id, role: "member" })
                  }
                  disabled={
                    !(user.role === "admin" || user.role === "clubManager")
                  }
                >
                  Make Member
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>


    </div>
  );
};

export default UserList;
