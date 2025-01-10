import { useLocation, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../reduxState/store";

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationstring =
    location.pathname.replace("/", "").charAt(0).toUpperCase() +
    location.pathname.slice(2);

  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  return (
    <div className="topbar-wrapper">
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="active:scale-90 me-3 transition-all duration-300"
        >
          <FaArrowLeft size={20}></FaArrowLeft>
        </button>

        <h2>{locationstring}</h2>
      </div>
      <div className="flex items-center gap-2 ">
        <FaUserCircle size={28}></FaUserCircle>
        <div className="flex flex-col">
          <span className="text-sm font-bold opacity-65">Authorised</span>
          <span className="text-xs font-normal -mt-1 ">{user.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
