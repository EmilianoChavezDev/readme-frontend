"use client";
import { FaArrowLeft } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { IoText } from "react-icons/io5";
import { IoTextOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import CapMenu from "./CapMenu";
import { useRouter } from "next/navigation";
import { Tooltip } from "@material-tailwind/react";
import { UseRead } from "@/contexts/ReadProvider";

const HeaderRead = ({ titulo, capitulo, id }) => {
  const { handleUnZoom, handleZoom } = UseRead();
  const router = useRouter();
  const menuRef = useRef();
  const [showMenuCap, setShowMenuCap] = useState(false);

  const handleShowMenuCap = () => {
    setShowMenuCap(!showMenuCap);
  };

  const previousPage = () => {
    router.push(`/books/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenuCap(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sm:w-2/3 mx-auto w-full">
      <div className="flex justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center justify-center">
          <button onClick={() => previousPage()}>
            <div className="flex justify-center items-center gap-2">
              <div className="sm:w-8 sm:h-10 w-3 h-3 relative transition-all duration-200 transform hover:scale-110 group hover:cursor-pointer">
                <IoArrowBackOutline className="sm:w-full sm:h-full absolute top-0 left-0 group-hover:opacity-0" />
                <FaArrowLeft className="sm:w-full sm:h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
              </div>
              <div>
                <p className="sm:font-bold font-semibold">Volver</p>
              </div>
            </div>
          </button>
        </div>
        <div className="flex text-center items-center">
          <h1 className="_md:text-3xl text-colorPrimario text-center font-semibold text-lg">
            {titulo}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative">
            <Tooltip content="lista de capitulos">
              <button onClick={() => handleShowMenuCap()}>
                <div className="group w-8 h-10 transition-all duration-200 transform hover:scale-110 relative mr-4 hover:cursor-pointer">
                  <CiBoxList className="w-full h-full absolute top-0 left-0 group-hover:opacity-0" />
                  <FaList className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
                </div>
              </button>
            </Tooltip>
            {showMenuCap && (
              <div ref={menuRef}>
                <CapMenu capitulo={capitulo} />
              </div>
            )}
          </div>
          <div>
            <Tooltip content="aumentar tamaño">
              <button onClick={handleZoom}>
                <div className="w-8 h-10 transition-transform duration-200 transform hover:scale-110 relative hover:cursor-pointer">
                  <IoTextOutline className="w-full h-full absolute top-0 left-0" />
                  <IoText className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
                </div>
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="disminuir tamaño">
              <button onClick={handleUnZoom}>
                <div className="w-8 h-5 transition-transform duration-200 transform hover:scale-110 relative mt-2 hover:cursor-pointer">
                  <IoTextOutline className="w-full h-full absolute top-0 left-0" />
                  <IoText className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
                </div>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderRead;
