import React, { useEffect, useState } from "react";
import "./RecentClubs.css"; 
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Header from "./Header";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router";

const AllEvent = () => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  // Fetch all events
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/events");
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

  if (isLoading) return <p style={{ textAlign: "center", padding: "40px" }}>Loading events...</p>;

  return (
    <div style={{ paddingTop: "20px" }}>
      <Header />

      <div className="latest-clubs-section">
        <h3>
          Explore All <span>Events</span>
        </h3>

        <div className="latest-clubs-container">
          {events.map((event) => (
            <div className="club-card" key={event._id}>
              <div>
               
                <img src={event?.bannerImage} alt={event.title} />
              </div>

              <div>
                <h4>{event.title}</h4>

                <div className="club-meta">
                  <span className="category">{event.location}</span>
                  {event.isPaid && <span className="fee">${event.eventFee}</span>}
                  {!event.isPaid && <span className="fee">Free</span>}
                </div>

                <div className="group-info-middle">
                  <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                  {event.maxAttendees && <p>Max Attendees: {event.maxAttendees}</p>}
                  <p>
                    {event.rating} <FaRegStar />
                  </p>
                </div>

                <button onClick={()=>{
                  navigate(`/eventDetail/${event._id}`)
                }}>
                  <NavLink to={`/eventDetail/${event._id}`}>
                    See Details <FaArrowRightLong />
                  </NavLink>
                </button>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <p style={{ textAlign: "center", padding: "20px" }}>No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEvent;
