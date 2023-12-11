import { Navigate } from "react-router-dom";
import { isAuthenticate } from "../../api/base";

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticate()) {
    return <Navigate to="/login"/>
  }

  return children
}