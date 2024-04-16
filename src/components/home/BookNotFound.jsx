const BookNotFound = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <h1 className="text-2xl _md:text-xll font-bold mb-4 text-center">
        {message}
      </h1>
      <img
        src="/image/categoryNotFound.png"
        alt="Category Not Found"
        className="mb-8 w-48 md:w-64 lg:w-72 xl:w-96"
      />
    </div>
  );
};

export default BookNotFound;
