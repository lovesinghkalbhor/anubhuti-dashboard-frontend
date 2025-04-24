import React, { useRef, useEffect, useState } from "react";
import { BiSolidBookAdd } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import notify from "./notify";
import { addKindDonationApi } from "../dataFetching/donationApi/donation.api";
import { AddDonationValidationSchema } from "../validationchema/validation";
import { ItemInterface, DonationCategory } from "../utils/types";

const countryCodes = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Antigua and Barbuda", code: "+1-268" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" },
  { name: "Bahamas", code: "+1-242" },
  { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Barbados", code: "+1-246" },
  { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" },
  { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" },
  { name: "Bhutan", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia and Herzegovina", code: "+387" },
  { name: "Botswana", code: "+267" },
  { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Burundi", code: "+257" },
  { name: "Canada", code: "+1" },
  { name: "Cape Verde", code: "+238" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Croatia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Denmark", code: "+45" },
  { name: "Dominican Republic", code: "+1-809" },
  { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" },
  { name: "France", code: "+33" },
  { name: "Germany", code: "+49" },
  { name: "Greece", code: "+30" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Italy", code: "+39" },
  { name: "Japan", code: "+81" },
  { name: "Kenya", code: "+254" },
  { name: "Mexico", code: "+52" },
  { name: "Netherlands", code: "+31" },
  { name: "Nigeria", code: "+234" },
  { name: "Pakistan", code: "+92" },
  { name: "Russia", code: "+7" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "Spain", code: "+34" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Turkey", code: "+90" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Vietnam", code: "+84" },
  { name: "Zimbabwe", code: "+263" },
];

const AddDonationFormKinds: React.FC = () => {
  const initialValues = {
    donorName: "",
    phoneNumber: "",
    countryCodes: countryCodes.find((c) => c.name === "India")?.code || "",
    aadhar: "",
    pan: "",
    address: "",
    purpose: "",
    donationCategory: "",
    items: [],
    donationCategoryOther: "",
    donationDate: new Date().toISOString().split("T")[0],
  };

  const [items, setItems] = useState<ItemInterface[]>([]); // State to manage added items

  // Add a new item to the list
  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: "", approxAmount: "" }]);
  };

  // Remove a specific item from the list
  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Filter and validate items
  const filteredItems = (items: any[]) => {
    let isInvalidItems = false;

    const itemsArray = items.filter((item) => {
      // name = love return false
      const isNameEmpty = item.name.trim();
      const isQuantityEmpty = item.quantity.trim();
      const isApproxAmountEmpty = item.approxAmount.trim();
      // If one of the fields is empty, show notification and exit
      if (!isNameEmpty || !isQuantityEmpty || !isApproxAmountEmpty) {
        notify(
          "All the fields name, quantity and Approx amount must be filled.",
          false
        );
        isInvalidItems = true;
        return true; // This ensures we skip processing further
        // This ensures we skip processing further
      } else {
        return true; // This ensures we skip processing further
      }
    });

    // setting the items after filtering
    setItems(itemsArray);

    if (isInvalidItems) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm, setFieldError }: any
  ) => {
    if (!values.pan && !values.aadhar) {
      setFieldError("pan", "Either Pan or aadhar is required.");
      setFieldError("aadhar", "Either Pan or aadhar is required.");
      return;
    }

    // if items array is invalid then return from the function and do not submit
    if (filteredItems(items)) {
      return;
    }

    let customdonationCategory;

    if (values.donationCategoryOther) {
      customdonationCategory = `OTHER-${values.donationCategoryOther}`;
    } else {
      customdonationCategory = values.donationCategory;
    }

    const AddedData = {
      donorName: values.donorName,
      phoneNumber: values.phoneNumber,
      aadhar: values.aadhar,
      pan: values.pan,
      address: values.address,
      countryCode: values.countryCodes,
      purpose: values.purpose,
      donationCategory: customdonationCategory,
      items: items,
      donationDate: values.donationDate,
    };

    try {
      const CustomApiResponse = await notify(
        "",
        false,
        addKindDonationApi(AddedData)
      );
      const apiData = CustomApiResponse?.apiResponse;

      if (apiData.data) {
        notify(apiData.message, apiData.success);
        resetForm();
        setItems([]);
      }
    } catch (error: any) {
      notify(error.apiResponse.data.message, false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setItems(updatedItems);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <div className="bg-white p-10 py-16   rounded-lg  w-full">
        {/* <h2 className="text-2xl font-semibold mb-16">New Donation</h2> */}
        <Formik
          initialValues={initialValues}
          validationSchema={AddDonationValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-8 justify-items-center">
              {/* Left Side Fields */}

              {/* first column */}
              <div className="space-y-6">
                <Field name="donorName">
                  {({ field }: any) => (
                    <div>
                      <label>Donor Name *</label>
                      <input
                        {...field}
                        ref={inputRef}
                        type="text"
                        id="donorName"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="donorName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )}
                </Field>

                <div>
                  <label>Country:</label>
                  <Field
                    as="select"
                    name="countryCodes"
                    id="countrySelect"
                    // onChange={handleCountryChange}
                    // value={selectedCountry.name}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.name} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </Field>
                </div>

                <div>
                  <label>Mobile Number</label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label>Aadhar Card Number</label>
                  <Field
                    type="text"
                    name="aadhar"
                    id="aadhar"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="aadhar"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label>Address</label>
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* second column */}
              <div className="space-y-6">
                <div>
                  <label>Pan Card</label>
                  <Field
                    type="text"
                    name="pan"
                    id="pan"
                    className="w-full"
                    placeholder="Optional"
                  />
                  <ErrorMessage
                    name="pan"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label>Purpose Donation</label>
                  <Field
                    as="textarea"
                    name="purpose"
                    id="purpose"
                    className="w-full"
                    rows={5} // Optional: Specifies the number of rows for better UI
                  />
                  <ErrorMessage
                    name="purpose"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="font-semibold">Donation Category</label>
                    <div className="flex flex-col gap-4 mt-2">
                      <Field
                        as="select"
                        name="donationCategory"
                        className="border text-sm focus:outline-slate-600 rounded-md p-2 w-full"
                      >
                        <option value="" disabled>
                          Select a donation category
                        </option>
                        {Object.keys(DonationCategory).map((category) => (
                          <Field
                            as="option"
                            className="text-sm"
                            key={category}
                            value={category}
                          >
                            {
                              DonationCategory[
                                category as keyof typeof DonationCategory
                              ]
                            }
                          </Field>
                        ))}
                      </Field>
                    </div>
                    <Field name="donationCategory">
                      {({ field }: any) => (
                        <div>
                          {field.value === "OTHER" ? (
                            <Field
                              name="donationCategoryOther"
                              type="text"
                              className="mt-5"
                            />
                          ) : null}
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="donationCategory"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* third column */}
              {/* Add Items Section */}
              <div className="max-h-80 space-y-10 w-56">
                {/* third column */}
                <div>
                  <label>Donation Date *</label>
                  <Field
                    type="date"
                    name="donationDate"
                    id="donationDate"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="donationDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold">Add Items</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-secondaryColor text-white px-3 py-2 rounded  "
                  >
                    <BiSolidBookAdd></BiSolidBookAdd>
                  </button>
                </div>
                <div className=" border-2 border-black border-opacity-20 rounded-xl p-3 h-full  overflow-auto ">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start  gap-2"
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Item"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, e)}
                        className=" w-full"
                      />

                      <input
                        type="text"
                        name="quantity"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        className="w-full"
                      />
                      <input
                        type="text"
                        name="approxAmount"
                        placeholder="Approx Cost"
                        value={item.approxAmount}
                        onChange={(e) => handleItemChange(index, e)}
                        className="w-full"
                      />
                      {!item.name.trim() ||
                      !item.quantity.trim() ||
                      !item.approxAmount.trim() ? (
                        <h6 className="text-red-600 text-xs font-semibold">
                          All the fileds must be filled{" "}
                        </h6>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded mt-5 ms-1"
                      >
                        Delete Item
                      </button>

                      <hr className="mt-4 w-full border-black border-1 border-opacity-40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="mt-20 normal-button-bg-secondary">
              Add Donation
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default AddDonationFormKinds;
