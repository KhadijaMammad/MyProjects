import { Navigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import type { JSX } from "react/jsx-dev-runtime";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const auth = isAuthenticated();

  if (!auth) {
    logout(); 
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
