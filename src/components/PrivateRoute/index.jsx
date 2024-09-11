import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
// useNavigate is hook Navigate is Component
export default function PrivateRoute() {
  const currentLogin = useSelector(
    (state) => state.loginReducer.role_id === import.meta.env.VITE_RR
  );

  return currentLogin ? <Outlet /> : <Navigate to="/" />;
}
