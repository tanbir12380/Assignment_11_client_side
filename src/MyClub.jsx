import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const MyClub = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: userClubs, isLoading: clubsLoading } = useQuery({
    queryKey: ["userClubs", user.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/getClubs/${user.email}`, {
        headers: {
          accesstoken: user.accessToken,
        },
      });
      return res.json();
    },
  });

  if (clubsLoading) {
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

  return (
    <div>
      <div
        className="latest-clubs-section"
        style={{ backgroundColor: "white", paddingTop: "0" }}
      >
        <h3>
          Your <span>Clubs</span>
        </h3>
        <div className="createEventButton">
          <button
            onClick={() => {
              navigate("/dashboard/createClub");
            }}
            className="contact-btn"
          >
            <NavLink to="/dashboard/createClub">
              <FaPlus></FaPlus> Create Club
            </NavLink>
          </button>
        </div>
        <div className="latest-clubs-container">
          {userClubs.map((club) => (
            <div className="club-card" key={club._id}>
              <div>
                <img src={club.bannerImage} alt={club.clubName} />
              </div>

              <div>
                <h4>{club.clubName}</h4>

                <div className="club-meta">
                  <span className="category">{club.category}</span>
                  <span className="category">Status: {club.status}</span>
                  <span className="fee">${club.membershipFee}</span>
                </div>

                <div className="group-info-middle">
                  <p>{club.memberCount} members</p>

                  <p>
                    {club.rating} <FaRegStar />
                  </p>
                </div>

                <div className="managerClubButtons">
                  <button
                    onClick={() => {
                      navigate(`/clubDetail/${club._id}`);
                    }}
                  >
                    <NavLink to={`/clubDetail/${club._id}`}>
                      {" "}
                      See Details <FaArrowRightLong />
                    </NavLink>
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/dashboard/updateClub/${club._id}`);
                    }}
                  >
                    <NavLink to={`/dashboard/updateClub/${club._id}`}>
                      {" "}
                      Update club <FaArrowRightLong />
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h4
          style={{
            fontFamily: "bebas neue",
            fontSize: "24px",
            textAlign: "center",
            paddingBottom: "5px",
            paddingTop: "80px",
          }}
        >
          Disclaimer for Club Managers
        </h4>
        <p>
          If you update any approved club, it will be temporarily hidden from
          members until an admin reviews and approves the changes. If your club
          gets rejected, please update it accordingly. The club will then return
          to pending status, and the admin may reconsider it for approval.
        </p>
      </div>
    </div>
  );
};

export default MyClub;
