"use client";
import { useUser } from "@/contexts/UserProvider";
import { useRouter } from "next/navigation";
import { FaChartBar, FaUser } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdPrivacyTip } from "react-icons/md";

const page = () => {
  const { username } = useUser();
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col">
        <div className="m-5 font-bold _lg:text-2xl _lg:my-8 _lg:ml-20 text-textHeaderColorGray dark:text-white">
          Mi cuenta
        </div>
        <div>
          <ul className="flex flex-col _lg:flex-row _lg:justify-around _lg:mx-16 mx-7 gap-y-4 _lg:gap-x-3 _xl:gap-x-3 ">
            <li className="hover:cursor-pointer rounded-lg hover:shadow-lg transition-all transform duration-300 hover:scale-105 ">
              <button
                onClick={() => router.push(`/accounts/edit/${username}`)}
                className="flex items-center gap-x-3  py-4 px-2  _lg:py-6 _lg:flex-col _lg:text-left _lg:items-start _lg:gap-y-4 _lg:px-4"
              >
                <div>
                  <FaUser size={20} className="_lg:size-10" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-textInformationColor ">
                    Información personal
                  </p>
                  <span className="text-textColorGray text-sm">
                    Proporcionar o cambiar datos personales, actualiza tu
                    contraseña
                  </span>
                </div>
              </button>
            </li>

            <li className="hover:cursor-pointer rounded-lg hover:shadow-lg transition-all transform duration-300 hover:scale-105">
              <button
                onClick={() => router.push("/accounts/statistics")}
                className="flex items-center gap-x-3  py-4 px-2  _lg:py-6 _lg:flex-col _lg:text-left _lg:items-start _lg:gap-y-4 _lg:px-4"
              >
                <div>
                  <FaChartBar size={20} className="_lg:size-10" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-textInformationColor">
                    Estadísticas
                  </p>
                  <span className="text-textColorGray text-sm">
                    Obtener un informe de las interacciones de los usuarios con
                    los libros publicados
                  </span>
                </div>
              </button>
            </li>

            <li className="hover:cursor-pointer rounded-lg hover:shadow-lg transition-all transform duration-300 hover:scale-105">
              <button
                onClick={() => router.push("/books/recycle")}
                className="flex items-center gap-x-3  py-4 px-2  _lg:py-6 _lg:flex-col _lg:text-left _lg:items-start _lg:gap-y-4 _lg:px-4"
              >
                <div>
                  <ImBin2 size={20} className="_lg:size-10" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-textInformationColor">
                    Papelera
                  </p>
                  <span className="text-textColorGray text-sm">
                    Explora tu historial de eliminaciones para recuperar tus
                    libros y capítulos
                  </span>
                </div>
              </button>
            </li>

            <li className="hover:cursor-pointer rounded-lg hover:shadow-lg transition-all transform duration-300 hover:scale-105">
              <button
                onClick={() => router.push("/about/privacy_policy")}
                className="flex items-center gap-x-3  py-4 px-2  _lg:py-6 _lg:flex-col _lg:text-left _lg:items-start _lg:gap-y-4 _lg:px-4"
              >
                <div>
                  <MdPrivacyTip size={20} className="_lg:size-10" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-textInformationColor">
                    Politicas de Privacidad
                  </p>
                  <span className="text-textColorGray text-sm">
                    Mira nuestras politicas de Privacidad
                  </span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default page;
