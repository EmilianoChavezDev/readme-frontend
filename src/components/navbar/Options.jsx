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

  const handleNewBook = () => {
    router.push("/books/create");
  };

  const handleDraft = () => {
    router.push("/mybooks");
  };

  const handleHomeClick = () => {
    setIsOpenExplorar(false);
    setIsOpenEscribir(false);
    router.push("/");
  };

  return (
    <div
      className="_md:flex text-buttonColorGray _md:items-center _md:gap-2
       _md:justify-center 
  "
    >
      <div
        className="_md:flex _md:items-center cursor-pointer hidden _lg:w-20 _lg:mr-2
        transition-all duration-100 hover:scale-105
        hover:cursor-pointer
        "
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
      <div className="_md:flex _lg:gap-3 _xl:text-sm _lg:text-xs _lg:text-nowrap hidden _lg:items-center ">
        <div className="relative">
          <div
            className="_lg:flex _lg:items-center
            transition-all duration-100 hover:scale-105
            hover:cursor-pointer
            hover:text-white
          "
            onClick={() => toggleDropdownExplorar()}
          >
            <p>Explorar</p>
            <button
              type="button"
              className={`_lg:flex _lg:items-center _lg:justify-center transition-all duration-200 transform ${
                isOpenExplorar ? "rotate-180" : "rotate-0"
              }`}
              style={{ transition: "transform 0.3s" }}
            >
              <IoMdArrowDropdown size={18} />
            </button>
          </div>
          {isOpenExplorar && (
            <div
              className="_lg:absolute _lg:z-10 bg-white border border-gray-200 shadow-lg p-2 top-11 text-black _lg:w-96 md:w-60
          
          "
            >
              <ul className="_lg:my-2 _lg:gap-4 lg:gap-x-4 _lg:grid _lg:grid-cols-3 col-span-1">
                <li className="hover:cursor-pointer hover:font-bold transition-all duration-300">
                  Proximamente
                </li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <Link
            className="_lg:flex _lg:items-center
             transition-all duration-100 hover:scale-105
             hover:cursor-pointer
             hover:text-white
        "
            href={"/favorites"}
          >
            Mis Favoritos
          </Link>
        </div>

        <div className="_lg:relative">
          <div
            className="_lg:flex _lg:items-center
            transition-all duration-100 hover:scale-105
            hover:cursor-pointer
            hover:text-white"
            onClick={() => toggleDropdownEscribir()}
          >
            <p>Escribe</p>
            <button
              type="button"
              className={`_lg:flex _lg:items-center _lg:justify-center transition-all duration-200 transform ${
                isOpenEscribir ? "rotate-180" : "rotate-0"
              }`}
              style={{ transition: "transform 0.3s" }}
            >
              <IoMdArrowDropdown size={18} />
            </button>
          </div>
          {isOpenEscribir && (
            <div
              className="_lg:absolute _lg:z-10 bg-white border md:border-gray-200 _lg:shadow-lg _lg:p-2 _lg:top-11 text-black _lg:w-48
          "
            >
              <ul className="my-2">
                <li
                  className=" mb-4 pb-2 border-b border-gray-200 hover:cursor-pointer hover:font-bold transition-all duration-300"
                  onClick={() => handleNewBook()}
                >
                  <FaPlusCircle className="inline-block mr-2" />
                  Crear nuevo libro
                </li>
                <li
                  className=" mb-2 hover:cursor-pointer hover:font-bold transition-all duration-300"
                  onClick={() => handleDraft()}
                >
                  <FaListUl className="inline-block mr-2" />
                  Mis libros
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
