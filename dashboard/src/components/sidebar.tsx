import { useState, useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidDonateHeart } from "react-icons/bi";
import { BiSolidUserPin } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { LogoutApi } from "../dataFetching/userApi/user.api";
import notify from "./notify";
import { GiHamburgerMenu } from "react-icons/gi";

function SideBar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Initial screen width

  useEffect(() => {
    // Function to handle screen resize
    const handleResize = () => {
      // setScreenWidth(window.innerWidth); // Update the screen width state
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false); // Close sidebar for small screens
      } else {
        setIsSidebarOpen(true); // Open sidebar for large screens
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handler once on mount to set initial state
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this runs only once

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

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
  ];

  return (
    <>
      <div className="sidebar-wrapper">
        <div className="flex mx-5 mt-3">
          <button
            onClick={handleToggleSidebar}
            className="invert  top-6 left-2 rounded-full "
          >
            <GiHamburgerMenu size={20} />
          </button>
          {isSidebarOpen ? <h1>ANUBHUTI</h1> : null}
        </div>

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
              {isSidebarOpen ? <h6>{link.label}</h6> : null}
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

            {isSidebarOpen ? <h6>Logout</h6> : null}
          </button>
        </div>
      </div>
    </>
  );
}
export default SideBar;
