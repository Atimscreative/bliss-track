import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Package,
  DollarSign,
  ShoppingBag,
  LineChart,
  Settings,
  Menu,
  LogOut,
  User,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MainLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) {
    return <Outlet />;
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation - Mobile */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
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
              <SheetContent side="left" className="w-[240px] bg-gray-50 p-0">
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
                              "bg-bliss-500 text-white font-medium": isActive,
                              "text-gray-700 hover:bg-bliss-50 hover:text-bliss-500":
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
            <span className="hidden md:inline text-sm font-medium text-gray-600">
              {currentUser.name}
            </span>
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-bliss-500 text-white">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-10">
        <div className="grid grid-cols-5 gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("flex flex-col items-center justify-center py-2", {
                "text-primary": isActive,
                "text-gray-500": !isActive,
              })
            }
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              cn("flex flex-col items-center justify-center py-2", {
                "text-primary": isActive,
                "text-gray-500": !isActive,
              })
            }
          >
            <DollarSign className="h-5 w-5" />
            <span className="text-xs mt-1">Expenses</span>
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              cn("flex flex-col items-center justify-center py-2", {
                "text-primary": isActive,
                "text-gray-500": !isActive,
              })
            }
          >
            <Package className="h-5 w-5" />
            <span className="text-xs mt-1">Stock</span>
          </NavLink>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              cn("flex flex-col items-center justify-center py-2", {
                "text-primary": isActive,
                "text-gray-500": !isActive,
              })
            }
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Sales</span>
          </NavLink>
          <NavLink
            to="/analysis"
            className={({ isActive }) =>
              cn("flex flex-col items-center justify-center py-2", {
                "text-primary": isActive,
                "text-gray-500": !isActive,
              })
            }
          >
            <LineChart className="h-5 w-5" />
            <span className="text-xs mt-1">Reports</span>
          </NavLink>
        </div>
      </div>

      {/* Desktop Sidebar */}
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
        <main className="flex-1 pb-16 md:pb-4 px-4 md:px-8 py-6 max-w-5xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
