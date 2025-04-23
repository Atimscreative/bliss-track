import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { Package, ShoppingBag, Store } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function MobileBottomNav() {
  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:max-w-md sm:mx-auto sm:bottom-4 bg-white border-t border-neutral-200 py-3 sm:rounded-full sm:shadow-[0_0_30px_rgba(0,0,0,0.2)] lg:hidden z-10">
      <div className="grid grid-cols-4 gap-1">
        {navmenu.map((menu) => (
          <NavLink
            key={menu.label}
            to={menu.url}
            className={({ isActive }) =>
              cn("flex flex-col items-center justify-center py-2 relative", {
                "text-bliss-600 font-medium": isActive,
                "text-gray-500": !isActive,
              })
            }
          >
            <span className="relative">
              <menu.icon className="h-5 w-5" />
              {menu.label === "Cart" && (
                <span className="w-4 h-4 rounded-full absolute -right-2 -top-1 text-white bg-red-600 text-xs inline-flex justify-center items-center">
                  {cart?.length}
                </span>
              )}
            </span>
            <span className="text-sm mt-1">{menu.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

const navmenu = [
  {
    icon: Store,
    label: "Shop",
    url: "/shop",
  },
  {
    icon: Package,
    label: "Orders",
    url: "/orders",
  },
  {
    icon: ShoppingBag,
    label: "Cart",
    url: "/cart",
  },
  {
    icon: ShoppingBag,
    label: "Profile",
    url: "/my-profile",
  },
  // {
  //   icon: LineChart,
  //   label: "Reports",
  //   url: "/analysis",
  // },
];
