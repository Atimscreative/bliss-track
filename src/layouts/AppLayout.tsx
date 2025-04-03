import BottomNav from "@/components/navigation/BottomNav";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <div className="pb-28">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}
