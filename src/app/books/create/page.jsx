"use client";
import Link from "next/link";
import RenderImage from "@/components/RenderImage";
import useBook from "@/hooks/useBook";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Libro() {
  const [info, setInfo] = useState({
    titulo: "",
    sinopsis: "",
    categoria: "",
    portada: "",
    adulto: false,
  });

  const [errors, setErrors] = useState({
    titulo: "",
    sinopsis: "",
    categoria: "",
  });

  const [loadingPortada, setLoadingPortada] = useState(false);

  //Destructuring de los valores del formulario
  const { titulo, sinopsis, categoria, portada, adulto } = info;

  //Obtener la funcion para agregar un libro, el error y el estado de carga
  const { createBook, error, isLoading } = useBook();

  const router = useRouter();

  //Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { id, value, files, checked } = e.target;

    // Si el input es el checkbox "adulto", obtener el estado checked, si es el input "portada" obtener el ,archivo si no obtener el valor del input
    const newValue =
      id === "adulto" ? checked : id === "portada" ? files[0] : value;

    // Actualizar el estado del formulario
    setInfo({
      ...info,
      [id]: newValue,
    });
  };

  //Manejar el envio del formulario
  const handleSubmit = async () => {
    const newErrors = {};

    // Validar que los campos no esten vacios
    if (titulo.trim() === "") {
      newErrors.titulo = "El título no puede estar vacio. ";
    }

    if (sinopsis.trim() === "") {
      newErrors.sinopsis = "La descripción no puede estar vacio. ";
    }

    if (categoria.trim() === "") {
      newErrors.categoria = "Debes seleccionar una categoría. ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Crear un FormData para enviar la informacion
    const formData = new FormData();
    formData.set("titulo", titulo);
    formData.set("sinopsis", sinopsis);
    formData.set("categoria", categoria);
    formData.set("portada", portada);
    formData.set("adulto", adulto);

    // Enviar la informacion, esperar a que la peticion termine
    const success = await createBook(formData);

    // Si la peticion fue exitosa, limpiar el formulario y quitar el error
    if (success) {
      setInfo({
        titulo: "",
        sinopsis: "",
        categoria: "",
        portada: "",
        adulto: false,
      });

      setErrors({
        titulo: "",
        sinopsis: "",
        categoria: "",
      });
      // Si la peticion fue exitosa, redirigir a books/id/chapters/write
      router.push(`/books/${success.id}/chapters/write`);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/*Layout*/}
      <div className="bg-ChaptearHeader h-20 flex flex-row justify-between items-center px-4 drop-shadow-lg">
        <div className="text-white font-semibold text-lg flex items-center">
          <Link href={"/"}>
            <FaAngleLeft className="text-2xl" />
          </Link>
          <h3 className="px-4">Agregar información del libro</h3>
        </div>
        <div className="flex gap-4">
          <Link
            href={"/"}
            className="bg-BooksCreateCancelarButton text-gray-700 py-2 px-5 rounded-lg"
          >
            Cancelar
          </Link>
          <button
            onClick={handleSubmit}
            className={`bg-BooksCreateSeguirButton text-white py-2 px-7 rounded-lg ${
              isLoading || loadingPortada ? "opacity-50 cursor-wait " : ""
            }`}
            disabled={isLoading || loadingPortada}
          >
            Seguir
          </button>
        </div>
      </div>

      {/*Error del formulario*/}
      <div className="text-center py-5">
        {error && (
          <p className="text-red-500 font-semibold text-xl">
            Hubo un error al enviar el formulario. Recargue la página o
            inténtelo de nuevo.
          </p>
        )}
      </div>

      {/* Portada */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/4 h-auto flex flex-col items-center justify-center p-8 bg-BooksCreateImageBackground">
          <label className="text-center mb-6">
            <RenderImage
              inputContainerRef={portada}
              setLoadingPortada={setLoadingPortada}
            />
            <label
              htmlFor="portada"
              className="block text-lg font-semibold mb-2 text-gray-900 my-11"
            >
              {!portada ? "Añadir una portada" : "Cambiar portada"}
            </label>
            <input
              id="portada"
              type="file"
              accept="image/*"
              key={portada ? portada.name : "reset"} //Resetamos el input por si se ingresan dos veces la misma imagen
              onChange={handleInputChange}
              className="text-gray-900 sr-only"
              disabled={isLoading}
            />
          </label>
        </div>

        {/* Formulario */}
        <div className="w-full md:w-4/6 bg-white mx-4 md:mx-16 my-4 md:my-14">
          <div className="w-full p-8 flex flex-col gap-3">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 mx-6">
              Detalle del libro
            </h1>
            <div className="mb-2 w-full px-6 md:px-16">
              <label
                htmlFor="titulo"
                className="block text-2xl font-semibold mb-2 text-gray-900"
              >
                Título
              </label>
              <input
                id="titulo"
                type="text"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                value={titulo}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {errors.titulo && (
                <p className="text-red-500 font-semibold py-2">
                  {errors.titulo}
                </p>
              )}
            </div>

            <div className="mb-2 w-full px-6 md:px-16">
              <label
                htmlFor="sinopsis"
                className="block text-2xl font-semibold py-2 text-gray-900"
              >
                Descripción
              </label>

              <textarea
                id="sinopsis"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-gray-900 h-44 "
                value={sinopsis}
                onChange={handleInputChange}
                disabled={isLoading}
              ></textarea>
              {errors.sinopsis && (
                <p className="text-red-500 font-semibold">{errors.sinopsis}</p>
              )}
            </div>

            <div className="mb-2 w-full flex items-center gap-3 px-6 md:px-16">
              <label
                htmlFor="categoria"
                className="block font-semibold py-2 text-gray-900 pt-2 text-2xl"
              >
                Categoría
              </label>
              <select
                id="categoria"
                className="border p-2 rounded focus:outline-none text-gray-500 font-semibold "
                value={categoria}
                onChange={handleInputChange}
                disabled={isLoading}
              >
                <option value="" disabled>
                  Selecciona una categoria
                </option>
                <option value="Ficcion">Ficcion</option>
                <option value="Fantasia">Fantasia</option>
              </select>
              {errors.categoria && (
                <p className="text-red-500 font-semibold">{errors.categoria}</p>
              )}
            </div>

            <div className="mb-2 w-full flex items-center gap-3 px-6 md:px-16">
              <label
                htmlFor="adulto"
                className="text-2xl font-semibold text-gray-900 "
              >
                ¿Es para adultos?
              </label>
              <input
                id="adulto"
                type="checkbox"
                checked={adulto}
                className="leading-tight transform scale-150"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
