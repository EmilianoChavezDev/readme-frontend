import { AiOutlineSearch } from "react-icons/ai";

const InputSearch = () => {
  return (
    <div className="md:flex items-center lg:flex-grow lg:mr-72 lg:ml-24 md:justify-center md:ml-4  md:mr-8 md:w-96 lg:w-auto hidden">
      <input
        type="text"
        placeholder="Buscar Libros por ej.: Nombre, Autor..."
        className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full"
      />
      <button
        type="button"
        className="bg-transparent p-2 rounded-md hover:text-white hover:cursor-pointer hover:font-bold transition-all duration-300"
      >
        <AiOutlineSearch size={24} />
      </button>
    </div>
  );
};

export default InputSearch;
