import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router";

const MyJoinedEvent = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const { data: allEvents } = useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/events");
      return res.json();
    },
  });

  const { data: membershipIds } = useQuery({
    queryKey: ["membership", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/get-membership-event/${user.email}`
      );
      return res.json();
    },
  });

  useEffect(() => {
    if (!allEvents || !membershipIds) return;

    const findTheJoinedEvents = () => {
      const joinedEvents = allEvents
        .filter((event) => membershipIds.includes(event._id))
        .map((event) => ({
          ...event,
          rating: (Math.random() * 1 + 4).toFixed(1),
        }));

      setEvents(joinedEvents);
    };

    findTheJoinedEvents();
  }, [allEvents, membershipIds]);

  return (
    <div style={{ paddingTop: "20px" }}>
      <div>
        <div className="latest-clubs-container">
          {events.map((event) => (
            <div className="club-card" key={event._id}>
              <div>
                {/* fallback image if bannerImage missing */}
                <img
                  src={event.bannerImage || "/banner1.jpg"}
                  alt={event.title}
                />
              </div>

              <div>
                <h4>{event.title}</h4>

                <div className="club-meta">
                  <span className="category">{event.location}</span>
                  {event.isPaid && (
                    <span className="fee">${event.eventFee}</span>
                  )}
                  {!event.isPaid && <span className="fee">Free</span>}
                </div>

                <div className="group-info-middle">
                  <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                  {event.maxAttendees && (
                    <p>Max Attendees: {event.maxAttendees}</p>
                  )}
                  <p>
                    {event.rating} <FaRegStar />
                  </p>
                </div>

                <button>
                  <NavLink to={`/eventDetail/${event._id}`}>
                    See Details <FaArrowRightLong />
                  </NavLink>
                </button>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <p style={{ textAlign: "center", padding: "20px" }}>
              No events available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJoinedEvent;
