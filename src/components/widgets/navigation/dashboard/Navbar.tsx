import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  LogOut,
  User,
  Home,
  Package,
  DollarSign,
  ShoppingBag,
  LineChart,
  Settings,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../../ModeToggle";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!currentUser) {
    return <Outlet />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-10 dark:bg-neutral-900 dark:border-neutral-800">
      <div className="w-full px-8 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden bg-bliss-50"
              >
                <Menu className="h-[20px_!important] w-[20px_!important] grow" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[340px] bg-gray-50 p-0 dark:bg-neutral-900"
            >
              <div className="py-6 px-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-xl text-bliss-500">
                    BlissTrack
                  </span>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center px-3 py-3 rounded-md text-sm transition-colors",
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
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold text-bliss-500 ml-2 md:ml-0">
            BlissTrack
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <span className="hidden md:inline text-sm font-medium text-gray-600">
            {currentUser.name}
          </span>
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-bliss-500 text-white">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
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
