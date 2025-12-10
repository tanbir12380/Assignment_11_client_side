import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./Home";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import Forget from "./Forget";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
      index: true,
      element: <Home></Home>
    },
    {
      path:'/register',
      element:<RegisterForm></RegisterForm>
    },{
      path:'/login',
      element:<LoginForm></LoginForm>
    },{
      path:'/forget',
      element:<Forget></Forget>
    }
    ]
  },
]);