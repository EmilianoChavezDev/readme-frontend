const BookNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <img
        src="/image/bookNotFound.png"
        alt="Book Not Found"
        className="mb-8 w-48 md:w-64 lg:w-72 xl:w-96"
      />
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-center">
        Lo sentimos, no encontramos lo que buscabas
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-4 text-center">
        El libro que buscas no está disponible en nuestra biblioteca.
      </p>
      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-4 text-center">
        Puedes intentar buscar otro libro o volver a la página principal.
      </p>
    </div>
  );
};

export default BookNotFound;
