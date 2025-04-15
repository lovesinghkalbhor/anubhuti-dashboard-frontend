import React, { useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { registerValidationSchema } from "../../validationchema/validation";
import { Link, useNavigate } from "react-router";
import notify from "../../components/notify";
import { RegisterApi } from "../../dataFetching/userApi/user.api";
import { setUser } from "../../reduxState/Features/storeuser/userSlice";
const Register: React.FC = () => {
  // Validation Schema using Yup
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Initial Form Values
  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    adhar_card: "",
    password: "",
    confirmPassword: "",
  };

  // API Call Function
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      const CustomApiResponse = await RegisterApi(values);
      const apiData = CustomApiResponse?.apiResponse;

      // setting the data in the redux store if data exist
      if (apiData.data) {
        dispatch(
          setUser({
            name: apiData.data.name,
            email: apiData.data.email,
            mobile: apiData.data.mobile,
            adhar_card: apiData.data.adhar_card,
          })
        );

        // if login success then redirect to dashboard else show the error
        if (apiData.success) {
          notify(apiData.message, apiData.success);
          navigate("/login");
        } else {
          notify(apiData.message, apiData.success);
        }
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-white h-screen  flex">
      {/* Left Section */}
      <div className="  bg-gradient-to-t from-secondaryColor-hover to-secondaryColor  text-white p-8  w-1/3 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Anubhuti Seva Santhan</h1>
        <p className="text-sm mb-6">
          Allow Microsoft to access your browser web content to enable chat
          responses, page summaries, and more.
        </p>
        <Link
          to={"/login"}
          className="bg-white text-black px-6 py-2 rounded font-semibold w-fit  text-xs"
        >
          Login
        </Link>
      </div>

      {/* Right Section */}
      <div className="w-2/3 px-24 flex items-center justify-center">
        <div>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Register a new account
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="grid grid-cols-2 gap-6 gap-x-12">
                {/* User Name */}
                <Field name="name">
                  {({ field }: any) => (
                    <div>
                      <label htmlFor="name">User Name</label>
                      <input
                        {...field}
                        ref={inputRef}
                        type="text"
                        id="name"
                        className="w-full"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )}
                </Field>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobile">Mobile Number</label>
                  <Field
                    type="text"
                    id="mobile"
                    name="mobile"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* {adhar card} */}
                <div>
                  <label htmlFor="adhar_card">Aadhar Number</label>
                  <Field
                    type="text"
                    id="adhar_card"
                    name="adhar_card"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="adhar_card"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block mb-1 font-medium">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Confirm Password */}
                <div className="col-span-2 ">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Register Button */}
              <div className="text-center mt-20">
                <button
                  type="submit"
                  className="normal-button-bg-secondary w-full"
                >
                  Register
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
