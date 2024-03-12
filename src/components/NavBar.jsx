"use client";
import { useUser } from "@/contexts/UserProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputSearch from "./navbar/InputSearch";
import Options from "./navbar/Options";
import UserOptions from "./navbar/UserOptions";

const NavBar = () => {
  const { username, logout, token, expiration } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!token) router.push("/auth/login");
  }, [token, isLoaded]);

  useEffect(() => {
    const storedExpiration = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpiration);

    if (!expirationDate) {
      router.push("/auth/login");
      return;
    }

    if (expirationDate < new Date()) {
      router.push("/auth/login");
    }
  }, [username, expiration, token, router]);

  return (
    <>
      <nav
        className="flex justify-between px-10 bg-colorPrimario md:py-4
        sm:flex sm:px-5 sm:py-2 sm:justify-normal
      "
      >
        {/* parte de las opciones */}
        <Options />
        {/* parte del buscador */}
        <InputSearch />
        {/* parte del usuario */}
        <UserOptions username={username} logout={logout} />
      </nav>
    </>
  );
};

export default NavBar;
