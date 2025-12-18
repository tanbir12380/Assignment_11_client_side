import React, { useEffect, useState } from "react";
import "./RecentClubs.css";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const AllClubs = () => {
  const [clubs, setClubs] = useState([]);

  const navigate = useNavigate();

  // Fetch data
  const { data } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-11-server-rosy-five.vercel.app/recentClubs"
      );
      return res.json();
    },
  });

  // Add random rating
  useEffect(() => {
    const transformClubs = () => {
      if (!data) return;
      const updatedClubs = data.map((club) => ({
        ...club,
        rating: (Math.random() * 1 + 4).toFixed(1),
      }));
      setClubs(updatedClubs);
    };
    transformClubs();
  }, [data]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <div className="latest-clubs-section">
        <p>LATEST CLUBS</p>
        <h3>
          Discover the <span>Clubs</span> Leading the Way
        </h3>

        <div className="latest-clubs-container">
          {clubs.map((club) => (
            <motion.div
              className="club-card"
              key={club._id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
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

                <button
                  onClick={() => {
                    navigate(`/clubDetail/${club._id}`);
                  }}
                >
                  <NavLink to={`/clubDetail/${club._id}`}>
                    See Details <FaArrowRightLong />
                  </NavLink>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClubs;
