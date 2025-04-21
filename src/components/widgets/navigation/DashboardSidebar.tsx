import { NavLink, Outlet, useNavigate } from "react-router";
import { Button } from "../../ui/button";
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
      <aside className="hidden lg:block w-56 border-r border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800">
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
                      "bg-bliss-500 text-white": isActive,
                      "text-gray-700 hover:text-bliss-500 dark:text-neutral-300 hover:bg-bliss-50 dark:hover:bg-neutral-800 dark:hover:text-bliss-500":
                        !isActive,
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
      <main className="flex-1 bg-bliss-50/50 dark:bg-neutral-800 pb-28 lg:pb-8 px-4 md:px-8 py-6 w-full mx-auto">
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
