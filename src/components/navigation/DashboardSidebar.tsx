import { NavLink, Outlet, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Home,
  Package,
  DollarSign,
  ShoppingBag,
  LineChart,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex flex-1">
      <aside className="hidden md:block w-64 border-r bg-white">
        <div className="p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }: { isActive: boolean }) =>
                  cn(
                    "flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors",
                    {
                      "bg-bliss-lavender text-primary": isActive,
                      "text-gray-700 hover:bg-gray-100": !isActive,
                    }
                  )
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-4 px-4 md:px-8 py-6 w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Home className="h-5 w-5 mr-3" />,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: <DollarSign className="h-5 w-5 mr-3" />,
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: <Package className="h-5 w-5 mr-3" />,
  },
  {
    name: "Pricing",
    path: "/pricing",
    icon: <PlusCircle className="h-5 w-5 mr-3" />,
  },
  {
    name: "Sales",
    path: "/sales",
    icon: <ShoppingBag className="h-5 w-5 mr-3" />,
  },
  {
    name: "Analysis",
    path: "/analysis",
    icon: <LineChart className="h-5 w-5 mr-3" />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="h-5 w-5 mr-3" />,
  },
];
