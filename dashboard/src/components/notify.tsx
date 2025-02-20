import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (
  message: string,
  isSuccess: boolean,
  promiseFunction: Promise<any> | undefined = undefined
) => {
  if (promiseFunction) {
    if (promiseFunction) {
      // Handle the promise with toast.promise
      return toast.promise(promiseFunction, {
        pending: "Processing your request...",
        // success: message || "Operation successful 👌",
        // error: message || "Something went wrong 🤯",
      });
    }
  } else if (isSuccess) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const notifyUpdate = (
  message: string,
  type: "success" | "error" | "info" | "warning",
  data: any = null
) => {
  console.log(data, "update error");
  toast[type](message, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
export { notifyUpdate };
export default notify;
