"use client";

import { UseRead } from "@/contexts/ReadProvider";
import { useEffect, useState } from "react";

const CapMenu = ({ capitulo }) => {
  const { getCurrentChapterById } = UseRead();
  const [capMapp, setCapMap] = useState(capitulo);

  return (
    <div
      className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg p-2 top-full text-black w-60 overflow-y-auto max-h-60
  md:text-sm sm:text-xs 
  
  "
    >
      <ul className="my-2 flex flex-col gap-y-4">
        {capMapp?.map((capitulo, index) => (
          <li
            key={capitulo?.id}
            onClick={() =>
              getCurrentChapterById(capitulo?.libro_id, capitulo?.id, false)
            }
            className={`col-span-1 hover:font-semibold hover:cursor-pointer ${
              index === capMapp.length - 1 ? "" : "border-b-2 pb-2"
            }`}
          >
            {capitulo?.titulo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CapMenu;
