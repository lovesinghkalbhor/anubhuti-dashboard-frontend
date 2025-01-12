import axios from "axios";
import api from "../../utils/axios";
import { setToken, deleteToken, getToken } from "../../utils/tokenStorage";
import {
  RegisterInterface,
  UpdateUserInterface,
  loginInterface,
} from "../../utils/types";
import { CustomApiResponse } from "../../utils/apiResponse";
import { handleApiError } from "../../utils/apiErrors";

const isTokenValid = async () => {
  try {
    // Get the current refresh token from secure storage
    const accessToken = await getToken(
      import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN
    );
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/isValid`,

      {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      }
    );

    const returnValue = new CustomApiResponse(
      response.data,
      accessToken.success,
      true
    );

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const refreshTokenApi = async () => {
  try {
    // Get the current refresh token from secure storage
    const refreshToken = await getToken(
      import.meta.env.VITE_ACC_NAME_REFRESH_TOKEN
    );

    // Send the refresh token in the Authorization header
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/refreshToken`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken.token}`,
        },
      }
    );

    // send the token to main process for storing in secure storage
    const result = await setToken(
      import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN,
      response.data.data.accessToken
    );
    const result2 = await setToken(
      import.meta.env.VITE_ACC_NAME_REFRESH_TOKEN,
      response.data.data.refreshToken
    );

    const returnValue = new CustomApiResponse(
      response.data,
      result.success && result2.success,
      true
    );
    // console.log(returnValue);

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
const RegisterApi = async (data: RegisterInterface) => {
  try {
    // getting the data from the api
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/register`,
      data
    );

    // send the token to main process for storing in secure storage
    const result = await setToken(
      import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN,
      response.data.data.accessToken
    );
    const result2 = await setToken(
      import.meta.env.VITE_ACC_NAME_REFRESH_TOKEN,
      response.data.data.refreshToken
    );

    const returnValue = new CustomApiResponse(
      response.data,
      result.success && result2.success,
      true
    );
    // console.log(returnValue);

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
const loginApi = async (data: loginInterface) => {
  try {
    // getting the data from the api
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/login`,
      data
    );

    // send the token to main process for storing in secure storage
    const result = await setToken(
      import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN,
      response.data.data.accessToken
    );
    const result2 = await setToken(
      import.meta.env.VITE_ACC_NAME_REFRESH_TOKEN,
      response.data.data.refreshToken
    );

    const returnValue = new CustomApiResponse(
      response.data,
      result.success && result2.success,
      true
    );
    // console.log(returnValue);

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

const LogoutApi = async () => {
  try {
    // Get the current refresh token from secure storage
    const accessToken = await getToken(
      import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN
    );

    // getting the data from the api
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      }
    );

    // send the token to main process for storing in secure storage
    const result = await deleteToken(
      import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN
    );

    const returnValue = new CustomApiResponse(
      response.data,
      result.success,
      true
    );

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
const changePasswordApi = async (oldPassword: string, newPassword: string) => {
  try {
    // Send the request to change the password using the Axios instance
    const response = await api.put("/users/changePassword", {
      oldPassword,
      newPassword,
    });

    // send the token to main process for storing in secure storage
    const result = await deleteToken(
      import.meta.env.VITE_ACC_NAME_ACCESS_TOKEN
    );

    // Create the custom response for frontend
    const returnValue = new CustomApiResponse(
      response.data,
      result.success,
      true
    );

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
const getUserByIdApi = async () => {
  try {
    // Send the request to change the password using the Axios instance
    const response = await api.get("/users/userById");

    // Create the custom response for frontend
    const returnValue = new CustomApiResponse(response.data, null, true);

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

const UpdateUserApi = async (data: UpdateUserInterface) => {
  try {
    // Send the request to update the user using the Axios instance
    console.log(data, "value from the user");
    const response = await api.put("/users/updateUser", data);

    // Create the custom response for frontend
    const returnValue = new CustomApiResponse(response.data, null, true);

    return returnValue;
  } catch (error: any) {
    handleApiError(error);
  }
};
export {
  loginApi,
  RegisterApi,
  isTokenValid,
  LogoutApi,
  refreshTokenApi,
  changePasswordApi,
  UpdateUserApi,
  getUserByIdApi,
};
