import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  return (
    <div className={isCartPage ? "layout cart-layout" : "layout"}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
