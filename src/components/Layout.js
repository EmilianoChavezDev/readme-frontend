"use client";
import UserProvider, { useUser } from "@/contexts/UserProvider";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Layout = () => {
  const { username, logout } = useUser();

  // Obtén las iniciales del nombre de usuario
  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-between px-10 bg-colorPrimario py-4">
        {/* parte de las opciones */}
        <div className="flex text-white items-center gap-2">
          <div className="flex">Readme</div>
          <div className="flex gap-2 text-sm">
            <div className="flex items-center border-b border-transparent hover:border-white transition-colors duration-300">
              <p className="cursor-pointer text-sm">Explorar</p>
              <button
                type="button"
                className="flex items-center justify-center"
              >
                <IoMdArrowDropdown size={18} />
              </button>
            </div>
            <p className="cursor-pointer border-b border-transparent hover:border-white transition-colors duration-300">
              Mis Favoritos
            </p>
            <div className="flex items-center border-b border-transparent hover:border-white transition-colors duration-300">
              <p className="cursor-pointer text-sm">Escribe</p>
              <button
                type="button"
                className="flex items-center justify-center"
              >
                <IoMdArrowDropdown size={18} />
              </button>
            </div>
          </div>
        </div>
        {/* parte del buscador */}
        <div className="flex items-center flex-grow mr-96 ml-60">
          <input
            type="text"
            placeholder="Buscar Libros por ej.: Nombre, Autor..."
            className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full"
          />
          <button
            type="button"
            className="bg-transparent p-2 rounded-md hover:text-white"
          >
            <AiOutlineSearch size={24} />
          </button>
        </div>
        {/* parte del usuario */}

        <div className="flex items-center border-b border-transparent text-white">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-1">
            {initials}
          </div>
          <div className="relative">
            <div className="flex items-center gap-1">
              <p className="cursor-pointer text-sm">{username}</p>
              <button
                type="button"
                className="flex items-center justify-center"
                onClick={toggleDropdown}
              >
                <IoMdArrowDropdown size={18} />
              </button>
            </div>
            {isOpen && (
              <div className="absolute z-10 bg-white border border-gray-200 shadow-lg p-2 mt-2 -right-2 top-full text-black w-40">
                <ul className="my-2">
                  <li className="mb-2 hover:cursor-pointer hover:font-semibold">
                    <FaUserCircle className="inline-block mr-2" />
                    Mi cuenta
                  </li>
                  <li
                    className="hover:cursor-pointer hover:font-semibold"
                    onClick={() => logout()}
                  >
                    <FaSignOutAlt className="inline-block mr-2" />
                    Cerrar sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
