const OptionsUpdate = ({
  handleUpdate,
  handleDelete,
  portada,
  fileInputPortadaKey,
}) => {
  return (
    <div
      className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg p-2 text-black w-52 overflow-y-auto max-h-60
sm:text-sm  sm:right-auto left-2 mt-1 dark:bg-dark-darkColorItems
"
    >
      <ul className="my-2 flex flex-col gap-y-4">
        <li
          className={`col-span-1 hover:font-semibold transform duration-100 transition-all hover:cursor-pointer`}
        >
          <label
            htmlFor="portada-input"
            className="cursor-pointer flex items-center"
          >
            <span className="text-nowrap flex ">
              {!portada
                ? "Subir foto de portada"
                : "Actualizar foto de portada"}
            </span>
            <input
              type="file"
              id="portada-input"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUpdate}
              key={fileInputPortadaKey}
            />
          </label>
        </li>
        {portada && (
          <li
            className={`col-span-1 flex hover:font-semibold hover:cursor-pointer transform duration-100 transition-all`}
            onClick={handleDelete}
          >
            <span>Eliminar foto de portada</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default OptionsUpdate;
