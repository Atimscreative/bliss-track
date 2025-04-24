import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user || user.role !== "admin" || user.role !== "staff") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
