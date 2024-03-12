import { AiOutlineSearch } from "react-icons/ai";

const InputSearch = () => {
  return (
    <div className="flex items-center flex-grow mr-96 ml-60 md:ml-16 md:justify-center md:mr-60">
      <input
        type="text"
        placeholder="Buscar Libros por ej.: Nombre, Autor..."
        className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500 w-full"
      />
      <button
        type="button"
        className="bg-transparent p-2 rounded-md hover:text-white"
      >
        <AiOutlineSearch size={24} />
      </button>
    </div>
  );
};

export default InputSearch;
