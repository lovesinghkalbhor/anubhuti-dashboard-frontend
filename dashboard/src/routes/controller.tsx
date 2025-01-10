import { useEffect } from "react";

import Topbar from "../components/topbar";
import MainpageRoutes from "./routeComponents/MainpageRoutes";
import SideBar from "../components/sidebar";
import LoginsignupRoutes from "./routeComponents/LoginsignupRoutes";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import notify from "../components/notify";
import "react-toastify/dist/ReactToastify.css";
import { isTokenValid } from "../dataFetching/userApi/user.api";
function App() {
  return (
    <>
      <div
        className={`controller ${
          location.pathname === "/login" || location.pathname === "/register"
            ? "h-[100vh]"
            : "h-[97vh]"
        } overflow-clip `}
      >
        {/* the page is start form here */}
        <ToastContainer />
        <LoginsignupRoutes></LoginsignupRoutes>
        <div className="page-wrapper m-3 flex h-full ">
          {/* if path is not login or signup then only show side bar */}
          <SideBar></SideBar>
          {/* if path is not login or signup then only show main */}

          <main className="headerAndMain w-full px-4 overflow-y-auto  relative ">
            <div className="sticky top-0 w-[98%]">
              <Topbar></Topbar>
            </div>
            <div className="  w-full h-[90%]  mb-16 mt-20">
              <MainpageRoutes></MainpageRoutes>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
