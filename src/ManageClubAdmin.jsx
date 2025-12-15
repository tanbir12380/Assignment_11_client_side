import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./ShowAllPayments.css";
import Swal from "sweetalert2";
import { BsInfoSquareFill } from "react-icons/bs";
import { AuthContext } from "./AuthContext";

const ManageClubAdmin = () => {
  const [modalData, setModalData] = useState({});
  const modalRef = useRef();
  const {user}= useContext(AuthContext);

  const { data, refetch } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/clubsAdminList", {
          headers:{
          accesstoken: user.accessToken
        }});
      return res.json();
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (clubId) => {
      const res = await fetch(`http://localhost:3000/clubApprove/${clubId}`, {
        method: "PATCH",
         headers:{
          accesstoken: user.accessToken
        }
      });
      refetch();
      return res.json();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (clubId) => {
      const res = await fetch(`http://localhost:3000/clubReject/${clubId}`, {
        method: "PATCH",
          headers:{
          accesstoken: user.accessToken
        }
      });
      refetch();
      return res.json();
    },
  });

  const handleApprove = (clubId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "rgba(160, 0, 0, 1)",
      confirmButtonColor: "rgb(29, 77, 55)",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(clubId, {
          onSuccess: () => {
            Swal.fire("Approved!", "The club has been approved.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Failed to approve the club.", "error");
          },
        });
      }
    });
  };

  const handleDecline = (clubId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "rgba(160, 0, 0, 1)",
      confirmButtonColor: "rgb(29, 77, 55)",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(clubId, {
          onSuccess: () => {
            Swal.fire("Rejected!", "The club has been rejected.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Failed to decline the club.", "error");
          },
        });
      }
    });
  };

  return (
    <div className="payments-container">
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3
            style={{
              fontFamily: "bebas neue",
              textAlign: "center",
              fontSize: "30px",
              color: "var(--bg-primary)",
            }}
          >
            {modalData.clubName}
          </h3>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: "16px",
            }}
          >
            Members : {modalData.memberCount}
          </p>
          
            <p>Events : {modalData.eventCount}</p>
          
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <h2 className="payments-title">All Clubs</h2>

      <div className="payments-table-wrapper">
        <table
          className="payments-table"
          border="1"
          cellPadding="10"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th>Club Name</th>
              <th>Manager Email</th>
              <th>Membership Fee</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((club) => (
              <tr key={club._id}>
                <td>{club.clubName}</td>
                <td>{club.managerEmail}</td>
                <td>{club.membershipFee}$</td>
                <td>{club.status}</td>
                <td>{new Date(club.createdAt).toLocaleString()}</td>
                <td className="manage-btn-container">
                  <button
                    disabled={club.status != "pending"}
                    className="manage-btn"
                    onClick={() => handleApprove(club._id)}
                  >
                    Approve
                  </button>
                  <button
                    disabled={club.status != "pending"}
                    className="manage-btn manage-btn1"
                    onClick={() => handleDecline(club._id)}
                  >
                    Reject
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setModalData(club);
                      modalRef.current.showModal();
                    }}
                  >
                    <BsInfoSquareFill size={35}></BsInfoSquareFill>
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

export default ManageClubAdmin;
