import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthToken } from "../../utils/getAuthToken";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = getAuthToken();
  const isAuthenticated = !!token;

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
