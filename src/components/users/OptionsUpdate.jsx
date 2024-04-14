import React from "react";

const OptionsUpdate = ({ handleUpdate, handleDelete }) => {
  return (
    <div
      className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg p-2 text-black w-48 overflow-y-auto max-h-60
sm:text-sm  sm:right-auto left-3 mt-1

"
    >
      <ul className="my-2 flex flex-col gap-y-4">
        <li
          className={`col-span-1 hover:font-semibold hover:cursor-pointer
          `}
        >
          Subir foto de portada
        </li>
        <li
          className={`col-span-1 hover:font-semibold hover:cursor-pointer
          `}
        >
          Eliminar foto de portada
        </li>
      </ul>
    </div>
  );
};

export default OptionsUpdate;
