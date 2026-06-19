import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import App from "./App";
import { CartProvider } from "./state/cart";
import { CatalogProvider } from "./state/catalog";
import { ShopUiProvider } from "./state/shop-ui";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router hook={useHashLocation}>
      <CatalogProvider>
        <CartProvider>
          <ShopUiProvider>
            <App />
          </ShopUiProvider>
        </CartProvider>
      </CatalogProvider>
    </Router>
  </React.StrictMode>,
);
