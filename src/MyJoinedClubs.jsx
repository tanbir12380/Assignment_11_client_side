import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router";

const MyJoinedClubs = () => {
  const { user } = useContext(AuthContext);
  const [clubs, setClubs] = useState([]);

  const { data: allClubs } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/clubs");
      return res.json();
    },
  });

  const { data: membershipIds } = useQuery({
    queryKey: ["membership", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/get-membership/${user.email}`
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

  return (
    <div style={{ paddingTop: "20px" }}>
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
