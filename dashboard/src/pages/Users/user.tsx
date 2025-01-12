import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  UpdateUserValidationSchema,
  ChangePasswordValidationSchema,
} from "../../validationchema/validation";
import {
  changePasswordApi,
  UpdateUserApi,
} from "../../dataFetching/userApi/user.api";
import notify from "../../components/notify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reduxState/Features/storeuser/userSlice";
import { RootState } from "../../reduxState/store";

const User: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, mobile, email, adhar_card } = useSelector(
    (state: RootState) => state.user
  );

  const initialValuesUpdateUser = {
    name,
    mobile,
    email,
    adhar_card,
  };

  const initialValuesChangePassword = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleUpdateUserSubmit = async (
    values: typeof initialValuesUpdateUser,
    { setSubmitting }: any
  ) => {
    try {
      console.log(values, "value from the user");
      const CustomApiResponse = await notify("", false, UpdateUserApi(values));

      const apiData = CustomApiResponse?.apiResponse;

      // if change password success then redirect to login else show the error
      if (apiData.success) {
        notify(apiData.message, true);

        dispatch(
          setUser({
            name: apiData.data.name,
            email: apiData.data.email,
            mobile: apiData.data.mobile,
            adhar_card: apiData.data.adhar_card,
          })
        );
      } else {
        notify(apiData.message, false);
      }
    } catch (error: any) {
      // if the error is less then 500 and
      // grater than equal to 400 means something wrong from the user side
      //  then set the error field else show the error
      if (
        error.apiResponse.data.statusCode < 500 &&
        error.apiResponse.data.statusCode >= 400
      ) {
        notify(error.apiResponse.data.message, false);
      } else {
        notify(
          error.apiResponse.data.message ||
            "Someting went Wrong, try restarting the application",
          false
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePasswordSubmit = async (
    values: typeof initialValuesChangePassword,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const CustomApiResponse = await notify(
        "",
        false,
        changePasswordApi(values.oldPassword, values.newPassword)
      );

      const apiData = CustomApiResponse?.apiResponse;

      // if change password success then redirect to login else show the error
      if (apiData.success) {
        notify(apiData.message, true);
        navigate("/login");
      } else {
        notify(apiData.message, false);
      }
    } catch (error: any) {
      // if the error is less then 500 and
      // grater than equal to 400 means something wrong from the user side
      //  then set the error field else show the error
      if (
        error.apiResponse.data.statusCode < 500 &&
        error.apiResponse.data.statusCode >= 400
      ) {
        setFieldError("oldPassword", error.apiResponse.data.message);
      } else {
        notify(error.apiResponse.data.message, false);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="main-page_container user-page_container h-fit mb-10">
        <h1>Update User Info</h1>
        <hr />

        <Formik
          initialValues={initialValuesUpdateUser}
          validationSchema={UpdateUserValidationSchema}
          onSubmit={handleUpdateUserSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="user-page_container-input">
                <label>Name</label>

                <div>
                  <Field type="text" name="name" placeholder="Name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="user-page_container-input">
                <label>Mobile</label>

                <div>
                  <Field type="text" name="mobile" placeholder="Mobile" />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="user-page_container-input">
                <label>Email</label>

                <div>
                  <Field type="email" name="email" placeholder="Email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="user-page_container-input">
                <label>Adhar Card</label>
                <div>
                  <Field
                    type="text"
                    name="adhar_card"
                    placeholder="Adhar Card"
                  />
                  <ErrorMessage
                    name="adhar_card"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />{" "}
                </div>
              </div>
              <div className="user-page_container-input">
                {/* <label>Submit</label> */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-5 normal-button-bg-secondary"
                >
                  {isSubmitting ? "Updating..." : "Update User"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <hr />
      </div>

      <div className="main-page_container user-page_container h-fit mb-8">
        <h1>Change Password</h1>
        <hr />
        <Formik
          initialValues={initialValuesChangePassword}
          validationSchema={ChangePasswordValidationSchema}
          onSubmit={handleChangePasswordSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="user-page_container-input">
                <label>Old Password</label>
                <div>
                  <Field
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="user-page_container-input">
                <label>New Password</label>
                <div>
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="user-page_container-input">
                <label>Confirm Password</label>
                <div>
                  <Field
                    type="text"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
              <div className="user-page_container-input">
                {/* <label>Submit</label> */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-5 normal-button-bg-secondary"
                >
                  {isSubmitting ? "Changing..." : "Change Password"}{" "}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <hr />
      </div>
      <div className="opacity-0">l</div>
    </>
  );
};

export default User;
