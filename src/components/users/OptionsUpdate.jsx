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
          <label htmlFor="profile-input" className="cursor-pointer">
            <div className="inline-block">Subir foto de portada</div>
            <input
              type="file"
              id="profile-input"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUpdate}
            />
          </label>
        </li>
        <li
          className={`col-span-1 hover:font-semibold hover:cursor-pointer
          `}
          onClick={handleDelete}
        >
          Eliminar foto de portada
        </li>
      </ul>
    </div>
  );
};

export default OptionsUpdate;
