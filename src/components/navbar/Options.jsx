"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlusCircle, FaListUl } from "react-icons/fa";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

const Options = ({ categories = () => {} }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showPopoverExplorar, setShowPopoverExplorar] = useState(false);

  const router = useRouter();

  const handleSearchByCategory = (category) => {
    const newRoute =
      "/search?category=" + category[0] + "&categoryTagName=" + category[1];
    window.location.replace(newRoute);
  };

  const navigateTo = (path) => {
    router.push(path);
    setShowPopover(false);
    setShowPopoverExplorar(false);
  };

  return (
    <div
      className="_md:flex text-buttonColorGray _md:items-center _md:gap-2
       _md:justify-center 
  "
    >
      <div
        className="_md:flex _md:items-center cursor-pointer hidden _lg:w-20 _lg:mr-2
        transition-all duration-100 hover:scale-105
        hover:cursor-pointer
        "
        onClick={() => navigateTo("/")}
      >
        <Image
          width={0}
          height={0}
          alt="logo"
          src={"/image/g3.png"}
          sizes="100vw"
          style={{ width: "100px", height: "20px" }}
        />
      </div>
      {/**Comienzo del padre */}
      <div className="_md:flex _lg:gap-3 _xl:text-sm _lg:text-xs _lg:text-nowrap hidden _lg:items-center  ">
        <div>
          <Popover
            open={showPopoverExplorar}
            handler={setShowPopoverExplorar}
            placement="bottom-end"
          >
            <PopoverHandler>
              <button
                className="group flex items-center  
             transition-all duration-100 hover:scale-105
             hover:cursor-pointer
             hover:text-white "
              >
                <span className="cursor-pointer  _lg:text-sm text-lg">
                  Explorar
                </span>
                <span
                  className={`text-white transition-all duration-200 transform  ${
                    showPopoverExplorar ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <IoMdArrowDropdown />
                </span>
              </button>
            </PopoverHandler>

            <PopoverContent
              className="z-60 w-96 text-gray-800 text-md dark:text-white dark:bg-dark-darkColorItems  
            "
            >
              <ul className="text-nowrap _lg:my-2 _lg:gap-4 lg:gap-x-4 _lg:grid _lg:grid-cols-3 col-span-1">
                {categories?.map((category, i) => (
                  <li
                    onClick={() => handleSearchByCategory(category)}
                    key={i}
                    className="hover:cursor-pointer hover:font-bold transition-all duration-300  dark:hover:text-blue-gray-200"
                  >
                    {category[1]}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <span
            className="_lg:flex _lg:items-center
             transition-all duration-100 hover:scale-105
             hover:cursor-pointer
             hover:text-white
        "
            onClick={() => navigateTo("/favorites")}
          >
            Mis Favoritos
          </span>
        </div>

        <div className="flex items-center">
          <Popover open={showPopover} handler={setShowPopover}>
            <PopoverHandler>
              <button
                className="group flex items-center  
             transition-all duration-100 hover:scale-105
             hover:cursor-pointer
             hover:text-white"
              >
                <span className="cursor-pointer _lg:text-sm text-lg">
                  Escribe
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

            <PopoverContent className="z-60 w-52 buttom-3 text-gray-800 text-md dark:bg-dark-darkColorItems">
              <ul className="my-2">
                <li
                  className=" mb-4 pb-2 border-b border-gray-200 items-center cursor-pointer transform transition-all hover:scale-105 hover:text-black dark:text-white dark:hover:text-blue-gray-200"
                  onClick={() => navigateTo("/books/create")}
                >
                  <FaPlusCircle className="inline-block mr-2" />
                  Crear nuevo libro
                </li>
                <li
                  className=" mb-2 items-center cursor-pointer transform transition-all hover:scale-105 hover:text-black dark:text-white dark:hover:text-blue-gray-200"
                  onClick={() => navigateTo("/books/mybooks")}
                >
                  <FaListUl className="inline-block mr-2" />
                  Mis libros
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Options;
