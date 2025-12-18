import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router";
import "./RecentClubs.css";

const MyJoinedClubs = () => {
  const { user } = useContext(AuthContext);
  const [clubs, setClubs] = useState([]);

  const { data: allClubs, isLoading: loading1 } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-11-server-rosy-five.vercel.app/clubs"
      );
      return res.json();
    },
  });

  const { data: membershipIds, isLoading: loading2 } = useQuery({
    queryKey: ["membership", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-11-server-rosy-five.vercel.app/get-membership/${user.email}`,
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );
      return res.json();
    },
  });

  useEffect(() => {
    if (!allClubs || !membershipIds) return;

    const findTheJoinedClubs = () => {
      const joinedClubs = allClubs
        .filter((club) => membershipIds.includes(club._id))
        .map((club) => ({
          ...club,
          rating: (Math.random() * 1 + 4).toFixed(1),
        }));

      setClubs(joinedClubs);
    };

    findTheJoinedClubs();
  }, [allClubs, membershipIds]);

  if (loading1 || loading2) {
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
      <h2
        style={{
          fontFamily: "bebas neue",
          fontSize: "30px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Clubs you joined
      </h2>
      <div>
        <div className="latest-clubs-container">
          {clubs.map((club) => (
            <div className="club-card" key={club._id}>
              <div>
                <img src={club.bannerImage} alt={club.clubName} />
              </div>

              <div>
                <h4>{club.clubName}</h4>

                <div className="club-meta">
                  <span className="category">{club.category}</span>
                  <span className="fee">${club.membershipFee}</span>
                </div>

                <div className="group-info-middle">
                  <p>{club.memberCount} members</p>

                  <p>
                    {club.rating} <FaRegStar />
                  </p>
                </div>

                <button>
                  <NavLink to={`/clubDetail/${club._id}`}>
                    {" "}
                    See Details <FaArrowRightLong />
                  </NavLink>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyJoinedClubs;
