import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
// useNavigate is hook Navigate is Component
export default function PrivateRoute() {
  const currentLogin = useSelector((state) => state.loginReducer.id);

  return currentLogin ? <Outlet /> : <Navigate to="/" />;
}
