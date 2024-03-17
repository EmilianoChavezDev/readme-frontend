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

  const handleNewBook = () => {
    router.push("/books/create");
  };

  const handleDraft = () => {
    router.push("/drafts");
  };

  const handleHomeClick = () => {
    setIsOpenExplorar(false);
    setIsOpenEscribir(false);
    router.push("/");
  };

  return (
    <div
      className="md:flex text-white md:items-center md:gap-2
        sm:items-center sm:justify-center 
  "
    >
      <div
        className="lg:flex md:gap-1 md:items-center cursor-pointer hidden lg:w-auto md:w-20 lg:mr-2"
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
      {/**Comienzo del padre */}
      <div className="md:flex gap-2 lg:text-sm sm:text-xs sm:text-nowrap hidden md:items-center">
        <div className="relative">
          <div
            className="flex items-center 

          "
            onClick={() => toggleDropdownExplorar()}
          >
            <p className="hover:cursor-pointer hover:font-bold transition-all duration-300">
              Explorar
            </p>
            <button
              type="button"
              className={`flex items-center justify-center transition-all duration-200 transform ${
                isOpenExplorar ? "rotate-180" : "rotate-0"
              }`}
              style={{ transition: "transform 0.3s" }}
            >
              <IoMdArrowDropdown size={18} />
            </button>
          </div>
          {isOpenExplorar && (
            <div
              className="absolute z-10 bg-white border border-gray-200 shadow-lg p-2 top-11 text-black lg:w-96 md:w-60
          
          "
            >
              <ul className="md:my-2 md:gap-4 lg:gap-x-4 md:grid lg:grid-cols-3 md:grid-cols-2 col-span-1">
                <li className="hover:cursor-pointer hover:font-bold transition-all duration-300">
                  Ficción histórica
                </li>
                <li className="hover:cursor-pointer hover:font-bold transition-all duration-300">
                  Ficción histórica
                </li>
                <li className="hover:cursor-pointer hover:font-bold transition-all duration-300">
                  Ficción histórica
                </li>
                <li className="hover:cursor-pointer hover:font-bold transition-all duration-300">
                  Ficción histórica
                </li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <Link
            className="cursor-pointer border-b border-transparent hover:font-semibold transition-colors duration-300 
        "
            href={"/favorites"}
          >
            Mis Favoritos
          </Link>
        </div>

        <div className="md:relative">
          <div
            className="group cursor-pointer flex items-center border-b border-transparent hover:font-semibold transition-all duration-200"
            onClick={() => toggleDropdownEscribir()}
          >
            <p>Escribe</p>
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
              className="md:absolute md:z-10 md:bg-white border md:border-gray-200 md:shadow-lg md:p-2 md:top-11 text-black md:w-48
          "
            >
              <ul className="my-2">
                <li
                  className="mb-3 hover:cursor-pointer hover:font-bold transition-all duration-300"
                  onClick={() => handleNewBook()}
                >
                  <FaPlusCircle className="inline-block mr-2" />
                  Crear nuevo libro
                </li>
                <li
                  className="mb-3 hover:cursor-pointer hover:font-bold transition-all duration-300"
                  onClick={() => handlNoPageClick()}
                >
                  <FaListUl className="inline-block mr-2" />
                  Mis libros
                </li>
                <li
                  className="hover:cursor-pointer hover:font-bold transition-all duration-300"
                  onClick={() => handleDraft()}
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
