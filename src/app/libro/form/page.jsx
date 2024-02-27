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

    // Validar que los campos no esten vacios y cumplir con las longitudes minimas
    if (titulo.trim() === "" || titulo.length < 5) {
      newErrors.titulo = "El titulo tiene que ser de al menos 5 caracteres. ";
    }

    if (sinopsis.trim() === "" || sinopsis.length < 20) {
      newErrors.sinopsis =
        "La sinopsis tiene que ser de al menos 20 caracteres. ";
    }

    if (categoria.trim() === "") {
      newErrors.categoria = "Debes seleccionar una categoría. ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Crear un FormData para enviar la información
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
    <div className="flex flex-col h-screen-3/4 bg-white ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center h-full">
        <div className="md:w-1/4 flex flex-col items-center justify-center p-8 bg-gray-200">
          <RenderImage inputContainerRef={portada} className="" />
          <div className="text-center mb-6">
            <label
              htmlFor="portada"
              className="block text-lg font-semibold mb-2 text-gray-900"
            >
              Seleccionar Portada
            </label>
            <input
              id="portada"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="text-gray-900"
            />
          </div>
        </div>
        <div className="md:w-8/12 bg-white p-10">
          <div className="w-full bg-white p-8 flex flex-col gap-3">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">
              Detalle del libro
            </h1>
            <div className="mb-6 w-full px-10">
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

            <div className="mb-6 w-full px-10">
              <label
                htmlFor="sinopsis"
                className="block text-2xl font-semibold mb-2 text-gray-900"
              >
                Descripción
              </label>
              <textarea
                id="sinopsis"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-gray-900 h-52 "
                value={sinopsis}
                onChange={handleInputChange}
              ></textarea>
              {errors.sinopsis && (
                <p className="text-red-500 font-semibold">{errors.sinopsis}</p>
              )}
            </div>

            <div className="mb-6 w-full flex items-center gap-3 px-10">
              <label
                htmlFor="categoria"
                className="block font-semibold mb-2 text-gray-900 pt-2 text-2xl"
              >
                Categoría
              </label>
              <select
                id="categoria"
                className="w-full border p-2 rounded focus:outline-none text-gray-900 font-semibold"
                value={categoria}
                onChange={handleInputChange}
              >
                <option value="" disabled={true}>
                  Selecciona una categoria
                </option>
                <option value="categoria1">Ficcion</option>
                <option value="categoria2">Fantasia</option>
              </select>
              {errors.categoria && (
                <p className="text-red-500 font-semibold">{errors.categoria}</p>
              )}
            </div>

            <div className="mb-6 w-full flex items-center gap-3 px-10">
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
