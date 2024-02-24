"use client";
import RenderImage from "@/app/components/RenderImage";
import { useState } from "react";
import axios from "axios";

export default function Libro() {
  //Estados del formulario
  const [info, setInfo] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    portada: null,
  });

  const [error, setError] = useState(false);

  //Destruccion de los valores del formulario
  const { titulo, descripcion, categoria, portada } = info;

  //Manejar cambios en el formulario
  const handleInputChange = (e) => {
    console.log(e.target.value);
    // Obtener el id, value y files del input
    const { id, value, files } = e.target;

    // Si el id del input es portada, se obtiene el archivo, de lo contrario, se obtiene el valor
    const newValue = id === "portada" ? files[0] : value;

    setInfo({
      ...info,
      [id]: newValue,
    });
  };

  //Manejar el envio del formulario
  const handleSubmit = async () => {
    const data = { titulo, descripcion, categoria, portada };

    if (!titulo || !descripcion || !categoria) {
      setError(true);
      return;
    }

    // Crear un FormData para enviar la información
    const formData = new FormData();
    formData.set("titulo", titulo);
    formData.set("descripcion", descripcion);
    formData.set("categoria", categoria);
    formData.set("portada", portada);

    // Convertir FormData a objeto
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Mostrar el objeto antes de mandarlo
    console.log(formDataObject);

    //Test - Generar token para mandar imagen
    //Hacemos una peticion al servidor
    const res = axios.post(`${process.env.API_URL}/libros`, formData, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoibW9kZXJhZG9yIiwiZXhwIjoxNzA4ODExNDY3fQ.F_8xIVYBt6M1D8GBrkFMf7neUuWdUpvJbjYTxL-3LIM",
      },
    });

    setInfo({
      titulo: "",
      descripcion: "",
      categoria: "",
      portada: null,
    });

    setError(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center h-full">
        <div className="md:w-1/2 flex flex-col items-center justify-center p-8">
          <RenderImage inputContainerRef={portada} />
          <div className="text-center mb-6">
            <label
              htmlFor="portada"
              className="block text-lg font-semibold mb-2 text-gray-900"
            >
              Seleccionar Imagen
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
        <div className="md:w-1/2 bg-white p-10">
          <div className="w-full bg-white p-8 flex flex-col items-center gap-3">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">
              Detalle del libro
            </h1>
            <div className="mb-6 w-full">
              <label
                htmlFor="titulo"
                className="block text-lg font-semibold mb-2 text-gray-900"
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
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="descripcion"
                className="block text-lg font-semibold mb-2 text-gray-900"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-gray-900"
                value={descripcion}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="categoria"
                className="block text-lg font-semibold mb-2 text-gray-900"
              >
                Categoría
              </label>
              <select
                id="categoria"
                className="w-full border p-2 rounded focus:outline-none text-gray-900"
                value={categoria}
                onChange={handleInputChange}
              >
                <option value="" disabled={true}>
                  Selecciona una categoria
                </option>
                <option value="categoria1">Categoria 1</option>
                <option value="categoria2">Categoria 2</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar Libro
            </button>
            <p className="text-[17px] text-red-500 font-bold">
              {error && "Todos los campos son obligatorios"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
