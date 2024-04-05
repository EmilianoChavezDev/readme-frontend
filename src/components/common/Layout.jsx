"use client";
import React, { use, useEffect } from "react";
import NavBar from "../NavBar";
import { usePathname } from "next/navigation";
import { ignorePaths } from "@/utils/ignoreNavbarAndFooter";

const Layout = ({ children }) => {
  const router = usePathname();
  const pathSegments = router.split("/");

  return (
    <div>
      <div className="sticky top-0 z-50">
        {!ignorePaths.some((path) => path === router) &&
          !(
            router.startsWith("/books/") &&
            pathSegments[pathSegments.length - 1] === "read"
          ) && <NavBar />}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
