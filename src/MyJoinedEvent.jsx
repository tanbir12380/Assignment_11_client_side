import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router";
import "./RecentClubs.css";

const MyJoinedEvent = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const { data: allEvents, isLoading: loading1 } = useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-11-server-phi-teal.vercel.app/events"
      );
      return res.json();
    },
  });

  const { data: membershipIds, isLoading: loading2 } = useQuery({
    queryKey: ["membership", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-11-server-phi-teal.vercel.app/get-membership-event/${user.email}`,
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
        Events you joined
      </h2>
      <div>
        <div className="latest-clubs-container">
          {events.map((event) => (
            <div className="club-card" key={event._id}>
              <div>
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
        </div>
      </div>
    </div>
  );
};

export default MyJoinedEvent;
