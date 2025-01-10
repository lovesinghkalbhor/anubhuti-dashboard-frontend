import { RiDashboardFill } from "react-icons/ri";
import { BiSolidDonateHeart } from "react-icons/bi";
import { BiSolidUserPin } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { LogoutApi } from "../dataFetching/userApi/user.api";
import notify from "./notify";
function SideBar() {
  const navigate = useNavigate();

  const location = useLocation(); // To get the current active route
  const handleLogout = async () => {
    try {
      // Call the logout API
      const CustomApiResponse = await LogoutApi();

      const apiData = CustomApiResponse?.apiResponse;

      // Notify the user of successful logout
      if (!CustomApiResponse?.storageStatus) {
        notify(
          "Session cleared, but some settings couldn't be saved. Please restart the app or clear your data manually.",
          false
        );
      }
      if (apiData.success) {
        notify(apiData.message, true);
        navigate("/login");
        return;
      }
    } catch (error: any) {
      notify(error.message || "Logout failed. Please try again.", false);
      navigate("/login");
    }
  };
  const links = [
    {
      to: "/dashboard",
      icon: <RiDashboardFill size={20} color="white" />,
      label: "Dashboard",
    },
    {
      to: "/donation",
      icon: <BiSolidDonateHeart size={20} color="white" />,
      label: "Donations",
    },
    {
      to: "/user",
      icon: <BiSolidUserPin size={20} color="white" />,
      label: "User",
    },
    // {
    //   to: "/register",
    //   icon: <BiSolidUserPin size={20} color="white" />,
    //   label: "Register",
    // },
  ];
  return (
    <>
      <div className="sidebar-wrapper">
        <h1>ANUBHUTI</h1>

        <div className="sidebar-wrapper_links_container">
          {links.map((link) => (
            <Link to={link.to} key={link.to} className="sidebar-wrapper_link">
              <div
                className={`duration-300 transition-all p-2 rounded-full 
                ${
                  location.pathname === link.to
                    ? "bg-secondaryColor text-white" // Circle background for active link
                    : "bg-transparent"
                } 
                `}
              >
                {link.icon}
              </div>
              <h6>{link.label}</h6>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="sidebar-wrapper_link"
            data-logout="logout"
          >
            <div
              className={`duration-300 transition-all p-2 rounded-full
                ${
                  location.pathname === "/logout"
                    ? "bg-red-600 text-white" // Circle background for active link
                    : "bg-transparent"
                }`}
            >
              <IoLogOut
                color="white"
                size={20}
                className="sidebar-wrapper_link_icon"
              />{" "}
            </div>

            <h6>Logout</h6>
          </button>
          {/* <Link to={"/donation"} className="sidebar-wrapper_link">
            <BiSolidDonateHeart
              color="white"
              size={20}
              className="sidebar-wrapper_link_icon"
            />
            <h6>Dontions</h6>
          </Link>
          <Link to={"/user"} className="sidebar-wrapper_link">
            <BiSolidUserPin
              color="white"
              size={20}
              className="sidebar-wrapper_link_icon"
            />
            <h6>User</h6>
          </Link>
          <Link
            to={"/logout"}
            className="sidebar-wrapper_link"
            data-logout="logout"
          >
            <IoLogOut
              color="white"
              size={20}
              className="sidebar-wrapper_link_icon"
            />
            <h6>Logout</h6>
          </Link> */}
        </div>
      </div>
    </>
  );
}
export default SideBar;
