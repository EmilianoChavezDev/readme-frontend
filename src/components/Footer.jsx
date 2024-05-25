"use client";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { ignorePaths } from "@/utils/ignoreNavbarAndFooter";

const Footer = () => {
  const router = usePathname();
  const pathSegments = router.split("/");

  const shouldRenderFooter =
    !ignorePaths.some((path) => router.startsWith(path)) &&
    !(pathSegments[1] === "books" && pathSegments[3] === "chapters") &&
    !(pathSegments[1] === "books" && pathSegments[3] === "read");
  return (
    <div className="absolute bottom-0 left-0 w-full">
      {shouldRenderFooter && (
        <footer className="bg-[#E9ECEF] text-gray-800 py-3 dark:bg-dark-darkColorNavBar">
          <div className="container mx-auto">
            {/* Parte Superior */}
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-auto ">
                <p className="text-lg font-semibold mb-1">
                  readmeapp.social@gmail.com
                </p>
              </div>
              <div className="w-full md:w-auto md:border-l-2 md:border-gray-500 md:pl-7">
                <a
                  href="/about/privacy_policy"
                  className="hover:text-colorPrimario "
                >
                  Politica y Privacidad
                </a>
              </div>
              <div className="w-full md:w-auto md:border-l-2 md:border-gray-500 md:pl-7">
                <a
                  href="/about/terms_of_service"
                  className="hover:text-colorPrimario"
                >
                  Términos de servicio
                </a>
              </div>
              <div className="w-full md:w-auto md:border-l-2 md:border-gray-500 md:pl-7">
                <a
                  href="/about/tecnologies"
                  className="hover:text-colorPrimario"
                >
                  Tecnologías
                </a>
              </div>
              <div className="w-full md:w-auto md:border-l-2 md:border-gray-500 md:pl-7">
                <a href="/about/faq" className="hover:text-colorPrimario">
                  Preguntas Frecuentes
                </a>
              </div>
              <div className="w-full md:w-auto md:border-l-2 md:border-gray-500 md:pl-7">
                <a
                  href="/about/privacy_policy#seguridad-title"
                  className="hover:text-colorPrimario"
                >
                  Seguridad
                </a>
              </div>
              <div className="w-full md:w-auto md:border-l-2 md:border-gray-500 md:pl-7">
                <a href="/about/about_us" className="hover:text-colorPrimario">
                  Sobre Nosotros
                </a>
              </div>
            </div>

            {/* Parte Inferior */}
            <div className="bg-[#E9ECEF] text-center mt-3 flex flex-col md:flex-row justify-between items-center dark:bg-dark-darkColorNavBar">
              <p className="mb-2 md:mb-0">
                &copy; 2024 Readme. Todos los derechos reservados pertenecen a
                sus respectivos dueños.
              </p>
              <div className="flex items-center space-x-2 hover:text-colorPrimario ">
                <a
                  href="https://www.instagram.com/gonzacms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <FaInstagram className="w-6 h-6" />
                  <span className="ml-2">Readme</span>
                </a>
              </div>
              <div className="flex items-center space-x-2 hover:text-colorPrimario ">
                <a
                  href="https://x.com/Gonzq_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <RiTwitterXLine className="w-6 h-6 " />
                  <span className="ml-2">Readme</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Footer;
