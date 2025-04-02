import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>

          <Route path="app" element={<AppLayout />}>
            <Route index element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
