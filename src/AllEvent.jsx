import React, { useEffect, useState } from "react";
import "./RecentClubs.css";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Header from "./Header";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const AllEvent = () => {
  const [events, setEvents] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  // Fetch all events
  const { data, isLoading } = useQuery({
    queryKey: ["events", searchKey, sortBy],
    queryFn: async () => {
      let url = `https://assignment-11-server-phi-teal.vercel.app/events?`;
      if (searchKey) url += `search=${searchKey}&`;
      if (sortBy) url += `sortBy=${sortBy}&`;
      const res = await fetch(url);
      return res.json();
    },
  });

  useEffect(() => {
    const transformEvents = () => {
      if (!data) return;

      const updatedEvents = data.map((event) => ({
        ...event,
        rating: (Math.random() * 1 + 4).toFixed(1),
      }));

      setEvents(updatedEvents);
    };

    transformEvents();
  }, [data]);

  return (
    <div style={{ paddingTop: "20px" }}>
      <Header />

      <div className="latest-clubs-section">
        <h3>
          Explore All <span>Events</span>
        </h3>

        <div className="customizationData">
          <input
            type="text"
            placeholder="Search by event name"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="new">Farthest Date</option>
            <option value="old">Nearest Date</option>
            <option value="high">Highest Fee</option>
            <option value="low">Lowest Fee</option>
          </select>
        </div>

        {isLoading ? (
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
            {events.length > 0 ? (
              events.map((event) => (
                <div className="club-card" key={event._id}>
                  <div>
                    <img src={event?.bannerImage} alt={event.title} />
                  </div>

                  <div>
                    <h4>{event.title}</h4>

                    <div className="club-meta">
                      <span className="category">{event.location}</span>
                      <span className="fee">
                        {event.eventFee > 0 ? `Fee:$${event.eventFee}` : "Free"}
                      </span>
                    </div>

                    <div className="group-info-middle">
                      <p>
                        Date: {new Date(event.eventDate).toLocaleDateString()}
                      </p>
                      {event.maxAttendees && (
                        <p>Max Attendees: {event.maxAttendees}</p>
                      )}
                      <p>
                        {event.rating} <FaRegStar />
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate(`/eventDetail/${event._id}`);
                      }}
                    >
                      <NavLink to={`/eventDetail/${event._id}`}>
                        See Details <FaArrowRightLong />
                      </NavLink>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">
                <FaSearch className="no-data-icon" />
                <h4>No events found</h4>
                <p>Try changing your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvent;
