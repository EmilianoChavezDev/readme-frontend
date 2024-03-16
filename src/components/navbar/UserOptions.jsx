import { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const UserOptions = ({ username, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:flex items-center border-b border-transparent text-white hidden">
      <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2">
        {initials}
      </div>
      <div className="relative">
        <div className="flex items-center gap-1">
          <p className="cursor-pointer text-sm">{username}</p>
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={toggleDropdown}
          >
            <IoMdArrowDropdown size={18} />
          </button>
        </div>
        {isOpen && (
          <div className="absolute z-10 bg-white border border-gray-200 shadow-lg p-2 mt-2 -right-2 top-full text-black w-40">
            <ul className="my-2">
              <li
                className="mb-4  border-b border-gray-200 pb-2 hover:cursor-pointer hover:font-bold transition-all duration-300"
                onClick={() => handlNoPageClick()}
              >
                <FaUserCircle className="inline-block mr-2" />
                Mi cuenta
              </li>

              <li
                className="hover:cursor-pointer hover:font-bold transition-all duration-300"
                onClick={() => logout()}
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Cerrar sesión
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOptions;
