import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import App from "./App";
import { CartProvider } from "./state/cart";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router hook={useHashLocation}>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </React.StrictMode>,
);
