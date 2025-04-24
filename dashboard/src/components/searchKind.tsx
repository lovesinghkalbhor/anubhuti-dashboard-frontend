import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { validateSearchText, validateDate } from "../utils/helperFuntions";
import notify from "./notify";
import { FaFilter } from "react-icons/fa6";
import {
  searchKindDonationsByDateApi,
  searchKindDonationByDetailsApi,
} from "../dataFetching/donationApi/donation.api";
import FilterModalKind from "./FilterModelKind";

interface SearchSectionProps {
  refresh: (message: string | undefined) => Promise<void>;
  setRecentFilters: any;
  recentFilters: any;
  filteredData: any;
  setFilteredData: any;
  pagination: any;
  setPagination: any;
  setStartDateExcel: any;
  setEndDateExcel: any;
}

const SearchSectionKind: React.FC<SearchSectionProps> = ({
  refresh,
  setRecentFilters,
  recentFilters,
  filteredData,
  setFilteredData,
  pagination,
  setPagination,
  setStartDateExcel,
  setEndDateExcel,
}) => {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

  const onSearch = async (
    searchText: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      if (searchText.length) {
        const CustomApiResponse = await notify(
          "",
          false,
          searchKindDonationByDetailsApi(
            searchText,
            pagination.page,
            pagination.limit
          )
        );
        const apiData = CustomApiResponse?.apiResponse;
        console.log(apiData.data.donations, "apiData");

        if (apiData.data) {
          // console.log(apiData.data.donation, "data from the api");
          setFilteredData(apiData?.data?.donations);

          setPagination((prev: any) => ({
            ...prev,
            totalPages: apiData.data.pagination.totalPages,
            totalItems: apiData.data.pagination.totalItems,
            currentPage: apiData.data.pagination.currentPage,
          }));
          // if  donation retrive successfully notify
          notify(apiData.message, apiData.success);
        } else {
          notify("No data found", true);
          setFilteredData([]);
        }
      }

      if (startDate.length && endDate.length) {
        const CustomApiResponse = await searchKindDonationsByDateApi(
          startDate,
          endDate,
          pagination.page,
          pagination.limit
        );

        const apiData = CustomApiResponse?.apiResponse;
        console.log(apiData.data.donations, "apiData");

        if (apiData.data) {
          // console.log(apiData.data.donation, "data from the api");
          setFilteredData(apiData?.data?.donations);

          setPagination((prev: any) => ({
            ...prev,
            totalPages: apiData.data.pagination.totalPages,
            totalItems: apiData.data.pagination.totalItems,
            currentPage: apiData.data.pagination.currentPage,
          }));
          // if  donation retrive successfully notify
          notify(apiData.message, apiData.success);
        } else {
          notify("No data found", true);
          setFilteredData([]);
        }
      }
    } catch (error: any) {
      console.error(error);
      notify(error.apiResponse?.data.message, false);
    }

    //
    //   setFilteredData(filtered);
  };

  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  useEffect(() => {
    if (
      recentFilters.searchText.submit === true ||
      recentFilters.startDate.submit === true
    ) {
      handleSearch();
    }
  }, [pagination.page]);

  return (
    <>
      <div className="search_container">
        {/* Search Input */}

        <div className="search_container-input">
          <div className="lg:w-3/4   w-full flex items-center space-x-5">
            <input
              ref={inputRef}
              name="searchText"
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setRecentFilters((prev: any) => {
                  const newFilters: typeof recentFilters = {};

                  for (const key in prev) {
                    newFilters[key] = { change: false, submit: false }; // Reset all to default
                  }

                  return {
                    ...newFilters, // Apply the default empty state
                    [e.target.name]: { change: true, submit: false }, // Dynamically update the changed field
                  };
                });
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
                setRecentFilters((prev: any) => {
                  const newFilters: typeof recentFilters = { ...prev };

                  for (const key in newFilters) {
                    newFilters[key] = { change: false, submit: false };
                  }

                  return newFilters;
                });
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
                    name="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setStartDateExcel(e.target.value);
                      setRecentFilters((prev: any) => {
                        const newFilters: typeof recentFilters = {};

                        for (const key in prev) {
                          newFilters[key] = {
                            change: false,
                            submit: prev[key].submit,
                          }; // Reset all to default
                        }

                        return {
                          ...newFilters, // Apply the default empty state
                          [e.target.name]: {
                            change: true,
                            submit: prev[e.target.name].submit,
                          }, // Dynamically update the changed field
                        };
                      });
                    }}
                    style={{ marginLeft: "8px" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">End Date:</label>
                  <input
                    name="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setEndDateExcel(e.target.value);
                    }}
                    style={{ marginLeft: "8px" }}
                  />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsFilterModalOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        {/* Search Button */}
        <div>
          <button
            onClick={() => {
              handleSearch();

              setRecentFilters((prev: any) => {
                const newFilters: typeof recentFilters = { ...prev };

                for (const key in newFilters) {
                  if (newFilters[key].change === true) {
                    newFilters[key] = { change: true, submit: true };
                  }
                }

                return newFilters;
              });
            }}
            className="normal-button-bg-secondary"
          >
            Search
          </button>
        </div>
      </div>
      {/* Filter Modal */}
      <FilterModalKind
        setRecentFilters={setRecentFilters}
        recentFilters={recentFilters}
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default SearchSectionKind;
