import Header from "@/components/widgets/navigation/users/Header";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="">
        <Outlet />
      </div>
    </>
  );
}
