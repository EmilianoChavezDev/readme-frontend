"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const handleToggle = (e) => {
    const { x, width } = e.currentTarget.getBoundingClientRect();
    const position = (e.clientX - x) / width;
    const theme = position < 0.5 ? "light" : "dark";
    setTheme(theme);
  };

  return (
    <div
      className="relative h-[1.5rem] w-[3rem] bg-gray-300 dark:bg-gray-800 rounded-full cursor-pointer mr-3"
      onClick={handleToggle}
    >
      <Sun className="absolute left-0 h-[1.2rem] w-[1.2rem] mt-[0.15rem] ml-[0.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute right-0 h-[1.2rem] w-[1.2rem] mt-[0.15rem] mr-[0.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </div>
  );
}
