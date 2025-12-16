import React, { useEffect, useState } from "react";
import "./RecentClubs.css";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Header from "./Header";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router";

const AllClubs = () => {
  const [clubs, setClubs] = useState([]);
const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/clubs");
      return res.json();
    },
  });

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


  if(isLoading){
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
    <div style={{ paddingTop: "20px" }}>
      <Header />

      <div className="latest-clubs-section">
        <h3>
          Discover All of our <span>Clubs</span>
        </h3>

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

                <button onClick={()=>{
                  navigate(`/clubDetail/${club._id}`)
                }}>
                 <NavLink to={`/clubDetail/${club._id}`}> See Details <FaArrowRightLong /></NavLink>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClubs;
