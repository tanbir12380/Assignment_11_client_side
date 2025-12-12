import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./Home";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import Forget from "./Forget";
import Dashboard from "./Dashboard";
import AllClubs from "./AllClubs";
import AllEvents from "./AllEvent";
import MyClub from "./MyClub";
import CreateClub from "./CreateClub";
import ClubDetails from "./ClubDetails";
import MyEvents from "./MyEvents";
import CreateEvent from "./CreateEvent";
import EventDetails from "./EventDetails";
import UserList from "./UserList";
import PaymentSuccess from "./PaymentSuccess";
import PaymentSuccessEvent from "./PaymentSuccess-event";
import Profile from "./Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "allClubs",
        element: <AllClubs></AllClubs>,
      },
      { path: "clubDetail/:id", element: <ClubDetails></ClubDetails> },
      {
        path: "allEvents",
        element: <AllEvents></AllEvents>,
      },
      { path: "eventDetail/:id", element: <EventDetails></EventDetails> },
      {
        path: "/register",
        element: <RegisterForm></RegisterForm>,
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>,
      },
      {
        path: "/forget",
        element: <Forget></Forget>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "myClub",
        element: <MyClub></MyClub>,
      },
      {
        path: "createClub",
        element: <CreateClub></CreateClub>,
      },
      {
        path: "myEvent",
        element: <MyEvents></MyEvents>,
      },
      {
        path: "createEvent",
        element: <CreateEvent></CreateEvent>,
      },
      {
        path: "users",
        element: <UserList></UserList>,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/payment-success-event",
        element: <PaymentSuccessEvent></PaymentSuccessEvent>,
      },
    ],
  },
]);
