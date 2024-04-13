import React, { useCallback, useEffect, useState } from "react";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { Button } from "@material-tailwind/react";
import { usePathname, useSearchParams } from "next/navigation";

const UserOption = ({ isFollow, selectedOption, onSelectOption, username }) => {
  const [usernameLs, setUsernameLs] = useState(null);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const path = usePathname();

  useEffect(() => {
    setUsernameLs(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    if (!searchParams) return;
    setSearch(searchParams.get("user"));
  }, [searchParams]);

  return (
    <>
      <div>
        <div className="flex _sm:justify-between justify-center items-center _sm:w-5/6 mx-auto pt-3">
          <div className="flex _sm:text-xl text-sm text-nowrap gap-x-4 font-semibold">
            <span
              className={`hover:cursor-pointer transition-all transform duration-200 border-b-2 hover:border-colorPrimario 
              ${
                selectedOption === "misLibros"
                  ? "border-colorPrimario"
                  : "border-transparent"
              }`}
              onClick={() => onSelectOption("misLibros")}
            >
              Mis libros
            </span>
            <span
              className={`hover:cursor-pointer transition-all transform duration-200 border-b-2 hover:border-colorPrimario
              ${
                selectedOption === "listaLectura"
                  ? "border-colorPrimario"
                  : "border-transparent"
              }`}
              onClick={() => onSelectOption("listaLectura")}
            >
              Lista de lectura
            </span>
            {usernameLs === username && (
              <span
                className={`hover:cursor-pointer transition-all transform duration-200 border-b-2 pb-2 hover:border-colorPrimario
                ${
                  selectedOption === "seguidos"
                    ? "border-colorPrimario"
                    : "border-transparent"
                }`}
                onClick={() => onSelectOption("seguidos")}
              >
                Seguidos
              </span>
            )}
            <span
              className={`hover:cursor-pointer transition-all transform duration-200 border-b-2 pb-2 hover:border-colorPrimario
              ${
                selectedOption === "seguidores"
                  ? "border-colorPrimario"
                  : "border-transparent"
              }`}
              onClick={() => onSelectOption("seguidores")}
            >
              Seguidores
            </span>
          </div>
          {usernameLs !== username && (
            <div className="hover:cursor-pointer pb-2 text-xl hidden _sm:block">
              {isFollow ? (
                <Button className="px-2 py-2 flex text-colorPrimario border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white">
                  <span className="flex items-center">
                    <SlUserUnfollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                    Dejar de seguir
                  </span>
                </Button>
              ) : (
                <Button className="px-2 py-2 flex text-colorPrimario border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white">
                  <span className="flex items-center">
                    <SlUserFollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                    Seguir
                  </span>
                </Button>
              )}
            </div>
          )}
        </div>
        {/*linea */}
        <div className=" border-b-2 border-BooksCreateImageBackground"></div>
      </div>
    </>
  );
};

export default UserOption;
