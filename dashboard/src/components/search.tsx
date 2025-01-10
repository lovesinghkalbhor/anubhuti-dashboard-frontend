import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface SearchSectionProps {
  onSearch: (searchText: string, startDate: string, endDate: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const handleSearch = () => {
    onSearch(searchText, startDate, endDate);
  };

  return (
    <div className="search_container">
      {/* Search Input */}

      <div className="search_container-input">
        <div className="lg:w-3/4  w-full">
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
        </div>

        {/* Search By Date Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              setShowDateDropdown(!showDateDropdown);
              setSearchText("");
            }}
            className="cursor-pointer text-sm flex content-center"
          >
            <span> Search by date</span>
            <span>
              <IoMdArrowDropdown />
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
