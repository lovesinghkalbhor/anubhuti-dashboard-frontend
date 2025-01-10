import React, { useState } from "react";
import { BiSolidBookAdd } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import notify from "./notify";
import { addDonationApi } from "../dataFetching/donationApi/donation.api";
import { AddDonationValidationSchema } from "../validationchema/validation";
import { ItemInterface } from "../utils/types";
const AddDonationForm: React.FC = () => {
  const initialValues = {
    donorName: "",
    phoneNumber: "",
    aadhar: "",
    pan: "",
    address: "",
    amount: 0,
    purpose: "",
    items: [],
  };

  const [items, setItems] = useState<ItemInterface[]>([]); // State to manage added items

  // Add a new item to the list
  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: "" }]);
  };

  // Remove a specific item from the list
  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm, setFieldError }: any
  ) => {
    // console.log(values);
    // console.log(items);

    if (!values.pan && !values.aadhar) {
      setFieldError("pan", "Either Pan or aadhar is required.");
      setFieldError("aadhar", "Either Pan or aadhar is required.");
      return;
    }
    if (!values.amount && !items.length) {
      setFieldError("amount", "Either Amount or Items is required.");
      return;
    }
    const ItemAdded = { ...values, items: items };
    try {
      const CustomApiResponse = await notify(
        "",
        false,
        addDonationApi(ItemAdded)
      );
      const apiData = CustomApiResponse?.apiResponse;

      if (apiData.data) {
        notify(apiData.message, apiData.success);
        resetForm();
      }
    } catch (error: any) {
      // if the error is less then 500 and
      // grater than equal to 400 means something wrong from the user side
      //  then set the error field else show the error
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

  return (
    <div className="bg-white p-10 py-16 mt-20 rounded-lg shadow-mainShadow w-full">
      <h2 className="text-2xl font-semibold mb-16">New Donation</h2>
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
              <div>
                <label>Donor Name</label>
                <Field
                  type="text"
                  name="donorName"
                  id="donorName"
                  className="w-full"
                />
                <ErrorMessage
                  name="donorName"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                <label>Amount</label>
                <Field
                  type="text"
                  name="amount"
                  id="amount"
                  className="w-full"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Pan Card</label>
                <Field type="text" name="pan" id="pan" className="w-full" />
                <ErrorMessage
                  name="pan"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Purpose of Donation</label>
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
            </div>

            {/* third column */}
            {/* Add Items Section */}
            <div className="max-h-80 -mt-8 w-56">
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
                    className="flex flex-col items-start mb-2 gap-2"
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
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded mt-5 ms-1"
                    >
                      Delete Item
                    </button>

                    <hr className="mt-6" />
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
  );
};

export default AddDonationForm;
