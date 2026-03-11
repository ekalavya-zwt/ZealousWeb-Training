import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, role }) => {
  const adminRole = "admin";

  if (adminRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;
