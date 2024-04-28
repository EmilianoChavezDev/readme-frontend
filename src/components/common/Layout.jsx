"use client";

import NavBar from "../NavBar";
import { usePathname } from "next/navigation";
import { ignorePaths } from "@/utils/ignoreNavbarAndFooter";

const Layout = () => {
  const router = usePathname();
  const pathSegments = router.split("/");

  const shouldRenderNavBar =
    !ignorePaths.some((path) => router.startsWith(path)) &&
    !(pathSegments[1] === "books" && pathSegments[3] === "chapters") &&
    !(pathSegments[1] === "books" && pathSegments[3] === "read");

  return (
    <div className="sticky top-0 z-50">{shouldRenderNavBar && <NavBar />}</div>
  );
};

export default Layout;
