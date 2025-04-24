import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import Topbar from "../components/topbar";
import MainpageRoutes from "./routeComponents/MainpageRoutes";
import SideBar from "../components/sidebar";
import LoginsignupRoutes from "./routeComponents/LoginsignupRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserByIdApi } from "../dataFetching/userApi/user.api";
import { setUser } from "../reduxState/Features/storeuser/userSlice";
import { useDispatch } from "react-redux";
import ErrorBoundary from "../components/errorBoundary";
import { ErrorForMainPage } from "../components/errorFallback";
import updateNotifier from "../utils/updateNotification";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isloginRegister, setisloginRegister] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByIdApi();
      dispatch(
        setUser({
          name: user?.apiResponse.data.name,
          email: user?.apiResponse.data.email,
          mobile: user?.apiResponse.data.mobile,
          adhar_card: user?.apiResponse.data.adhar_card,
        })
      );
    };
    getUser();
    updateNotifier();
  }, []);

  useEffect(() => {
    if (
      location.pathname == "/login" ||
      location.pathname == "/register" ||
      location.pathname == "/"
    ) {
      setisloginRegister(false);
    } else {
      setisloginRegister(true);
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className={`controller ${
          location.pathname === "/login" ||
          location.pathname === "/register" ||
          location.pathname === "/"
            ? "h-[100vh]"
            : "h-[97vh]"
        }   `}
      >
        {/* the page is start form here */}
        <ToastContainer />

        <LoginsignupRoutes></LoginsignupRoutes>

        {isloginRegister ? (
          <div className="page-wrapper m-3 flex h-full ">
            {/* if path is not login or signup then only show side bar */}
            <SideBar></SideBar>
            {/* if path is not login or signup then only show main */}

            <main className="headerAndMain w-full px-4 overflow-y-auto  relative ">
              <div className="sticky top-0 w-[98%]">
                <Topbar></Topbar>
              </div>
              <div className="  w-full h-[90%]  mb-16 mt-20">
                <ErrorBoundary fallback={<ErrorForMainPage />}>
                  <MainpageRoutes></MainpageRoutes>
                </ErrorBoundary>
              </div>
            </main>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
