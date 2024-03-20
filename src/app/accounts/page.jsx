"use client";
import NavBar from "@/components/NavBar";
import { FaUser, FaChartBar } from "react-icons/fa";

const page = ({ params }) => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col">
        <div className="m-5 font-bold _lg:text-2xl _lg:my-8 _lg:ml-20">
          Mi cuenta
        </div>
        <div>
          <ul className="flex flex-col _lg:flex-row _lg:justify-around _lg:mx-16 mx-7 gap-y-4 _lg:gap-x-0">
            <li
              className="flex items-center gap-x-3 hover:cursor-pointer py-4 px-2 rounded-lg hover:shadow-lg transition-all transform duration-300 hover:scale-105
            _lg:py-6 _lg:flex-col _lg:text-left _lg:items-start _lg:gap-y-4 _lg:px-4
            
            "
            >
              <div>
                <FaUser size={20} className="_lg:size-10" />
              </div>
              <div>
                <p className="font-semibold">Información personal</p>
                <span className="text-textColorGray">
                  Proporcionar o cambiar datos personales, actualiza tu
                  contraseña
                </span>
              </div>
            </li>

            <li
              className="flex items-center gap-x-3 hover:cursor-pointer py-4 px-2 rounded-lg hover:shadow-lg transition-all transform duration-300 hover:scale-105
            _lg:py-6 _lg:flex-col _lg:text-left _lg:items-start _lg:gap-y-4 _lg:px-4
            
            "
            >
              <div>
                <FaChartBar size={20} className="_lg:size-10" />
              </div>
              <div>
                <p className="font-semibold">Estadísticas</p>
                <span className="text-textColorGray ">
                  Obtener un informe de las interacciones de los usuarios con
                  los libros publicados
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default page;
