import React, { useContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import "./UserList.css";
import "./ShowAllPayments.css";
import { AuthContext } from "./AuthContext";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UserList = () => {
  const { user, userRole, refetchRole, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfAdminYet = () => {
      if (userRole && userRole !== "admin") {
        navigate("/forbidden");
        window.location.reload();
      }
    };

    checkIfAdminYet();
  }, [userRole, navigate]);

  const {
    data: users,
    isLoading: loading2,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-11-server-rosy-five.vercel.app/users",
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );
      return res.json();
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await fetch(
        `https://assignment-11-server-rosy-five.vercel.app/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            accesstoken: user.accessToken,
          },
          body: JSON.stringify({ role }),
        }
      );
      return res.json();
    },
  });

  console.log("from userlist :", userRole);
  console.log(isLoading, loading2);

  return (
    <div className="user-list-container">
      <h2 className="payments-title">User List</h2>

      <div className="payments-table-wrapper">
        {isLoading === false && loading2 === false ? (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Picture</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                      src={user.photoURL}
                      alt=""
                    />
                  </td>
                  <td>{user.role}</td>
                  <td className="action-button-container">
                    <button
                      className="role-btn admin-btn"
                      onClick={() =>
                        updateRoleMutation.mutate(
                          {
                            id: user._id,
                            role: "admin",
                          },
                          {
                            onSuccess: () => {
                              Swal.fire({
                                icon: "success",
                                title: "Role Updated",
                                text: "User role changed to Admin",
                                timer: 1500,
                                showConfirmButton: false,
                              });

                              refetch();
                            },
                          }
                        )
                      }
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </button>

                    <button
                      className="role-btn club-manager-btn"
                      onClick={() =>
                        updateRoleMutation.mutate(
                          {
                            id: user._id,
                            role: "clubManager",
                          },
                          {
                            onSuccess: () => {
                              Swal.fire({
                                icon: "success",
                                title: "Role Updated",
                                text: "User role changed to Manager",
                                timer: 1500,
                                showConfirmButton: false,
                              });

                              refetch();
                            },
                          }
                        )
                      }
                      disabled={user.role === "clubManager"}
                    >
                      Make Club Manager
                    </button>

                    <button
                      className="role-btn user-btn"
                      onClick={() =>
                        updateRoleMutation.mutate(
                          {
                            id: user._id,
                            role: "member",
                          },
                          {
                            onSuccess: () => {
                              Swal.fire({
                                icon: "success",
                                title: "Role Updated",
                                text: "User role changed to Member",
                                timer: 1500,
                                showConfirmButton: false,
                              });

                              refetchRole();
                              refetch();
                            },
                          }
                        )
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default UserList;
