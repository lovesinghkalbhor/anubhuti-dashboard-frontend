import React, { useState, useEffect } from "react";
import SearchSection from "../../components/search";
import notify from "../../components/notify";
import { PaginationState, DonationListInterface } from "../../utils/types";
import {
  getDonationByIdApi,
  getDonationListApi,
} from "../../dataFetching/donationApi/donation.api";
import { formatDate } from "../../utils/helperFuntions";

const Donations: React.FC = () => {
  const [filteredData, setFilteredData] = useState<DonationListInterface[]>([]);
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
  const handleViewReciept = async (receiptNo: number) => {
    try {
      await getDonationByIdApi(receiptNo);
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
        refresh={fetchDefaultList}
      ></SearchSection>

      <div className="overflow-x-hidden mt-10 p-0 main-page_container shadow-mainShadow ">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Receipt No.</th>
                <th>Date</th>
                <th>Authorized Person</th>
                <th>Donor Name</th>
                <th>Phone Number</th>
                <th>Amount</th>
                <th>Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((donation) => (
                  <tr key={donation.receiptNo}>
                    <td>{donation.receiptNo}</td>
                    <td>{formatDate(donation.date)}</td>
                    <td>{donation.authorizedPersonName}</td>
                    <td>{donation.donorName}</td>
                    <td>{donation.phoneNumber}</td>
                    <td>&#8377; {donation.amount}</td>
                    <td>{donation._count.items}</td>
                    <td
                      onClick={() => handleViewReciept(donation.receiptNo)}
                      className=" text-blue-600 hover:underline cursor-pointer"
                    >
                      View Receipt
                    </td>
                  </tr>
                ))
              ) : (
                <h5 className="mx-auto my-20 w-full">No data</h5>
              )}
            </tbody>
          </table>
          <div className="px-4 py-4 flex justify-between items-center mt-4">
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
