// hooks/useDonationData.js (or .ts)
import { useState, useEffect } from "react";
import notify from "../components/notify";

import {
  getDonationDataByIdApi,
  getKindDonationDataByIdApi,
} from "../dataFetching/donationApi/donation.api";

const useDonationData = (id: string) => {
  const [donationData, setDonationData] = useState({
    donorName: "",
    phoneNumber: "",
    countryCode: "",
    aadhar: "",
    pan: "",
    address: "",
    amount: 0,
    purpose: "",
    donationCategory: "",
    paymentMode: "",
    paymentMethod: "",
    ddNumber: "",
    date: "",
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchDonation = async () => {
      try {
        const CustomApiResponse = await notify(
          "",
          false,
          getDonationDataByIdApi(parseInt(id))
        );
        const apiData = CustomApiResponse?.apiResponse;
        console.log(apiData.data, "this is the data");
        if (apiData?.data) {
          setDonationData(apiData.data);
        } else {
          setError(apiData?.message || "Failed to fetch donation data.");
        }
      } catch (err: any) {
        setError(
          err.apiResponse?.data?.message || "Error fetching donation data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id]);

  return { donationData, loading, error };
};
const useKindDonationData = (id: string) => {
  const [donationData, setDonationData] = useState({
    id: "",
    donorName: "",
    phoneNumber: "",
    countryCode: "",
    aadhar: "",
    pan: "",
    address: "",
    amount: 0,
    purpose: "",
    donationCategory: "",
    paymentMode: "",
    paymentMethod: "",
    ddNumber: "",
    items: [],
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchDonation = async () => {
      try {
        const CustomApiResponse = await notify(
          "",
          false,
          getKindDonationDataByIdApi(parseInt(id))
        );
        const apiData = CustomApiResponse?.apiResponse;
        console.log(apiData.data);
        if (apiData?.data) {
          setDonationData(apiData.data);
        } else {
          setError(apiData?.message || "Failed to fetch donation data.");
        }
      } catch (err: any) {
        setError(
          err.apiResponse?.data?.message || "Error fetching donation data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id]);

  return { donationData, loading, error };
};

export { useDonationData, useKindDonationData };
