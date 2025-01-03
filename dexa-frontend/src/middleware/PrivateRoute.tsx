import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" />;
  if (role === "Employee" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/home" />;
  }

  if (role === "Admin" && location.pathname === "/home") {
    return <Navigate to="/admin/manajemen-karyawan" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
