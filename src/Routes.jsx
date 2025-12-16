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
import Forbidden from "./Forbidden";
import PrivateRoute from "./PrivateRoute";
import PrivateRoute_admin from "./privateRoute_admin";
import PrivateRoute_Manager from "./PrivateRoute_Manager";
import MyJoinedClubs from "./MyJoinedClubs";
import MyJoinedEvent from "./MyJoinedEvent";
import AllPayments from "./ShowAllPayments";
import MyPayments from "./ShowMyPayments";
import ManageClubAdmin from "./ManageClubAdmin";
import AdminDashboard from "./AdminDashboard";
import ForbiddenPro from "./ForbiddenPro";
import ClubManagerDashboard from "./ClubManagerDashboard";
import RoleBasedDashboard from "./RoleBasedDashboard";
import MemberDashboard from "./MemberDashboard";
import ClubMembersTable from "./ClubMembersTable";
import EventMembersTable from "./EventMembersTable";
import UpdateClub from "./UpdateClub";

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
      {
        path: "clubDetail/:id",
        element: (
          <PrivateRoute>
            <ClubDetails></ClubDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "allEvents",
        element: <AllEvents></AllEvents>,
      },
      {
        path: "eventDetail/:id",
        element: (
          <PrivateRoute>
            <EventDetails></EventDetails>
          </PrivateRoute>
        ),
      },
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
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        index: true,
        element: (
         <PrivateRoute> <RoleBasedDashboard></RoleBasedDashboard></PrivateRoute>
        ),
      },
       {
        path: "adminDashboard",
        element: (
          <PrivateRoute>
            <PrivateRoute_admin>
              <AdminDashboard></AdminDashboard>
            </PrivateRoute_admin>
          </PrivateRoute>
        ),
      },
      {
        path:'clubManagerDashboard',
        element:<PrivateRoute><PrivateRoute_Manager><ClubManagerDashboard></ClubManagerDashboard></PrivateRoute_Manager></PrivateRoute>
      },
      {
        path:'memberDashboard',
        element: <PrivateRoute><MemberDashboard></MemberDashboard></PrivateRoute>
      },
      {
        path: "myClub",
        element: (
          <PrivateRoute>
            <PrivateRoute_Manager>
              <MyClub></MyClub>
            </PrivateRoute_Manager>
          </PrivateRoute>
        ),
      },
      {
        path:'updateClub/:id',
        element:   <PrivateRoute>
            <PrivateRoute_Manager>
              <UpdateClub></UpdateClub>
            </PrivateRoute_Manager>
          </PrivateRoute>
      },
      {
        path: "manageClubAdmin",
        element: (
          <PrivateRoute>
            <PrivateRoute_admin>
              <ManageClubAdmin></ManageClubAdmin>
            </PrivateRoute_admin>
          </PrivateRoute>
        ),
      },
     
      {
        path: "createClub",
        element: (
          <PrivateRoute>
            <PrivateRoute_Manager>
              <CreateClub></CreateClub>
            </PrivateRoute_Manager>
          </PrivateRoute>
        ),
      },
      {
        path: "myEvent",
        element: (
          <PrivateRoute>
            <PrivateRoute_Manager>
              <MyEvents></MyEvents>
            </PrivateRoute_Manager>
          </PrivateRoute>
        ),
      },
      {
        path: "createEvent",
        element: (
          <PrivateRoute>
            <PrivateRoute_Manager>
              <CreateEvent></CreateEvent>
            </PrivateRoute_Manager>
          </PrivateRoute>
        ),
      },
      {
        path:'clubMembersTable',
          element: (
          <PrivateRoute>
            <PrivateRoute_Manager>
              <ClubMembersTable></ClubMembersTable>
            </PrivateRoute_Manager>
          </PrivateRoute>
        ),
      },
       {
        path:'eventMembersTable',
          element: (
          <PrivateRoute>
            <PrivateRoute_Manager>
              <EventMembersTable></EventMembersTable>
            </PrivateRoute_Manager>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <PrivateRoute_admin>
              <UserList></UserList>
            </PrivateRoute_admin>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/payment-success-event",
        element: <PaymentSuccessEvent></PaymentSuccessEvent>,
      },
      {
        path: "/dashboard/myJoinedClubs",
        element: <MyJoinedClubs></MyJoinedClubs>,
      },
      {
        path: "/dashboard/myJoinedEvents",
        element: <MyJoinedEvent></MyJoinedEvent>,
      },
      {
        path: "/dashboard/allPayments",
        element: (
          <PrivateRoute>
            {" "}
            <PrivateRoute_admin>
              <AllPayments></AllPayments>
            </PrivateRoute_admin>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myPayments",
        element: (
          <PrivateRoute>
            <MyPayments></MyPayments>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/forbidden",
    element: <Forbidden></Forbidden>,
  },
  {
    path:"*",
    element:<ForbiddenPro></ForbiddenPro>
  }
]);
