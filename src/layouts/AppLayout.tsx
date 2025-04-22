import Header from "@/components/widgets/navigation/users/Header";
import MobileBottomNav from "@/components/widgets/navigation/users/MobileBottomNav";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
      <MobileBottomNav />
    </>
  );
}
