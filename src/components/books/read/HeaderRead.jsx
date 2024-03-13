import { FaArrowLeft } from "react-icons/fa";
import { CiCircleChevLeft, CiCircleChevRight, CiBoxList } from "react-icons/ci";
import { IoText } from "react-icons/io5";
import { IoTextOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { IoChevronForward, IoArrowBackOutline } from "react-icons/io5";

const HeaderRead = ({ titulo, capitulo }) => {
  return (
    <div className="w-2/3 mx-auto my-12">
      <div className="flex justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-10 relative transition-all duration-300 transform hover:scale-110 group hover:cursor-pointer">
              <IoArrowBackOutline className="w-full h-full absolute top-0 left-0 group-hover:opacity-0" />
              <FaArrowLeft className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
            </div>
            <div>
              <p className="font-bold">Volver</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl text-colorPrimario text-center font-semibold">
            título capítulo
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="group w-8 h-10 transition-all duration-300 transform hover:scale-110 relative mr-4 hover:cursor-pointer">
            <CiBoxList className="w-full h-full absolute top-0 left-0 group-hover:opacity-0" />
            <FaList className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
          </div>
          <div>
            <div className="w-8 h-10 transition-transform duration-300 transform hover:scale-110 relative hover:cursor-pointer">
              <IoTextOutline className="w-full h-full absolute top-0 left-0" />
              <IoText className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
            </div>
          </div>
          <div className="w-8 h-5 transition-transform duration-300 transform hover:scale-110 relative mt-2 hover:cursor-pointer">
            <IoTextOutline className="w-full h-full absolute top-0 left-0" />
            <IoText className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderRead;
