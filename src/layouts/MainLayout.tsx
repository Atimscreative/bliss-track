import React from "react";
import { Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import BottomNavMobile from "@/components/widgets/navigation/BottomNav";
import DashboardSidebar from "@/components/widgets/navigation/DashboardSidebar";
import Navbar from "@/components/widgets/navigation/Navbar";

const MainLayout: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation  */}
      <Navbar />

      {/* BOTTOM NAV MOBILE */}
      <BottomNavMobile />

      {/* Desktop Sidebar */}
      <DashboardSidebar />
    </div>
  );
};

export default MainLayout;
