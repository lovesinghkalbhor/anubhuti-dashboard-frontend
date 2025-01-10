import { CustomApiResponse } from "./apiResponse";
import axios from "axios";
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    // Handle API errors
    const apidata = error.response;

    const returnValue = new CustomApiResponse(apidata, null, true);

    // Attach status and message for display
    throw returnValue;
  }

  // Re-throw non-Axios errors
  throw new CustomApiResponse(
    { data: { message: "something went wrong Please restart the app" } },
    null,
    false
  );
};

export { handleApiError };
