import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { validateSearchText, validateDate } from "../utils/helperFuntions";
import notify from "./notify";
interface SearchSectionProps {
  onSearch: (searchText: string, startDate: string, endDate: string) => void;
  refresh: (message: string | undefined) => Promise<void>;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, refresh }) => {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const handleSearch = () => {
    if (
      !validateSearchText(searchText) &&
      (!validateDate(startDate) || !validateDate(endDate))
    ) {
      notify(
        "Start, endDate and Search text should not be empty and must be alphanumeric (A-Z, a-z, 0-9)",
        false
      );
      return;
    }

    onSearch(searchText, startDate, endDate);
  };
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  // Close dropdown when clicking outside
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

  return (
    <div className="search_container">
      {/* Search Input */}

      <div className="search_container-input">
        <div className="lg:w-3/4   w-full flex items-center space-x-5">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onFocus={() => {
              setEndDate("");
              setStartDate("");
            }}
            className="text_search-input"
          />
          <button
            className=""
            onClick={() => {
              refresh("Clear the search result successfuly");
              setSearchText("");
              setEndDate("");
              setStartDate("");
            }}
          >
            <MdOutlineCancel size={20} />
          </button>
        </div>

        {/* Search By Date Dropdown */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button
            onClick={() => {
              setShowDateDropdown(!showDateDropdown);
              setSearchText("");
            }}
            className="active:scale-95 transition-all text-nowrap duration-300 cursor-pointer text-xs flex content-center border-2 border-opacity-30  rounded-full px-4 py-1  border-black"
          >
            <span> Search by date</span>
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

      {/* Search Button */}
      <div>
        <button onClick={handleSearch} className="normal-button-bg-secondary">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
