import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { getAuthToken, getTokenDuration } from "../utils/getAuthToken";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout } from "../store/authSlice";

export default function RootLayoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      dispatch(logout());
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      dispatch(logout());
    }, tokenDuration);
  }, [token, dispatch]);

  return (
    <ProtectedRoute>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
