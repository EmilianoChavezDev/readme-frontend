"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlusCircle, FaListUl, FaFileAlt } from "react-icons/fa";

const Options = () => {
  const [isOpenEscribir, setIsOpenEscribir] = useState(false);
  const [isOpenExplorar, setIsOpenExplorar] = useState(false);

  const router = useRouter();

  const toggleDropdownEscribir = () => {
    setIsOpenEscribir(!isOpenEscribir);
    setIsOpenExplorar(false);
  };
  const toggleDropdownExplorar = () => {
    setIsOpenExplorar(!isOpenExplorar);
    setIsOpenEscribir(false);
  };

  const handlNoPageClick = () => {
    router.push("/page-construction");
  };

  const handleFavoriteClick = () => {
    router.push("/favorites");
  };
  const handleNewBook = () => {
    router.push("/books/create");
  };

  const handleHomeClick = () => {
    setIsOpenExplorar(false);
    setIsOpenEscribir(false);
    router.push("/");
  };

  return (
    <div
      className="flex text-white items-center gap-2
        sm:items-center sm:justify-center 
  "
    >
      <div
        className="flex gap-1 mr-2 items-center cursor-pointer"
        onClick={() => handleHomeClick()}
      >
        <Image
          width={0}
          height={0}
          alt="logo"
          src={"/image/g3.png"}
          sizes="100vw"
          style={{ width: "100px", height: "20px" }}
        />
      </div>
      <div className="flex gap-2 text-sm sm:text-xs">
        <div className="relative">
          <div
            className="flex items-center border-b border-transparent hover:border-white transition-colors duration-300

          "
            onClick={() => toggleDropdownExplorar()}
          >
            <p className="cursor-pointer md:text-sm sm:text-xs">Explorar</p>
            <button type="button" className="flex items-center justify-center">
              <IoMdArrowDropdown size={18} />
            </button>
          </div>
          {isOpenExplorar && (
            <div
              className="absolute z-10 bg-white border border-gray-200 shadow-lg p-2 top-full text-black w-96
          md:text-sm sm:text-xs 
          
          "
            >
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
        <div className=" xs:justify-center sm:text-nowrap md:text-sm sm:text-xs">
          <Link
            className="cursor-pointer border-b border-transparent hover:font-semibold transition-colors duration-300 
        "
            href={"/favorites"}
          >
            Mis Favoritos
          </Link>
        </div>
        <div className="relative">
          <div
            className="group cursor-pointer flex items-center border-b border-transparent hover:font-semibold transition-all duration-200 md:text-sm sm:text-xs"
            onClick={() => toggleDropdownEscribir()}
          >
            <p className="font-normal">Escribe</p>
            <button
              type="button"
              className={`flex items-center justify-center transition-all duration-200 transform ${
                isOpenEscribir ? "rotate-180" : "rotate-0"
              }`}
              style={{ transition: "transform 0.3s" }}
            >
              <IoMdArrowDropdown size={18} />
            </button>
          </div>
          {isOpenEscribir && (
            <div
              className="absolute z-10 bg-white border border-gray-200 shadow-lg p-2 top-full text-black w-48
          
          md:text-sm sm:text-xs
          "
            >
              <ul className="my-2">
                <li
                  className="mb-3 hover:cursor-pointer hover:font-semibold"
                  onClick={() => handleNewBook()}
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
  );
};

export default Options;
