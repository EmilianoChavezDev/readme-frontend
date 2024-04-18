"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdRemoveModerator } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import useUserInfo from "@/hooks/useUser";
import ProfileView from "@/components/common/ProfileView";

export default function UserOptions({ username, logout }) {
  const router = useRouter();
  const { getUserInformation, data } = useUserInfo();

  const [userRole, setUserRole] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [storageProfile, setStorageProfile] = useState(null);

  const navigateTo = (path) => {
    router.push(path);
    setShowPopover(false);
  };

  const handleLogout = () => {
    logout();
    setShowPopover(false);
  };

  useEffect(() => {
    if (username) getUserInformation(username);
  }, [username]);

  useEffect(() => {
    if (data) {
      setStorageProfile(data?.profile || localStorage.getItem("profile"));
      setUserRole(data?.role || localStorage.getItem("role"));
    }
  }, [data]);

  return (
    <div className="flex items-center">
      <Popover
        open={showPopover}
        handler={setShowPopover}
        placement="bottom-end"
      >
        <PopoverHandler>
          <button className="group flex items-center gap-2">
            <ProfileView username={username} imagen={storageProfile} size={8} />
            <span className="cursor-pointer text-white _lg:text-sm text-lg">
              {username}
            </span>
            <span
              className={`text-white transition-all duration-200 transform ${
                showPopover ? "rotate-180" : "rotate-0"
              }`}
            >
              <IoMdArrowDropdown />
            </span>
          </button>
        </PopoverHandler>
        <PopoverContent className="z-60 w-48">
          <ul className="flex flex-col gap-2 text-gray-800 text-md gap-y-2">
            <li
              className="flex pb-2 border-b gap-2 items-center cursor-pointer transform transition-all hover:scale-105 hover:text-black"
              onClick={() => navigateTo(`/user/${username}`)}
            >
              <FaUser />
              <span>Mi Perfil</span>
            </li>
            <li
              className="flex pb-2 border-b gap-2 items-center cursor-pointer transform transition-all hover:scale-105 hover:text-black"
              onClick={() => navigateTo(`/accounts`)}
            >
              <FaUserCircle />
              <span>Mi Cuenta</span>
            </li>
            {userRole === "moderador" && (
              <li
                className="flex pb-2 border-b gap-2 items-center cursor-pointer transform transition-all hover:scale-105 hover:text-black"
                onClick={() => navigateTo(`/moderator/report_tray`)}
              >
                <MdRemoveModerator />
                <span className="text-nowrap">Panel del Moderador</span>
              </li>
            )}
            <li
              className="flex gap-2 items-center cursor-pointer transform transition-all hover:scale-105 hover:text-black"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span>Cerrar Sesión</span>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
