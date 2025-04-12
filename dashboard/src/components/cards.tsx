import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxState/store";
import { IoMdArrowDropdown } from "react-icons/io";
import { calculateDonationsByDateApi } from "../dataFetching/donationApi/donation.api";
import notify from "./notify";

function Cards() {
  const user = useSelector((state: RootState) => state.user);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [calculateByDate, setCalculateByDate] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown
  const handleSearch = async (startDate: string, endDate: string) => {
    try {
      if (startDate.length && endDate.length) {
        const CustomApiResponse = await calculateDonationsByDateApi(
          startDate,
          endDate
        );

        const apiData = CustomApiResponse?.apiResponse;

        if (apiData.data) {
          setCalculateByDate(apiData?.data?.totalDonations);

          // if  donation retrive successfully notify
          notify(apiData.message, apiData.success);
        } else {
          notify("No data found", true);
          setCalculateByDate(0);
        }
      }
    } catch (error: any) {
      console.error(error);
      notify(error.apiResponse?.data.message, false);
    }

    //
    //   setFilteredData(filtered);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // const [showForm, setshowForm] = useState(false);
  return (
    <>
      <div className="grid grid-cols-12 lg:h-56 h-fit gap-5">
        <div className="lg:col-span-7 col-span-12 rounded-3xl shadow-mainShadow bg-primaryColor text-white p-8">
          <h3 className="font-semibold text-2xl mb-5">
            Welcome to Anubhuti {user.name}
          </h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            iusto perferendis, corrupti vel suscipit fugit iure! Sit facere
            repellendus, at sed qui fugiat porro facilis. Facere quaerat eius
            obcaecati adipisci?
          </p>
        </div>
        <div className="lg:col-span-5 col-span-12 rounded-3xl shadow-mainShadow bg-white p-8">
          <div className="flex h-full justify-between">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-lg opacity-80">
                  Total Donation
                </h3>
                <h2 className="font-medium text-[2rem] text-blue-500">
                  <span>&#8377;</span>
                  {calculateByDate}
                </h2>
              </div>
              <button
                onClick={() => handleSearch(startDate, endDate)}
                className="normal-button-bg-secondary"
              >
                Calculate
              </button>
            </div>
            {/* search dropdown */}
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                onClick={() => {
                  setShowDateDropdown(!showDateDropdown);
                }}
                className="active:scale-95 transition-all text-nowrap duration-300 cursor-pointer text-xs flex content-center border-2 border-opacity-30  rounded-full px-4 py-1  border-black"
              >
                <span> Calculate by date</span>
                <span>
                  <IoMdArrowDropdown size={18} />
                </span>
              </button>

              {/* Dropdown for Start and End Date */}
              {showDateDropdown && (
                <div className="absolute text-sm top-10 left-0 bg-white border border-gray-300 rounded-md p-2 shadow-lg z-10">
                  <div style={{ marginBottom: "8px" }}>
                    <label className="text-xs font-semibold">Start Date:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ marginLeft: "8px" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold">End Date:</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ marginLeft: "8px" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
