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

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav>
        {/* Contenido para dispositivos no móviles */}
        <div className="justify-between px-10 bg-colorPrimario lg:py-4 md:px-5 md:py-2 md:justify-normal md:flex hidden">
          {/* parte de las opciones */}
          <Options />
          {/* parte del buscador */}
          <InputSearch />
          {/* parte del usuario */}
          <UserOptions username={username} logout={logout} />
        </div>

        {/* Icono del menú hamburguesa para dispositivos móviles */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-colorPrimario hover:text-colorHoverPrimario focus:outline-none focus:text-colorHoverPrimario"
          >
            {/* Icono de hamburguesa */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú desplegable para dispositivos móviles */}
      {isOpen && (
        <div className="md:hidden bg-colorPrimario">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Opciones de navegación */}
            <Options />
            {/* Buscador */}
            <InputSearch />
            {/* Usuario */}
            <UserOptions username={username} logout={logout} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
