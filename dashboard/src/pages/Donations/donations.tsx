import React, { useState, useEffect } from "react";
import SearchSection from "../../components/search";
import notify from "../../components/notify";
import {
  getDonationByIdApi,
  getDonationListApi,
  searchDonationByDetailsApi,
  searchDonationsByDateApi,
} from "../../dataFetching/donationApi/donation.api";
import { formatDate } from "../../utils/helperFuntions";
interface Donation {
  receiptNo: number;
  date: string;
  authorizedPersonName: string;
  donorName: string;
  phoneNumber: string;
  amount: number;
  _count: any;
}

const Donations: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Donation[]>([]);

  const [page, setpage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1); // Dynamically updated based on API response
  const [totalItems, setTotalItems] = useState(0); // Dynamically updated based on API response
  const [currentPage, setCurrentPage] = useState(1); // Dynamically updated based on API response

  const handleSearch = async (
    searchText: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      if (searchText.length) {
        const CustomApiResponse = await notify(
          "",
          false,
          searchDonationByDetailsApi(searchText)
        );
        const apiData = CustomApiResponse?.apiResponse;
        console.log(apiData.data.donations, "apiData");

        if (apiData.data) {
          // console.log(apiData.data.donation, "data from the api");
          setFilteredData(apiData?.data?.donations);

          setTotalPages(Math.ceil(apiData.data?.pagination.totalPages)); // Assuming API provides `total` items count
          setTotalItems(Math.ceil(apiData.data?.pagination.totalItems)); // Assuming API provides `total` items count
          setCurrentPage(Math.ceil(apiData.data?.pagination.currentPage)); // Assuming API provides `total` items count
          // if  donation retrive successfully notify
          notify(apiData.message, apiData.success);
        } else {
          notify("No data found", true);
          setFilteredData([]);
        }
      }

      if (startDate.length && endDate.length) {
        console.log(startDate, endDate, "searchDonationsByDateApi");

        const CustomApiResponse = await searchDonationsByDateApi(
          startDate,
          endDate
        );

        const apiData = CustomApiResponse?.apiResponse;
        console.log(apiData.data.donations, "apiData");

        if (apiData.data) {
          // console.log(apiData.data.donation, "data from the api");
          setFilteredData(apiData?.data?.donations);

          setTotalPages(Math.ceil(apiData.data?.pagination.totalPages)); // Assuming API provides `total` items count
          setCurrentPage(Math.ceil(apiData.data?.pagination.currentPage)); // Assuming API provides `total` items count
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

  // it fatches the all the list without fileter
  const fetchDefaultList = async (message: string | undefined = undefined) => {
    try {
      const CustomApiResponse = await notify(
        "",
        false,
        getDonationListApi(page, limit)
      );

      const apiData = CustomApiResponse?.apiResponse;
      console.log(apiData.data.donations, "apiData");

      if (apiData.data) {
        // console.log(apiData.data.donation, "data from the api");
        setFilteredData(apiData?.data?.donations);

        setTotalPages(Math.ceil(apiData.data?.pagination.totalPages)); // Assuming API provides `total` items count
        setTotalItems(Math.ceil(apiData.data?.pagination.totalItems)); // Assuming API provides `total` items count
        setCurrentPage(Math.ceil(apiData.data?.pagination.currentPage)); // Assuming API provides `total` items count
        // if  donation retrive successfully notify
        notify(message || apiData.message, apiData.success);
      }
    } catch (error: any) {
      notify(error.apiResponse?.data.message, false);
    }
  };
  // Handle Previous and Next buttons
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setpage(newPage);
  };
  const handleViewReciept = async (receiptNo: number) => {
    try {
      await getDonationByIdApi(receiptNo);
    } catch (error: any) {
      notify(error.apiResponse?.data.message, false);
    }
  };
  useEffect(() => {
    fetchDefaultList();
  }, [page]);

  return (
    <>
      <SearchSection
        onSearch={handleSearch}
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
                Showing {currentPage} to {totalPages} of {totalItems} results
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="normal-button-bg-secondary disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
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
