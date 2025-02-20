import React, { useState, useEffect } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { DonationCategory } from "../utils/types";
import { MdFilterAltOff } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import notify from "./notify";
import { filterDonations } from "../dataFetching/donationApi/donation.api";

interface FilterModalProps {
  isOpen: boolean;
  recentFilters: any;
  setRecentFilters: any;
  onClose: () => void;
  filteredData: any;
  setFilteredData: any;
  pagination: any;
  setPagination: any;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  recentFilters,
  setRecentFilters,
  onClose,
  setFilteredData,
  pagination,
  setPagination,
}) => {
  const initialValues = {
    donationCategory: "",
    paymentMethod: "",
  };
  // const { setFieldValue } = useFormikContext();

  const [donationCategory, setDonationCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (values: any) => {
    console.log(values);
    setDonationCategory(values.donationCategory);
    setPaymentMethod(values.paymentMethod);

    setRecentFilters((prev: any) => {
      const newFilters: typeof recentFilters = { ...prev };

      for (const key in prev) {
        newFilters[key] = { change: false, submit: false }; // Reset all to default
      }
      for (const key in values) {
        newFilters[key] = { change: true, submit: true }; // Reset all to default
      }

      return {
        ...newFilters, // Apply the default empty state
      };
    });

    onApplyFilters(values.donationCategory, values.paymentMethod);

    onClose();
  };

  const onApplyFilters = async (category: string, paymentMethod: string) => {
    try {
      if (category.length || paymentMethod.length) {
        const CustomApiResponse = await notify(
          "",
          false,
          filterDonations(
            category,
            paymentMethod,
            pagination.page,
            pagination.limit
          )
        );

        const apiData = CustomApiResponse?.apiResponse;
        console.log(apiData.data.donations, "filterapiData");

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
  };

  useEffect(() => {
    if (
      recentFilters.donationCategory.submit === true ||
      recentFilters.paymentMethod.submit === true
    ) {
      onApplyFilters(donationCategory, paymentMethod);
    }
  }, [pagination.page]);
  if (!isOpen) return;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button onClick={onClose}>
            <MdOutlineCancel size={18} />
          </button>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form>
              {/* Donation Category Filter */}
              <div className="space-y-4">
                <div>
                  <label className="font-semibold">Donation Category</label>
                  <div className="flex  gap-4 mt-2">
                    <Field
                      as="select"
                      name="donationCategory"
                      className="border text-sm focus:outline-slate-600 rounded-md p-2 w-full mt-2"
                    >
                      <option value="" disabled>
                        Select a donation category
                      </option>
                      {Object.keys(DonationCategory).map((cat) => (
                        <option key={cat} value={cat}>
                          {
                            DonationCategory[
                              cat as keyof typeof DonationCategory
                            ]
                          }
                        </option>
                      ))}
                    </Field>
                    <button
                      onClick={() => setFieldValue("donationCategory", "")}
                      type="button"
                    >
                      <MdFilterAltOff size={18} />
                    </button>{" "}
                  </div>
                  <ErrorMessage
                    name="donationCategory"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Payment Method Filter */}
                <div>
                  <label className="font-semibold">Payment Method</label>
                  <div className="flex  gap-4 mt-2">
                    <Field
                      as="select"
                      name="paymentMethod"
                      className="border text-sm focus:outline-slate-600 rounded-md p-2 w-full mt-2"
                    >
                      <option value="" disabled>
                        Select a payment method
                      </option>
                      {["UPI", "CHEQUE", "DD", "CASH"].map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </Field>
                    <button
                      onClick={() => setFieldValue("paymentMethod", "")}
                      type="button"
                    >
                      <MdFilterAltOff size={18} />
                    </button>{" "}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-4">
                <button onClick={onClose} className="text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="normal-button-bg-secondary">
                  Apply Filters
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FilterModal;
