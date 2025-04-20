import { cn } from "@/lib/utils";
import {
  DollarSign,
  Home,
  // LineChart,
  Package,
  ShoppingBag,
} from "lucide-react";
import { NavLink } from "react-router";

export default function BottomNavMobile() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 py-3 md:hidden z-10">
      <div className="grid grid-cols-4 gap-1">
        {navmenu.map((menu) => (
          <NavLink
            to={menu.url}
            className={({ isActive }) =>
              cn("flex flex-col items-center justify-center py-2", {
                "text-bliss-600 font-medium": isActive,
                "text-gray-500": !isActive,
              })
            }
          >
            <menu.icon className="h-5 w-5" />
            <span className="text-sm mt-1">{menu.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

const navmenu = [
  {
    icon: Home,
    label: "Home",
    url: "/",
  },
  {
    icon: DollarSign,
    label: "Expenses",
    url: "/expenses",
  },
  {
    icon: Package,
    label: "Inventory",
    url: "/inventory",
  },
  {
    icon: ShoppingBag,
    label: "Sales",
    url: "/sales",
  },
  // {
  //   icon: LineChart,
  //   label: "Reports",
  //   url: "/analysis",
  // },
];
