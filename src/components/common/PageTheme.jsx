import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function PageTheme({ children }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light"); //set your theme here after component mounts
  }, []);

  return <>{children}</>;
}
