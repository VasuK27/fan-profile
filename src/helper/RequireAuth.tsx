import { Outlet } from "react-router-dom";
import Unauthorized from "layout/unauthorized";
import { getCurrentUser } from "utils/GetCurrentUser";

const RequireAuth = () => {
  return getCurrentUser()?.username ? <Outlet /> : <Unauthorized />;
};

export default RequireAuth;
