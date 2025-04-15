import React, { useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginApi } from "../../dataFetching/userApi/user.api";
import { Link, useNavigate } from "react-router";
import { loginValidationSchema } from "../../validationchema/validation";
import notify from "../../components/notify";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxState/Features/storeuser/userSlice";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    mobile: "",
    password: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const CustomApiResponse = await notify("", false, loginApi(values));

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
          navigate("/dashboard");
        } else {
          notify(apiData.message, apiData.success);
        }
      }
    } catch (error: any) {
      // if the error is less then 500 and
      // grater than equal to 400 means something wrong from the user side
      //  then set the error field else show the error
      if (
        error.apiResponse?.data.statusCode < 500 &&
        error.apiResponse?.data.statusCode >= 400
      ) {
        setFieldError("password", error.apiResponse.data.message);
      } else {
        notify(error.apiResponse?.data.message, false);
      }
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
    <div className="bg-white h-screen flex">
      <div className="bg-gradient-to-t from-secondaryColor-hover to-secondaryColor text-white p-8 w-1/3 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Anubhuti Seva Santhan</h1>
        <p className="text-sm mb-6">
          Allow Microsoft to access your browser web content to enable chat
          responses, page summaries, and more.
        </p>
        <Link
          to="/register"
          className="bg-white text-black px-6 py-2 rounded font-semibold w-fit text-xs"
        >
          Register
        </Link>
      </div>

      <div className="w-2/3 px-24 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Log in to your account
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <Field name="donorName">
                  {({ field }: any) => (
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block mb-1 font-medium"
                      >
                        Mobile
                      </label>
                      <input
                        {...field}
                        ref={inputRef}
                        type="text"
                        id="mobile"
                        name="mobile"
                        className="w-full border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )}
                </Field>

                <div>
                  <label htmlFor="password" className="block mb-1 font-medium">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* <div className="mt-6"> */}
                <Link
                  to="/forgotPassword"
                  className="text-secondaryColor text-sm font-semibold underline"
                >
                  Forgot Password
                </Link>
                <button
                  type="submit"
                  className="normal-button-bg-secondary w-full mt-3 p-2 rounded-md"
                  disabled={isSubmitting}
                >
                  Login
                </button>
                {/* </div> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
