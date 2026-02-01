// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../features/auth/authSlice";

function ProtectedRoute({ children }) {
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
