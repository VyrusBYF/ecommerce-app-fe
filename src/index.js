import "./_shared/brand";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ScrollToTop } from "./_shared/ScrollToTop";
import { ShoppingCartProvider } from "./Shopping/Cart/ShoppingCartProvider";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const mediaUrl = "src/_meta/media";

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <ShoppingCartProvider>
        <Router basename="https://vyrusbyf.github.io/ecommerce-app-fe">
          <ScrollToTop />
          <App />
        </Router>
      </ShoppingCartProvider>
    </CookiesProvider>
  </React.StrictMode>
);
