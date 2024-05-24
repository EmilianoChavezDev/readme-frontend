import Image from "next/image";
const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/image/bookNotExist.png"
        alt="Error 404"
        width={300}
        height={300}
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Página no encontrada</h1>
      <p className="text-lg text-gray-700 mb-8">
        La página que estás buscando no existe.
      </p>

      <a href="/" className="text-blue-500 hover:underline">
        Volver a la página de inicio
      </a>
    </div>
  );
};

export default Error404;
