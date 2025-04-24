import React, { useState, useEffect } from "react";
import SearchSection from "../../components/search";
import notify from "../../components/notify";
import { PaginationState, DonationListInterface } from "../../utils/types";
import {
  downloadReciept,
  getDonationByIdApi,
  getDonationListApi,
  searchDonationsByDateApiExcel,
} from "../../dataFetching/donationApi/donation.api";
import { formatDate } from "../../utils/helperFuntions";
import { useNavigate } from "react-router-dom";
import { exportToExcel } from "../../utils/helperFuntions";

const Donations: React.FC = () => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<DonationListInterface[]>([]);

  const [startDateExcel, setStartDateExcel] = useState("");
  const [endDateExcel, setEndDateExcel] = useState("");

  const [recentFilters, setRecentFilters] = useState({
    donationCategory: { change: false, submit: false },
    paymentMethod: { change: false, submit: false },
    searchText: { change: false, submit: false },
    startDate: { change: false, submit: false },
    endDate: { change: false, submit: false },
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
  });

  // it fatches the all the list without fileter
  const fetchDefaultList = async (message: string | undefined = undefined) => {
    try {
      const CustomApiResponse = await notify(
        "",
        false,
        getDonationListApi(pagination.page, pagination.limit)
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
        notify(message || apiData.message, apiData.success);
      }
    } catch (error: any) {
      notify(error.apiResponse?.data.message, false);
    }
  };
  // Handle Previous and Next buttons
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination((prev: any) => ({ ...prev, page: newPage }));
  };

  //////////////////////////////////////////////////////////////
  const handleViewReciept = async (id: number) => {
    try {
      await getDonationByIdApi(id);
    } catch (error: any) {
      notify(error.apiResponse?.data.message, false);
    }
  };
  /////////////////////////////////////////////////////////////
  const handleDownloadReciept = async (id: number) => {
    try {
      await downloadReciept(id);
    } catch (error: any) {
      notify(error.apiResponse?.data.message, false);
    }
  };

  const handleDonationEdit = async (id: number) => {
    navigate(`/editdonation/${id}`);
  };

  const DownloadExcel = async (
    startDateExcel: string,
    endDateExcel: string
  ) => {
    try {
      const CustomApiResponse = await notify(
        "",
        false,
        searchDonationsByDateApiExcel(startDateExcel, endDateExcel)
      );

      const apiData = CustomApiResponse?.apiResponse;
      console.log(apiData.data.donations, "apiData");

      if (apiData.data) {
        // console.log(apiData.data.donation, "data from the api");
        exportToExcel(apiData?.data?.donations, "Donation data");

        // if  donation retrive successfully notify
        notify(apiData.message, apiData.success);
      }
    } catch (error: any) {
      notify(error.apiResponse?.data.message, false);
    }
  };

  useEffect(() => {
    if (
      recentFilters.donationCategory.submit === false &&
      recentFilters.searchText.submit === false &&
      recentFilters.startDate.submit === false &&
      recentFilters.endDate.submit === false
    ) {
      fetchDefaultList();
    }
  }, [pagination.page]);

  return (
    <>
      <SearchSection
        setRecentFilters={setRecentFilters}
        recentFilters={recentFilters}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        pagination={pagination}
        setPagination={setPagination}
        setEndDateExcel={setEndDateExcel}
        setStartDateExcel={setStartDateExcel}
        refresh={fetchDefaultList}
      ></SearchSection>

      <div className="overflow-x-hidden mt-10 p-0 main-page_container shadow-mainShadow ">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {/* <th>id</th> */}
                <th>Receipt No.</th>
                <th>Date</th>
                <th>Authorized Person</th>
                <th>Donor</th>
                <th>Mobile</th>
                <th>Aadhar</th>
                <th>pan</th>
                <th>Payment Mode</th>
                <th>Amount</th>
                {/* <th>Items</th> */}
                <th>Edit</th>
                <th>Download</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((donation) => (
                  <tr key={donation.id}>
                    {/* <td>{donation.id}</td> */}
                    <td>{donation.receiptNo}</td>
                    <td className="text-nowrap">{formatDate(donation.date)}</td>
                    <td>{donation.authorizedPersonName}</td>
                    <td>{donation.donorName}</td>
                    <td>{donation.phoneNumber}</td>
                    <td>{donation.aadhar}</td>
                    <td>{donation.pan}</td>
                    <td>{donation.paymentMethod}</td>
                    <td>&#8377; {donation.amount}</td>
                    {/* <td>{donation._count.items}</td> */}
                    <td
                      onClick={() => handleDonationEdit(donation.id)}
                      className=" text-blue-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </td>
                    <td
                      onClick={() => handleDownloadReciept(donation.id)}
                      className=" text-blue-600 hover:underline cursor-pointer"
                    >
                      Download
                    </td>
                    <td
                      onClick={() => handleViewReciept(donation.id)}
                      className=" text-blue-600 hover:underline cursor-pointer"
                    >
                      View Receipt
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td> No data</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="px-4 py-4 flex justify-between items-center mt-4">
            <button
              className="normal-button-bg-secondary disabled:opacity-50"
              onClick={() => DownloadExcel(startDateExcel, endDateExcel)}
            >
              Download Excel
            </button>
            <div>
              <span className="text-gray-700 text-xs font-bold ">
                Showing {pagination.currentPage} to {pagination.totalPages} of{" "}
                {pagination.totalItems} results
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="normal-button-bg-secondary disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="normal-button-bg-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donations;
