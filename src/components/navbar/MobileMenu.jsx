import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaPen, FaHeart, FaCompass, FaUser } from "react-icons/fa";
import UserOptions from "./UserOptions";
import { useUser } from "@/contexts/UserProvider";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { username, logout, token } = useUser();
  const router = useRouter();

  const handleMenuClick = (route) => {
    router.push(route);
    setIsOpen(false);
  };

  return (
    <div
      className={`_lg:hidden absolute left-0 w-1/2 _md:w-4/12 h-screen z-50 bg-colorPrimario transform ${
        isOpen ? "translate-x-0 shadow-md" : "-translate-x-full"
      } transition-transform duration-500`}
    >
      <div className="flex flex-col text-white gap-y-3 textsml mx-4 gap-x-1 text-left">
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/")}
        >
          <FaHome /> Inicio
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/books/create")}
        >
          <FaPen /> Escribir
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/favorites")}
        >
          <FaHeart /> Mis Favoritos
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/page-construction")}
        >
          <FaCompass /> Explorar
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/page-construction")}
        >
          <FaUser /> Mi cuenta
        </button>
      </div>

      <div className="absolute bottom-16 mx-4 w-full">
        <UserOptions username={username} logout={logout} />
      </div>
    </div>
  );
};

export default MobileMenu;
