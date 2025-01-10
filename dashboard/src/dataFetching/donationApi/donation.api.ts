import api from "../../utils/axios";
import { CustomApiResponse } from "../../utils/apiResponse";
import { handleApiError } from "../../utils/apiErrors";
import { DonationDataInterface } from "../../utils/types";

const getDonationListApi = async (page: number, limit: number) => {
  try {
    const response = await api.get(`/donations/getDonation`, {
      params: { page, limit },
    });

    // Create the custom response for frontend
    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

const getDonationByIdApi = async (id: number) => {
  try {
    const response = await api.get(`viewInvoice/invoice?receiptNo=${id}`);

    // Create a new browser-like window to display the HTML
    const newTab = window.open();
    if (newTab) {
      newTab.document.open();
      newTab.document.write(response.data);
      newTab.document.close();
    }
    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

const addDonationApi = async (data: DonationDataInterface) => {
  try {
    const response = await api.post(`/donations/addDonation`, data);

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

const searchDonationByDetailsApi = async (details: string) => {
  try {
    console.log(details, "searchText, startDate, endDate");
    const response = await api.get(`/donations/search`, {
      params: { search: details },
    });
    if (response.status == 204) {
      return new CustomApiResponse(
        { data: { message: "No donations found" } },
        false,
        true
      );
    }

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

const searchDonationsByDateApi = async (startDate: string, endDate: string) => {
  try {
    console.log(startDate, endDate, "searchDonationsByDateApi");
    const response = await api.get(`/donations/filterByDate`, {
      params: { startDate, endDate },
    });

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    console.log(error);
    handleApiError(error);
  }
};

export {
  getDonationListApi,
  getDonationByIdApi,
  addDonationApi,
  searchDonationByDetailsApi,
  searchDonationsByDateApi,
};
