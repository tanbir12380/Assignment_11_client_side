import React, { useEffect, useState } from "react";
import "./RecentClubs.css";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Header from "./Header";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const AllClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["clubs", searchKey, selectCategory, sortBy],
    queryFn: async () => {
      let url = `https://assignment-11-server-phi-teal.vercel.app/clubs?`;
      if (searchKey) url += `search=${searchKey}&`;
      if (selectCategory) url += `category=${selectCategory}&`;
      if (sortBy) url += `sortBy=${sortBy}&`;
      const res = await fetch(url);
      return res.json();
    },
  });

  const { data: categories, isLoading: loading3 } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-11-server-phi-teal.vercel.app/clubCategories"
      );
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

  return (
    <div style={{ paddingTop: "20px" }}>
      <Header />

      <div className="latest-clubs-section">
        <h3>
          Discover All of our <span>Clubs</span>
        </h3>

        <div className="customizationData">
          <select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by club name"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="new">Newest First</option>
            <option value="old">Oldest First</option>
            <option value="high">Highest Fee</option>
            <option value="low">Lowest Fee</option>
          </select>
        </div>

        {loading3 || isLoading ? (
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
        ) : (
          <div className="latest-clubs-container">
            {clubs.length > 0 ? (
              clubs.map((club) => (
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
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">
                <FaSearch className="no-data-icon" />
                <h4>No clubs found</h4>
                <p>Try changing your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClubs;
