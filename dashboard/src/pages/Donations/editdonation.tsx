import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import notify from "../../components/notify";
import { editDonationApi } from "../../dataFetching/donationApi/donation.api";
import { useParams } from "react-router-dom";
import { AddDonationValidationSchema } from "../../validationchema/validation";
import { DonationCategory } from "../../utils/types";
import { useDonationData } from "../../utils/customHooks";

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

const EditDonationForm: React.FC = () => {
  const { id } = useParams();
  const { donationData } = useDonationData(String(id));
  const [donationCategory, setDonationCategory] = useState("");
  const [otherDonation, setotherDonation] = useState("");
  const [bank, setBank] = useState("");
  const [chequeNumber, setchequeNumber] = useState("");
  const [paymentMode, setpaymentMode] = useState("");
  const [ddNumber, setddNumber] = useState("");

  useEffect(() => {
    let a = Object.entries(DonationCategory).find(
      ([_, val]) => val === donationData.donationCategory
    )?.[0];
    setDonationCategory(a ?? "");

    if (donationData.donationCategory.startsWith("OTHER")) {
      setDonationCategory("OTHER");
      setotherDonation(donationData?.donationCategory?.split("-")[1] || "");
    }
    setpaymentMode(donationData?.paymentMethod?.split("-")[0] || "");

    if (donationData.paymentMethod.startsWith("UPI")) {
      let bankName = donationData.paymentMethod.replace("UPI-", "");
      setBank(bankName);
    }
    if (donationData.paymentMethod.startsWith("DD")) {
      let ddNumber = donationData.paymentMethod.replace("DD-", "");
      setddNumber(ddNumber);
    }
    if (donationData.paymentMethod.startsWith("CHEQUE")) {
      // let chequeNumber = donationData.paymentMethod.replace("CHEQUE-", "");
      let [_, chequeNumber, bankName] = donationData.paymentMethod.split("-");

      console.log();
      setBank(bankName);

      setchequeNumber(chequeNumber);
    }
  }, [donationData]);

  const initialValues = {
    donorName: donationData?.donorName || "",
    phoneNumber: donationData?.phoneNumber || "",
    countryCodes: donationData?.countryCode || "",
    aadhar: donationData?.aadhar || "",
    pan: donationData?.pan || "",
    address: donationData?.address || "",
    amount: donationData?.amount || 0,
    purpose: donationData?.purpose || "",
    donationCategory: donationCategory || "",
    donationCategoryOther: otherDonation || "",
    paymentMode: paymentMode,
    paymentMethod: donationData?.paymentMethod || "",
    ddNumber: ddNumber || "",
    bank: bank,
    chequeNumber: chequeNumber,
    donationDate: donationData?.date.split("T")[0],
    // items: donationData?.items || [],
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setFieldError }: any
  ) => {
    // console.log(items);

    if (!values.pan && !values.aadhar) {
      setFieldError("pan", "Either Pan or aadhar is required.");
      setFieldError("aadhar", "Either Pan or aadhar is required.");
      return;
    }
    if (!values.amount) {
      setFieldError("amount", " Amount  is required.");
      return;
    }

    // checking if the payment method is correct
    let finalPaymentMethod = values.paymentMode; // Start with the base payment mode

    // checking if the payment method is correct
    if (values.paymentMode === "DD") {
      if (values.ddNumber) {
        finalPaymentMethod = `DD-${values.ddNumber}`;
      } else {
        setFieldError("ddNumber", "DD Number is required.");
        return;
      }
    } else if (values.paymentMode === "CHEQUE") {
      if (values.chequeNumber) {
        finalPaymentMethod = `CHEQUE-${values.chequeNumber}-${values.bank}`;
      } else {
        setFieldError("chequeNumber", "Cheque Number is required.");
        return;
      }
    } else if (values.paymentMode === "UPI") {
      if (values.bank) {
        finalPaymentMethod = `UPI-${values.bank}`;
      } else {
        setFieldError("bank", "please select the bank, it is required.");
        return;
      }
    }
    let customdonationCategory;

    if (values.donationCategoryOther) {
      customdonationCategory = `OTHER-${values.donationCategoryOther}`;
    } else {
      customdonationCategory = values.donationCategory;
    }
    const AddedData = {
      donationId: id,
      donorName: values.donorName,
      phoneNumber: values.phoneNumber,
      countryCode: values.countryCodes,
      aadhar: values.aadhar,
      pan: values.pan,
      address: values.address,
      amount: values.amount,
      purpose: values.purpose,
      donationCategory: customdonationCategory,
      paymentMethod: finalPaymentMethod,
      donationDate: new Date(values.donationDate),

      // items: items,
    };

    try {
      const CustomApiResponse = await notify(
        "",
        false,
        editDonationApi(AddedData)
      );
      const apiData = CustomApiResponse?.apiResponse;

      if (apiData.data) {
        notify(apiData.message, apiData.success);
      }
    } catch (error: any) {
      notify(error.apiResponse.data.message, false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-10 -mt-10   rounded-lg  w-full">
      {/* <h2 className="text-2xl font-semibold mb-16">New Donation</h2> */}
      <Formik
        initialValues={initialValues}
        validationSchema={AddDonationValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
                <label>Country:</label>
                <Field as="select" name="countryCodes" id="countrySelect">
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

              <div className="space-y-6">
                <div>
                  <label className="font-semibold">Payment Method</label>
                  <div className="flex gap-4 mt-2">
                    {["CASH", "CHEQUE", "UPI", "DD"].map((method) => (
                      <label key={method} className="flex items-center gap-2">
                        <Field
                          type="radio"
                          name="paymentMode"
                          value={method}
                          // make the DD value "" on changing of paymentMode
                          className="w-4 h-4"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                  <ErrorMessage
                    name="paymentMode"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Conditional DD Number Field */}
                <Field name="paymentMode">
                  {({ field }: any) =>
                    field.value == "DD" ? (
                      <div>
                        <label>DD Number</label>
                        <Field
                          type="text"
                          name="ddNumber"
                          id="ddNumber"
                          className="w-full"
                        />
                        <ErrorMessage
                          name="ddNumber"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    ) : null
                  }
                </Field>
                {/* Conditional cheque Number Field */}
                <Field name="paymentMode">
                  {({ field }: any) =>
                    field.value == "CHEQUE" ? (
                      <div>
                        <label>Cheque Number</label>
                        <Field
                          type="text"
                          name="chequeNumber"
                          id="ddNumber"
                          className="w-full"
                        />
                        <ErrorMessage
                          name="chequeNumber"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    ) : null
                  }
                </Field>
                {/* Conditional Bank Field */}
                <Field name="paymentMode">
                  {({ field }: any) =>
                    field.value === "UPI" || field.value === "CHEQUE" ? (
                      <div className="flex flex-col space-y-1">
                        <label>Select bank</label>
                        <Field as="select" name="bank" id="countrySelect">
                          <option value="">Select a bank</option>
                          {[
                            "Punjab National Bank",
                            "Canara Bank",
                            "State Bank of india",
                          ].map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="bank"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    ) : null
                  }
                </Field>
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
            <div className="space-y-6">
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

export default EditDonationForm;
