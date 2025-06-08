import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "tailwindcss/tailwind.css";
import reportWebVitals from "./reportWebVitals.ts";
import { CartProvider } from "./context/CartProvider.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderSummary from "./pages/OrderSummary.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>{" "}
      </CartProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "bg-rose-500 text-white font-redhat",
          style: {
            fontSize: "16px",
            padding: "12px 20px",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);

reportWebVitals(console.log);
