"use client";
import RenderImage from "@/app/components/RenderImage";
import useLibro from "@/hooks/useLibro";
import { useState } from "react";

export default function Libro() {
  const [info, setInfo] = useState({
    titulo: "",
    sinopsis: "",
    categoria: "",
    portada: "",
    adulto: false,
  });

  //Destructuring de los valores del formulario
  const { titulo, sinopsis, categoria, portada, adulto } = info;

  const [errors, setErrors] = useState({
    titulo: "",
    sinopsis: "",
    categoria: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { agregarLibro } = useLibro();

  //Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { id, value, files, checked } = e.target;

    // Si el input es el checkbox "adulto", obtener el estado checked, si es el input "portada" obtener el ,archivo si no obtener el valor del input
    const newValue =
      id === "adulto" ? checked : id === "portada" ? files[0] : value;

    setInfo({
      ...info,
      [id]: newValue,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const newErrors = {};

    // Validar que los campos no esten vacios
    if (titulo.trim() === "") {
      newErrors.titulo = "El titulo no puede estar vacio. ";
    }

    if (sinopsis.trim() === "") {
      newErrors.sinopsis = "La sinopsis no puede estar vacio. ";
    }

    if (categoria.trim() === "") {
      newErrors.categoria = "Debes seleccionar una categoría. ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Crear un FormData para enviar la informacion
    const formData = new FormData();
    formData.set("titulo", titulo);
    formData.set("sinopsis", sinopsis);
    formData.set("categoria", categoria);
    formData.set("portada", portada);
    formData.set("adulto", adulto);

    // Enviar la informacion
    const success = await agregarLibro(formData);

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
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Layout */}
      <div className="bg-[#7eafaf] h-20 flex flex-row justify-between items-center px-4 drop-shadow-lg">
        <div className="text-white font-semibold text-lg">
          <h3 className="px-20">Agregar información del libro</h3>
        </div>
        <div className="flex gap-4 px-8">
          <button className="bg-[#738d90] text-gray-700 py-2 px-5 rounded-lg">
            Cancelar
          </button>
          <button className="bg-[#167574] text-white py-2 px-7 rounded-lg">
            Seguir
          </button>
        </div>
      </div>

      {/* Portada */}
      <div className="container mx-auto flex flex-row items-center justify-center">
        <div className="w-1/4 h-auto flex flex-col items-center justify-center p-8 bg-[#eeeeee]">
          <label className="text-center mb-6">
            <RenderImage inputContainerRef={portada} className="" />
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
              onChange={handleInputChange}
              className="text-gray-900 sr-only"
            />
          </label>
        </div>

        {/* Formulario */}
        <div className="w-4/6 bg-white mx-16 my-14">
          <div className="w-full p-8 flex flex-col gap-3">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 mx-6">
              Detalle del libro
            </h1>
            <div className="mb-2 w-full px-16">
              <label
                htmlFor="titulo"
                className="block text-2xl font-semibold mb-2 text-gray-900"
              >
                Titulo
              </label>
              <input
                id="titulo"
                type="text"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                value={titulo}
                onChange={handleInputChange}
              />
              {errors.titulo && (
                <p className="text-red-500 font-semibold py-2">
                  {errors.titulo}
                </p>
              )}
            </div>

            <div className="mb-2 w-full px-16">
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
              ></textarea>
              {errors.sinopsis && (
                <p className="text-red-500 font-semibold">{errors.sinopsis}</p>
              )}
            </div>

            <div className="mb-2 w-full flex items-center gap-3 px-16">
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
              >
                <option value="" disabled={true}>
                  Selecciona una categoria
                </option>
                <option value="Ficcion">Ficcion</option>
                <option value="Fantasia">Fantasia</option>
              </select>
              {errors.categoria && (
                <p className="text-red-500 font-semibold">{errors.categoria}</p>
              )}
            </div>

            <div className="mb-2 w-full flex items-center gap-3 px-16">
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

            <div className="flex items-center flex-col gap-3">
              <button
                onClick={handleSubmit}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                  isLoading ? "opacity-50 cursor-wait " : ""
                }`}
                disabled={isLoading}
              >
                Agregar Libro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
