import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Provider store={store}>
        <AuthProvider>
          <CartProvider>
            <Toaster richColors theme="light" />

            <App />
          </CartProvider>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
