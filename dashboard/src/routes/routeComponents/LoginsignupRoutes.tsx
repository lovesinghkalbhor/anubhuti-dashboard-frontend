import { useEffect } from "react";
import { useRoutes } from "react-router";
import Login from "../../pages/login/login";
import Register from "../../pages/Register/register";
import notify from "../../components/notify";
import { useLocation, useNavigate } from "react-router";
import { isTokenValid } from "../../dataFetching/userApi/user.api";
function LoginsignupRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const CustomApiResponse = await isTokenValid();
      const apiData = CustomApiResponse?.apiResponse;

      if (apiData.success) {
        notify("You are already iogin, Logout to access Login page", true);
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/"
      ) {
        if (
          error.apiResponse?.data.statusCode > 500 &&
          error.apiResponse?.data.statusCode < 499
        ) {
          notify(error.apiResponse.data.message, false);
        }
      }
    }
  };

  // Use in useEffect
  useEffect(() => {
    if (
      location.pathname == "/login" ||
      location.pathname == "/register" ||
      location.pathname == "/"
    ) {
      checkAuth();
    }
  }, [location.pathname]);
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return <>{routes}</>;
}

export default LoginsignupRoutes;
