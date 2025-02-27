import { useEffect } from "react";
import { useRoutes, RouteObject } from "react-router";
import Donations from "../../pages/Donations/donations";
import User from "../../pages/Users/user";
import Dashboard from "../../pages/Dashboard/dashboard";
import { useLocation, useNavigate } from "react-router";
import { isTokenValid } from "../../dataFetching/userApi/user.api";
import notify from "../../components/notify";
const MainpageRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const CustomApiResponse = await isTokenValid();
      const apiData = CustomApiResponse?.apiResponse;

      if (apiData.success) {
        return;
      }
    } catch (error: any) {
      if (
        error.apiResponse?.data.statusCode < 500 &&
        error.apiResponse?.data.statusCode >= 400
      ) {
        notify(error.apiResponse?.data.message, false);
        navigate("/login");
      } else {
        notify(error.apiResponse?.data.message, false);
      }
      notify("something went wrong contect developer support", false);

      navigate("/login");
    }
  };

  // Use in useEffect
  useEffect(() => {
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/"
    ) {
      checkAuth();
    }
  }, [location.pathname]);

  const routes: RouteObject[] = [
    // { path: "/", element: <Donations /> },
    { path: "/donation", element: <Donations /> },
    { path: "/user", element: <User /> },
    { path: "/dashboard", element: <Dashboard /> },
  ];

  const element = useRoutes(routes);
  return <> {element}</>;
};

export default MainpageRoutes;
