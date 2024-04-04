import { useEffect, useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUser";
import ProfileView from "../common/ProfileView";

const UserOptions = ({ username, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storageProfile, setStorageProfile] = useState(null);
  const { getUserInformation, data, currentData } = useUserInfo();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!username) return;
    getUserInformation(username);
  }, [username]);

  useEffect(() => {
    if (data) {
      setStorageProfile(data?.profile || localStorage.getItem("profile"));
    }
  }, [data]);

  useEffect(() => {
    if (currentData) {
      setStorageProfile(currentData?.profile);
    }
  }, [currentData]);

  return (
    <div
      className="flex items-center border-b border-transparent text-white
    _lg:hover:cursor-pointer
  "
    >
      <div className="mr-1">
        <ProfileView username={username} imagen={storageProfile} size={8} />
      </div>
      <div className="flex items-center gap-x-1" onClick={toggleDropdown}>
        <span className="cursor-pointer _lg:text-sm text-lg">{username}</span>
        <button
          type="button"
          className={`_lg:flex items-center justify-center hidden 
            transition-all duration-200 transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }
            `}
        >
          <IoMdArrowDropdown size={18} />
        </button>
        <div className="ml-4 items-center _lg:hidden transform transition-all hover:scale-110 duration-200">
          <Tooltip content="Cerrar sesion">
            <button>
              <FaSignOutAlt size={25} onClick={() => logout()} />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="relative">
        {isOpen && (
          <div className="_lg:absolute z-10 bg-white border border-gray-200 shadow-lg p-2 mt-2 -right-2 top-7 text-black w-40 ">
            <ul className="my-2">
              <li
                className="mb-4  border-b border-gray-200 pb-2 hover:cursor-pointer hover:font-bold transition-all duration-300"
                onClick={() => router.push(`/user/${username}`)}
              >
                <FaUser className="inline-block mr-2" />
                Mi Perfil
              </li>

              <li
                className="mb-4  border-b border-gray-200 pb-2 hover:cursor-pointer hover:font-bold transition-all duration-300"
                onClick={() => router.push(`/accounts`)}
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
