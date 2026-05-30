import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({
  children,
}) {

  const { admin } = useAuth();

  if (!admin) {
    return (
      <Navigate to="/login" />
    );
  }

  return children;
}