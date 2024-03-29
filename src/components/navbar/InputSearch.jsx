import { AiOutlineSearch } from "react-icons/ai";
import { Tooltip } from "@material-tailwind/react";

const InputSearch = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex items-center _lg:flex-grow _xl:mr-64 _lg:mr-16 _xl:ml-16 _lg:ml-5 justify-center _md:w-96 w-80 py-2 _lg:py-0">
      <input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyPress} // Agregar este evento
        type="text"
        placeholder="Buscar Libros por ej.: Nombre, Autor..."
        className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full"
      />
      <Tooltip content="buscar">
        <button
          type="button"
          onClick={onSearch} // Mantener la funcionalidad de hacer clic en el botón
          className="bg-transparent p-2 rounded-md _lg:text-black _lg:hover:text-white text-white hover:cursor-pointer hover:font-bold transition-all duration-300 hover:scale-110"
        >
          <AiOutlineSearch size={24} />
        </button>
      </Tooltip>
    </div >
  );
};

export default InputSearch;
