import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
// useNavigate is hook Navigate is Component
export default function ManagerPrivateRoute() {
  const currentLogin = useSelector((state) => state.loginReducer.manager_id);

  return currentLogin === import.meta.env.VITE_MANAGER ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
