"use client"
import React from "react";
import NavBar from "../NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <section>{children}</section>
    </div>
  );
};

export default Layout;
