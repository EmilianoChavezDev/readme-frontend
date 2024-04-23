"use client";

import NavBar from "../NavBar";
import { usePathname } from "next/navigation";
import { ignorePaths } from "@/utils/ignoreNavbarAndFooter";
import { ThemeProvider } from "./ThemeProvider";

const Layout = ({ children }) => {
  const router = usePathname();
  const pathSegments = router.split("/");

  const shouldRenderNavBar =
    !ignorePaths.some((path) => router.startsWith(path)) &&
    !(pathSegments[1] === "books" && pathSegments[3] === "chapters");

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="sticky top-0 z-50">
        {shouldRenderNavBar && <NavBar />}
      </div>
      <div>{children}</div>
    </ThemeProvider>
  );
};

export default Layout;
