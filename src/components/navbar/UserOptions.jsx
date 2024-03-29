import { useEffect, useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useUserInfo from "@/hooks/useUser";
import { useUser } from "@/contexts/UserProvider";

const UserOptions = ({ username, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storageProfile, setStorageProfile] = useState(null);
  const { getUserInformation, data } = useUserInfo();
  const router = useRouter();
  const initials = username
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getUserInformation(username);
  }, []);

  useEffect(() => {
    if (data) {
      setStorageProfile(data?.profile);
    }
  }, [data]);

  return (
    <div
      className="flex items-center border-b border-transparent text-white
    _lg:hover:cursor-pointer
  "
    >
      {storageProfile ? (
        <Image
          src={storageProfile}
          alt="User"
          className="h-8 w-8 rounded-full mr-2"
          width={200}
          height={200}
        />
      ) : (
        <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2">
          {initials}
        </div>
      )}
      <div className="flex items-center gap-x-1">
        <p className="cursor-pointer _lg:text-sm text-lg">{username}</p>
        <button
          type="button"
          className={`_lg:flex items-center justify-center hidden 
          transition-all duration-200 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }
          `}
          onClick={toggleDropdown}
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
