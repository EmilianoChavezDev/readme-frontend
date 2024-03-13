import React from "react";

const CapMenu = () => {
  return (
    <div
      className="absolute z-10 bg-white border border-gray-200 shadow-lg p-2 top-full text-black w-60 overflow-y-auto max-h-60
  md:text-sm sm:text-xs 
  
  "
    >
      <ul className="my-2 flex flex-col gap-y-4">
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 1
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 2
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 3
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 4
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 5
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 6
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 7
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 8
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 9
        </li>
        <li className="col-span-1 hover:font-semibold hover:cursor-pointer">
          Capitulo 10
        </li>
      </ul>
    </div>
  );
};

export default CapMenu;
