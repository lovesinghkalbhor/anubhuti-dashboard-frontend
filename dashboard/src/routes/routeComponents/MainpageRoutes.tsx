import { useEffect } from "react";
import {
  useRoutes,
  RouteObject,
  useLocation,
  useNavigate,
} from "react-router-dom"; // ✅ Corrected import
import User from "../../pages/Users/user";
import Dashboard from "../../pages/Dashboard/dashboard";
import { isTokenValid } from "../../dataFetching/userApi/user.api";
import notify from "../../components/notify";
import EditDonationForm from "../../pages/Donations/editdonation";
import EditDonationFormKinds from "../../pages/Donations/editdonationFormKinds";
import DonationList from "../../pages/DonationList/donationList";

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
      notify("Something went wrong, contact developer support", false);
      navigate("/login");
    }
  };

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
    { path: "/donation", element: <DonationList /> },
    { path: "/user", element: <User /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/editDonation/:id", element: <EditDonationForm /> },
    { path: "/editKindDonation/:id", element: <EditDonationFormKinds /> },
  ];

  const element = useRoutes(routes);
  return <>{element}</>;
};

export default MainpageRoutes;
