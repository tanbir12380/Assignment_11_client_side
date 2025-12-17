import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyEvents = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userEvents, setEvents] = useState([]);

  const {
    data,
    isLoading: clubsLoading,
    refetch,
  } = useQuery({
    queryKey: ["userClubs", user.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/getEvents/${user.email}`, {
        headers: {
          accesstoken: user.accessToken,
        },
      });
      return res.json();
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) => {
      const res = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
        headers: {
          accesstoken: user.accessToken,
        },
      });

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
          Your <span> Events</span>
        </h3>
        <div
          style={{
            width: "100%",
            paddingLeft: "220px",
            paddingBottom: "30px",
          }}
        >
          <button
            onClick={() => {
              navigate("/dashboard/createEvent");
            }}
            className="contact-btn"
          >
            <NavLink to="/dashboard/createEvent">
              <FaPlus></FaPlus> Create Event
            </NavLink>
          </button>
        </div>
        <div className="latest-clubs-container">
          {userEvents.map((event) => (
            <div className="club-card" key={event._id}>
              <div>
                <img src={event.bannerImage} alt={event.title} />
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

                <div className="managerClubButtons">
                  <button
                    onClick={() => {
                      navigate(`/eventDetail/${event._id}`);
                    }}
                  >
                    <NavLink to={`/eventDetail/${event._id}`}>
                      See Details <FaArrowRightLong />
                    </NavLink>
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/dashboard/eventUpdate/${event._id}`);
                    }}
                  >
                    <NavLink to={`/dashboard/eventUpdate/${event._id}`}>
                      Update Event <FaArrowRightLong />
                    </NavLink>
                  </button>
                  <button
                    onClick={() => {
                      deleteEventMutation.mutate(event._id);

                      Swal.fire({
                        icon: "success",
                        allowOutsideClick: false,
                        title: "Event is deleted!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      refetch();
                    }}
                  >
                    Delete Event <FaArrowRightLong />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {userEvents.length === 0 && (
            <p style={{ textAlign: "center", padding: "20px" }}>
              No events available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
