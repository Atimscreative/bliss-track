import { cn } from "@/lib/utils";
import { BadgeCent, BedSingle, Home, Package2 } from "lucide-react";
import { NavLink } from "react-router";

export default function BottomNav() {
  return (
    <nav className=" p-4 fixed bottom-0 w-full left-0 h-20 bg-bg shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      <div className="wrapper flex justify-between items-center gap-6">
        {navmenu?.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.url}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1",
                isActive ? "text-main" : "text-heading"
              )
            }
          >
            <menu.icon />
            <span className="text-sm font-medium">{menu?.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

const navmenu = [
  {
    icon: Home,
    label: "Home",
    url: "/app",
  },
  {
    icon: BedSingle,
    label: "Stocks",
    url: "/app/stocks",
  },
  {
    icon: Package2,
    label: "Expenses",
    url: "/app/expenses",
  },
  {
    icon: BadgeCent,
    label: "Sales",
    url: "/app/sales",
  },

  // {
  //   icon: Home,
  //   label: "Settings",
  //   url: "/app",
  // },
];
