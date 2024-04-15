"use client";
import React, { use, useEffect } from "react";
import NavBar from "../NavBar";
import { usePathname } from "next/navigation";
import { ignorePaths } from "@/utils/ignoreNavbarAndFooter";

const Layout = ({ children }) => {
  const router = usePathname();
  const pathSegments = router.split("/");

  const shouldRenderNavBar = !ignorePaths.some((path) =>
    router.startsWith(path)
  );

  return (
    <div>
      <div className="sticky top-0 z-50">
        {shouldRenderNavBar &&
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
