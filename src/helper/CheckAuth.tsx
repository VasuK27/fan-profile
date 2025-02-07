import { driverRoute } from "constant/RoutesEndPoint";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "utils/GetCurrentUser";

const CheckAuth = () => {
  const isLoggedIn = getCurrentUser()?.username;
  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={driverRoute.DRIVER} replace />
  );
};

export default CheckAuth;
