import api from "../../utils/axios";
import { CustomApiResponse } from "../../utils/apiResponse";
import { handleApiError } from "../../utils/apiErrors";
import {
  DonationDataInterface,
  DonationKindDataInterface,
} from "../../utils/types";
import { handleConvertToPDF } from "../../utils/helperFuntions";

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
//////////////////////////////////////////////////////////////
const getKindDonationListApi = async (page: number, limit: number) => {
  try {
    const response = await api.get(`/donations/getDonationKinds`, {
      params: { page, limit },
    });

    // Create the custom response for frontend
    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//

// get donation data by id
const getDonationDataByIdApi = async (id: number) => {
  try {
    const response = await api.get(`/donations/getDonation/${id}`);
    console.log(response);

    // Create a new browser-like window to display the HTML
    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

////////////////////////////////////////////////////////////////////////////
// get kinds donation data by id
const getKindDonationDataByIdApi = async (id: number) => {
  try {
    const response = await api.get(`/donations/getDonationKinds/${id}`);

    // Create a new browser-like window to display the HTML
    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
// get donation invoice by id
const getDonationByIdApi = async (id: number) => {
  try {
    const response = await api.get(`viewInvoice/invoice?id=${id}`);

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
//////////////////////////////////////////////////////////////

// get kind donation invoice by id
const getKindDonationByIdApi = async (id: number) => {
  try {
    const response = await api.get(`viewInvoice/invoiceKind?id=${id}`);

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
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const editDonationApi = async (data: DonationDataInterface) => {
  try {
    const response = await api.post(`/donations/editDonation`, data);

    console.log(data, "donation edited");

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

//////////////////////////////////////////////////

const editKindDonationApi = async (data: DonationDataInterface) => {
  try {
    const response = await api.post(`/donations/editKindDonation`, data);
    console.log(response);

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
//////////////////////////////////////
//////////////////////////////////////
const addDonationApi = async (data: DonationDataInterface) => {
  try {
    const response = await api.post(`/donations/addDonation`, data);

    console.log(data, "donation added");

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
/////////////////////////////////////////////////////////////////
const addKindDonationApi = async (data: DonationKindDataInterface) => {
  try {
    const response = await api.post(`/donations/addDonationKinds`, data);

    console.log(data, "donation added");

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
const searchDonationByDetailsApi = async (
  details: string,
  page: number,
  limit: number
) => {
  try {
    console.log(details, "searchText, startDate, endDate");
    const response = await api.get(`/donations/search`, {
      params: { search: details, page, limit },
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
///////////////////////////////////////////////////////
const searchKindDonationByDetailsApi = async (
  details: string,
  page: number,
  limit: number
) => {
  try {
    console.log(details, "searchText, startDate, endDate");
    const response = await api.get(`/donations/searchKinds`, {
      params: { search: details, page, limit },
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
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
const searchDonationsByDateApi = async (
  startDate: string,
  endDate: string,
  page: number,
  limit: number
) => {
  try {
    console.log(startDate, endDate, "searchDonationsByDateApi");
    const response = await api.get(`/donations/filterByDate`, {
      params: { startDate, endDate, page, limit },
    });

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    console.log(error);
    handleApiError(error);
  }
};
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
const searchDonationsByDateApiExcel = async (
  startDate: string,
  endDate: string
) => {
  try {
    console.log(startDate, endDate, "searchDonationsByDateApi");
    const response = await api.get(`/donations/getDonationByDate`, {
      params: { startDate, endDate },
    });

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    console.log(error);
    handleApiError(error);
  }
};
//////////////////////////////////////////////////////////////
const searchKindDonationsByDateApiExcel = async (
  startDate: string,
  endDate: string
) => {
  try {
    console.log(startDate, endDate, "searchDonationsByDateApi");
    const response = await api.get(`/donations/getKindDonationByDate`, {
      params: { startDate, endDate },
    });

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    console.log(error);
    handleApiError(error);
  }
};
//////////////////////////////////////////////////////////////
const searchKindDonationsByDateApi = async (
  startDate: string,
  endDate: string,
  page: number,
  limit: number
) => {
  try {
    console.log(startDate, endDate, "searchDonationsByDateApi");
    const response = await api.get(`/donations/filterKindsByDate`, {
      params: { startDate, endDate, page, limit },
    });

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    console.log(error);
    handleApiError(error);
  }
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
const calculateDonationsByDateApi = async (
  startDate: string,
  endDate: string
) => {
  try {
    console.log(startDate, endDate, "searchDonationsByDateApi");
    const response = await api.get(`/donations/calculateDonationsByDate`, {
      params: { startDate, endDate },
    });

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    console.log(error);
    handleApiError(error);
  }
};

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
const filterDonations = async (
  donationCategory: string,
  paymentMethod: string,
  page: number,
  limit: number
) => {
  try {
    const response = await api.get(`/donations/filter`, {
      params: { donationCategory, paymentMethod, page, limit },
    });

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
/////////////////////////////////////////////////////////////
const filterKindDonations = async (
  donationCategory: string,
  page: number,
  limit: number
) => {
  try {
    const response = await api.get(`/donations/filterKinds`, {
      params: { donationCategory, page, limit },
    });

    const returnValue = new CustomApiResponse(response.data, false, true);
    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
const downloadReciept = async (id: number) => {
  try {
    const response = await api.get(`viewInvoice/downloadInvoice?id=${id}`);

    handleConvertToPDF(response.data);
    const returnValue = new CustomApiResponse(response.data, false, true);

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
/////////////////////////////////////////////////////////////
const downloadKindReciept = async (id: number) => {
  try {
    const response = await api.get(`viewInvoice/downloadKindsInvoice?id=${id}`);

    handleConvertToPDF(response.data);
    const returnValue = new CustomApiResponse(response.data, false, true);

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

export {
  getDonationListApi,
  getDonationByIdApi,
  addDonationApi,
  searchDonationByDetailsApi,
  searchDonationsByDateApi,
  calculateDonationsByDateApi,
  filterDonations,
  downloadReciept,
  addKindDonationApi,
  searchKindDonationByDetailsApi,
  searchKindDonationsByDateApi,
  filterKindDonations,
  downloadKindReciept,
  getKindDonationListApi,
  getKindDonationByIdApi,
  getDonationDataByIdApi,
  getKindDonationDataByIdApi,
  editDonationApi,
  editKindDonationApi,
  searchDonationsByDateApiExcel,
  searchKindDonationsByDateApiExcel,
};
