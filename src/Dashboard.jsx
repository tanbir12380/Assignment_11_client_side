import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { SquarePen } from "lucide-react";
import { RiFolderUserLine } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import "./Dashboard.css";
import { NavLink, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Dashboard = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <div className="drawer_container drawer lg:drawer-open">
      <nav className="navbar w-full dash-nav">
        <label htmlFor="my-drawer-4" aria-label="open sidebar">
          <HiOutlineMenu size={35}></HiOutlineMenu>
        </label>
        <div>ClubSphere</div>
      </nav>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="outlet-container">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <div
          style={{
            minHeight: "100vh",
          }}
          className="flex  flex-col items-center  is-drawer-close:w-16 is-drawer-open:w-64"
        >
          <ul className=" w-full grow menu  dash-side-bar">
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <NavLink to="/">
                  <IoHomeSharp size={24}></IoHomeSharp>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </NavLink>
              </button>
            </li>

            {/*  for admin */}

            {userRole === "admin" && (
              <>
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Overiew"
                  >
                    {/* admin overview */}
                    <MdAdminPanelSettings size={24}></MdAdminPanelSettings>
                    <span className="is-drawer-close:hidden">Overview</span>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage users"
                  >
                    {/* admin - member management */}
                    <NavLink to="/dashboard/users">
                      <MdManageAccounts size={24}></MdManageAccounts>
                      <span className="is-drawer-close:hidden">
                        Manage users
                      </span>
                    </NavLink>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage clubs"
                  >
                    {/* admin - manage clubs */}
                    <LiaLayerGroupSolid size={24}></LiaLayerGroupSolid>
                    <span className="is-drawer-close:hidden">Manage clubs</span>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payments"
                  >
                    {/* admin - manage payments  */}
                    <NavLink to="/dashboard/allPayments">
                      <RiSecurePaymentLine size={24}></RiSecurePaymentLine>
                      <span className="is-drawer-close:hidden">Payments</span>
                    </NavLink>
                  </button>
                </li>
              </>
            )}

            {/* club manager */}
            {userRole == "clubManager" && (
              <>
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Overiew"
                  >
                    {/* manager overview */}
                    <MdAdminPanelSettings size={24}></MdAdminPanelSettings>
                    <span className="is-drawer-close:hidden">Overview</span>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    {/* manager - my clubs */}
                    <NavLink to="/dashboard/myClub">
                      <LiaLayerGroupSolid size={24}></LiaLayerGroupSolid>
                      <span className="is-drawer-close:hidden">My Clubs</span>
                    </NavLink>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Clubs members"
                  >
                    {/* manager - my clubs members */}
                    <MdGroups2 size={24}></MdGroups2>
                    <span className="is-drawer-close:hidden">
                      Clubs members
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Event management"
                  >
                    {/* manager - my events */}
                    <NavLink to="/dashboard/myEvent">
                      <MdOutlineEventAvailable
                        size={24}
                      ></MdOutlineEventAvailable>
                      <span className="is-drawer-close:hidden">
                        Event management
                      </span>
                    </NavLink>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Event registration"
                  >
                    {/* manager - my events register */}
                    <SquarePen size={24} />
                    <span className="is-drawer-close:hidden">
                      Event registration
                    </span>
                  </button>
                </li>
              </>
            )}

            {/*  member */}

            {userRole == "member" && (
              <>
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Overiew"
                  >
                    {/* member overview */}
                    <RiFolderUserLine size={24}></RiFolderUserLine>
                    <span className="is-drawer-close:hidden">Overview</span>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    {/* member - my clubs  */}
                    <NavLink to="/dashboard/myJoinedClubs">
                      <MdGroups2 size={24}></MdGroups2>
                      <span className="is-drawer-close:hidden">My Clubs </span>
                    </NavLink>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Event management"
                  >
                    {/* member - my events  */}
                    <NavLink to="/dashboard/myJoinedEvents">
                      <MdOutlineEventAvailable
                        size={24}
                      ></MdOutlineEventAvailable>
                      <span className="is-drawer-close:hidden">My Event </span>
                    </NavLink>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payments"
                  >
                    {/* member - manage payments  */}
                    <NavLink to="/dashboard/myPayments">
                      <RiSecurePaymentLine size={24}></RiSecurePaymentLine>
                      <span className="is-drawer-close:hidden">
                        My Payments
                      </span>
                    </NavLink>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
