import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/authentication/Login";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/expenses" element={<Expenses />} /> */}
            {/* <Route path="/inventory" element={<Inventory />} /> */}
            {/* <Route path="/pricing" element={<Pricing />} /> */}
            {/* <Route path="/sales" element={<Sales />} /> */}
            {/* <Route path="/analysis" element={<Analysis />} /> */}
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
