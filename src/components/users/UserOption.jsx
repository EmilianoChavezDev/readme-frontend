import React from "react";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { Button } from "@material-tailwind/react";
const UserOption = ({ isOwner, isFollow }) => {
  return (
    <>
      <div>
        <div className="flex _sm:justify-between justify-center items-center _sm:w-5/6 mx-auto pt-3">
          <div className="flex _sm:text-xl text-sm text-nowrap gap-x-4 font-semibold">
            <span className="hover:cursor-pointer  transition-all transform duration-200 border-b-2 border-transparent hover:border-colorPrimario">
              Mis libros
            </span>
            <span className="hover:cursor-pointer transition-all transform duration-200 border-b-2 border-transparent hover:border-colorPrimario">
              Lista de lectura
            </span>
            {!isOwner && (
              <span className="hover:cursor-pointer transition-all transform duration-200 border-b-2 border-transparent pb-2 hover:border-colorPrimario">
                Seguidos
              </span>
            )}
            <span className="hover:cursor-pointer transition-all transform duration-200 border-b-2 border-transparent pb-2 hover:border-colorPrimario">
              Seguidores
            </span>
          </div>
          {!isOwner && (
            <div className="hover:cursor-pointer pb-2 text-xl hidden _sm:block">
              {isFollow ? (
                <Button
                  className="px-2 py-2
                flex text-colorPrimario border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white"
                >
                  <span className="flex items-center">
                    <SlUserUnfollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                    Dejar de seguir
                  </span>
                </Button>
              ) : (
                <Button
                  className="px-2 py-2
                        flex text-colorPrimario border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white"
                >
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
