import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/authentication/Login";
import Expenses from "./pages/dashboard/Expenses";
import Inventory from "./pages/dashboard/Inventory";
import Pricing from "./pages/dashboard/Pricing";
import Sales from "./pages/dashboard/Sales";
import Analysis from "./pages/dashboard/Analysis";
import Settings from "./pages/dashboard/Settings";
import Shop from "./pages/user/Shop";
import Products from "./pages/dashboard/Products";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Orders from "./pages/user/Orders";
import CustomerProfile from "./pages/user/CustomerProfile";
import AdminProtectedRoute from "./pages/protected-routes/AdminProtectedRoutes";
import ProtectedRoute from "./pages/protected-routes/CustomerProtectedRoutes";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Customer-facing Routes */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/my-profile" element={<CustomerProfile />} />
          </Route>

          {/* ADMIN  */}
          <Route
            element={
              <AdminProtectedRoute>
                <MainLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/products" element={<Products />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
