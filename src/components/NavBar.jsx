import { useUser } from "@/contexts/UserProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputSearch from "./navbar/InputSearch";
import Options from "./navbar/Options";
import UserOptions from "./navbar/UserOptions";
import { FaHome, FaHeart, FaPen, FaCompass } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

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
      <nav className="relative">
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
        <div className="flex justify-between items-center _lg:hidden bg-colorPrimario">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-white hover:text-white focus:outline-none focus:text-white transform transition-all hover:scale-110 duration-200"
          >
            {/* Icono de hamburguesa */}
            <svg
              className="h-8 w-8"
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
          <div className="mx-auto">
            <InputSearch />
          </div>
        </div>

        {/**menu hamburugesa */}
        <div
          className={`_lg:hidden absolute left-0 w-1/2 _md:w-4/12 h-screen z-50 bg-colorPrimario transform ${
            isOpen ? "translate-x-0 shadow-md" : "-translate-x-full"
          } transition-transform duration-500`}
        >
          <div className="flex flex-col text-white gap-y-3 textsml mx-4 gap-x-1 text-left">
            <button
              className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
              onClick={() => {
                router.push("/"), setIsOpen(false);
              }}
            >
              <FaHome /> Inicio
            </button>
            <button
              className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
              onClick={() => {
                router.push("/books/create"), setIsOpen(false);
              }}
            >
              <FaPen /> Escribir
            </button>
            <button
              className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
              onClick={() => {
                router.push("/favorites"), setIsOpen(false);
              }}
            >
              <FaHeart /> Mis Favoritos
            </button>
            <button
              className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
              onClick={() => {
                router.push("/page-construction"), setIsOpen(false);
              }}
            >
              <FaCompass /> Explorar
            </button>
            <button
              className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
              onClick={() => {
                router.push("/page-construction"), setIsOpen(false);
              }}
            >
              <FaUser /> Mi cuenta
            </button>
          </div>

          <div className="absolute bottom-16 mx-4 w-full">
            <UserOptions username={username} logout={logout} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
