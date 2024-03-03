"use client";
import { useUser } from "@/contexts/UserProvider";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  FaUserCircle,
  FaPlusCircle,
  FaListUl,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NavBar = () => {
  const { username, logout, token, expiration } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEscribir, setIsOpenEscribir] = useState(false);
  const [isOpenExplorar, setIsOpenExplorar] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsOpenEscribir(false);
    setIsOpenExplorar(false);
  };
  const toggleDropdownEscribir = () => {
    setIsOpenEscribir(!isOpenEscribir);
    setIsOpen(false);
    setIsOpenExplorar(false);
  };
  const toggleDropdownExplorar = () => {
    setIsOpenExplorar(!isOpenExplorar);
    setIsOpen(false);
    setIsOpenEscribir(false);
  };

  const handlNoPageClick = () => {
    router.push("/page-construction");
  };

  const handleFavoriteClick = () => {
    router.push("/favorites");
  };

  const handleHomeClick = () => {
    setIsOpenExplorar(false);
    setIsOpen(false);
    setIsOpenEscribir(false);
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-between px-10 bg-colorPrimario py-4">
        {/* parte de las opciones */}
        <div className="flex text-white items-center gap-2">
          <div
            className="flex gap-1 mr-2 items-center cursor-pointer"
            onClick={() => handleHomeClick()}
          >
            <Image width={55} height={50} alt="logo" src={"/image/logo1.png"} />
            <Image width={20} height={50} alt="logo" src={"/image/logo2.png"} />
          </div>
          <div className="flex gap-2 text-sm">
            <div className="relative">
              <div
                className="flex items-center border-b border-transparent hover:border-white transition-colors duration-300"
                onClick={() => toggleDropdownExplorar()}
              >
                <p className="cursor-pointer text-sm">Explorar</p>
                <button
                  type="button"
                  className="flex items-center justify-center"
                >
                  <IoMdArrowDropdown size={18} />
                </button>
              </div>
              {isOpenExplorar && (
                <div className="absolute z-10 bg-white border border-gray-200 shadow-lg p-2 top-full text-black w-96">
                  <ul className="my-2 gap-4 grid grid-cols-4">
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Ficción histórica
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Novela negra
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Ciencia ficción
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Biografías y memorias
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Literatura clásica
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Literatura fantástica
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Poesía
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Literatura infantil
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Autoayuda y desarrollo personal
                    </li>
                    <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
                      Ensayos
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <p
              className="cursor-pointer border-b border-transparent hover:border-white transition-colors duration-300"
              onClick={() => handleFavoriteClick()}
            >
              Mis Favoritos
            </p>
            <div className="relative">
              <div
                className="flex items-center border-b border-transparent hover:border-white transition-colors duration-300"
                onClick={() => toggleDropdownEscribir()}
              >
                <p className="cursor-pointer text-sm">Escribe</p>
                <button
                  type="button"
                  className="flex items-center justify-center"
                >
                  <IoMdArrowDropdown size={18} />
                </button>
              </div>
              {isOpenEscribir && (
                <div className="absolute z-10 bg-white border border-gray-200 shadow-lg p-2 top-full text-black w-48">
                  <ul className="my-2">
                    <li
                      className="mb-3 hover:cursor-pointer hover:font-semibold"
                      onClick={() => handlNoPageClick()}
                    >
                      <FaPlusCircle className="inline-block mr-2" />
                      Crear nuevo libro
                    </li>
                    <li
                      className="mb-3 hover:cursor-pointer hover:font-semibold"
                      onClick={() => handlNoPageClick()}
                    >
                      <FaListUl className="inline-block mr-2" />
                      Mis libros
                    </li>
                    <li
                      className="hover:cursor-pointer hover:font-semibold"
                      onClick={() => handlNoPageClick()}
                    >
                      <FaFileAlt className="inline-block mr-2" />
                      Mis borradores
                    </li>
                  </ul>
                </div>
              )}
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
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2">
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
                  <li
                    className="mb-4 hover:cursor-pointer hover:font-semibold border-b border-gray-200 pb-2"
                    onClick={() => handlNoPageClick()}
                  >
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

export default NavBar;
