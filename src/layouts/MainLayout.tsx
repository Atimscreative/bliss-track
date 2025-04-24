import React from "react";
import BottomNavMobile from "@/components/widgets/navigation/dashboard/BottomNav";
import DashboardSidebar from "@/components/widgets/navigation/dashboard/DashboardSidebar";
import Navbar from "@/components/widgets/navigation/dashboard/Navbar";
import AdminProtectedRoute from "@/pages/protected-routes/AdminProtectedRoutes";

const MainLayout: React.FC = () => {
  return (
    <AdminProtectedRoute>
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation  */}
        <Navbar />

        {/* BOTTOM NAV MOBILE */}
        <BottomNavMobile />

        {/* Desktop Sidebar */}
        <DashboardSidebar />
      </div>
    </AdminProtectedRoute>
  );
};

export default MainLayout;
