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
    <div className="w-2/3 mx-auto">
      <div className="flex justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center justify-center">
          <button onClick={() => previousPage()}>
            <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-10 relative transition-all duration-200 transform hover:scale-110 group hover:cursor-pointer">
                <IoArrowBackOutline className="w-full h-full absolute top-0 left-0 group-hover:opacity-0" />
                <FaArrowLeft className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
              </div>
              <div>
                <p className="font-bold">Volver</p>
              </div>
            </div>
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-3xl text-colorPrimario text-center font-semibold">
            {titulo}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative">
            <button onClick={() => handleShowMenuCap()}>
              <div className="group w-8 h-10 transition-all duration-200 transform hover:scale-110 relative mr-4 hover:cursor-pointer">
                <CiBoxList className="w-full h-full absolute top-0 left-0 group-hover:opacity-0" />
                <FaList className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
              </div>
            </button>
            {showMenuCap && (
              <div ref={menuRef}>
                <CapMenu capitulo={capitulo} />
              </div>
            )}
          </div>
          <div>
            <button onClick={handleZoom}>
              <div className="w-8 h-10 transition-transform duration-200 transform hover:scale-110 relative hover:cursor-pointer">
                <IoTextOutline className="w-full h-full absolute top-0 left-0" />
                <IoText className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
              </div>
            </button>
          </div>
          <div>
            <button onClick={handleUnZoom}>
              <div className="w-8 h-5 transition-transform duration-200 transform hover:scale-110 relative mt-2 hover:cursor-pointer">
                <IoTextOutline className="w-full h-full absolute top-0 left-0" />
                <IoText className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderRead;
