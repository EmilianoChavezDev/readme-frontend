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
    <div>
      {shouldRenderFooter && (
        <footer className="bg-[#E9ECEF] text-gray-800 py-6">
          <div className="container mx-auto">
            {/* Parte Superior */}
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-auto ">
                <p className="text-lg font-semibold mb-1">
                  readmeapp@gmail.com
                </p>
              </div>
              <div className="w-full md:w-auto">
                <a href="/about-us" className="hover:underline">
                  About us
                </a>
              </div>
              <div className="w-full md:w-auto">
                <a href="/terminos-y-condiciones" className="hover:underline">
                  Términos y Condiciones
                </a>
              </div>
              <div className="w-full md:w-auto">
                <a href="/terminos-de-servicio" className="hover:underline">
                  Términos de servicio
                </a>
              </div>
              <div className="w-full md:w-auto">
                <a href="/tecnologias" className="hover:underline">
                  Tecnologías
                </a>
              </div>
              <div className="w-full md:w-auto">
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </div>
              <div className="w-full md:w-auto ">
                <a href="/seguridad" className="hover:underline">
                  Seguridad
                </a>
              </div>
            </div>

            {/* Parte Inferior */}
            <div className="bg-[#E9ECEF] text-center py-3 mt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="mb-2 md:mb-0">
                &copy; 2024 Readme. Todos los derechos reservados pertenecen a
                sus respectivos dueños.
              </p>
              <div className="flex items-center space-x-2">
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
              <div className="flex items-center space-x-2">
                <a
                  href="https://x.com/Gonzq_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <RiTwitterXLine className="w-6 h-6" />
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
