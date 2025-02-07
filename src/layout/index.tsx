import { Outlet } from "react-router-dom";
import { getCurrentUser } from "utils/GetCurrentUser";
import Header from "./header";

const Layout = () => {
  return <>{getCurrentUser()?.username ? <Header /> : <Outlet />}</>;
};

export default Layout;
