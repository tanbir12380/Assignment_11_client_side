import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;
