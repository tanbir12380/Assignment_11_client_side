import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import "./UserList.css";
import { toast } from "react-toastify";

const UserList = () => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error("Failed to update role");
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

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading users...</p>;
  if (isError)
    return <p style={{ textAlign: "center" }}>Error loading users</p>;

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      <table className="user-table">
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
  );
};

export default UserList;
