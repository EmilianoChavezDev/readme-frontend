import { useRouter } from "next/navigation";
import {
  FaHome,
  FaPen,
  FaHeart,
  FaCompass,
  FaUser,
  FaTimes,
  FaFileAlt,
} from "react-icons/fa";
import UserOptions from "./UserOptions";
import { useUser } from "@/contexts/UserProvider";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { username, logout } = useUser();
  const router = useRouter();

  const handleMenuClick = (route) => {
    router.push(route);
    setIsOpen(false);
  };

  return (
    <div
      className={`_lg:hidden fixed top-0 left-0 w-full h-full z-50 bg-colorPrimario transform ${
        isOpen ? "" : "-translate-x-full"
      } transition-transform duration-500 overflow-y-hidden`}
    >
      <div className="flex flex-col text-white gap-y-3 textsml mx-6 _md:mx-8 mt-16">
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/")}
        >
          <FaHome /> Inicio
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/books/create")}
        >
          <FaPen /> Escribir
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/favorites")}
        >
          <FaHeart /> Mis Favoritos
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/drafts")}
        >
          <FaFileAlt />
          Mis Borradores
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/page-construction")}
        >
          <FaCompass /> Explorar
        </button>
        <button
          className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105"
          onClick={() => handleMenuClick("/page-construction")}
        >
          <FaUser /> Mi cuenta
        </button>
      </div>

      <div className="absolute bottom-4 left-4">
        <UserOptions username={username} logout={logout} />
      </div>

      <button
        className="absolute top-4 right-4 text-white"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default MobileMenu;
