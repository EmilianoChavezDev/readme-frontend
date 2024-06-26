"use client";

import Link from "next/link";
import { FaImage } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import { Tooltip } from "@material-tailwind/react";

import useBook from "@/hooks/useBook";
import useCategory from "@/hooks/useCategory";

const BookForm = ({ book }) => {
  const router = useRouter();
  const { createBook, updateBook, error, isLoading } = useBook();
  const { data: categories, fetchCategories } = useCategory();

  const [image, setImage] = useState({});
  const [loadingPortada] = useState(false);
  const [errors, setErrors] = useState({
    titulo: "",
    sinopsis: "",
    categoria: "",
  });
  const [info, setInfo] = useState({
    titulo: "",
    sinopsis: "",
    categoria: "",
    portada: "",
    adulto: false,
  });

  const { titulo, sinopsis, categoria, adulto } = info;

  const formatCategories = () => {
    if (!categories) return [];
    return categories.map((category) => ({
      value: category[0],
      label: category[1],
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const { id, value, checked } = event.target;
    const newValue = id === "adulto" ? checked : value;
    setInfo({ ...info, [id]: newValue });
  };

  const handleAddImage = async (file) => {
    const resizedImage = await resizeImage(file);
    setImage({
      current: "",
      preview: URL.createObjectURL(resizedImage),
      file: resizedImage,
    });
  };
  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let newWidth, newHeight;

        if (img.width / img.height > 2 / 3) {
          newHeight = img.height;
          newWidth = (newHeight * 2) / 3;
        } else {
          newWidth = img.width;
          newHeight = (newWidth * 3) / 2;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
          },
          file.type,
          1
        );
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleRemoveImage = async () => {
    setImage({});
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!titulo.trim().length) {
      newErrors.titulo = "El titulo no puede estar vacio. ";
    }
    if (!sinopsis.trim().length) {
      newErrors.sinopsis = "La descripción no puede estar vacio. ";
    }
    if (!categoria.trim().length) {
      newErrors.categoria = "Debes seleccionar una categoría. ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = new FormData();
    formData.set("titulo", titulo);
    formData.set("sinopsis", sinopsis);
    formData.set("categoria", categoria);
    if (image.preview !== image.current && image.file) {
      formData.set("portada", image.file);
    }
    formData.set("adulto", adulto);

    const success = book
      ? await updateBook(book.id, formData)
      : await createBook(formData);
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
      book
        ? router.push(`/books/${book.id}`)
        : router.push(`/books/${success.id}/chapters/write`);
    }
  };

  useEffect(() => {
    if (book) {
      setInfo({
        ...info,
        titulo: book.titulo,
        sinopsis: book.sinopsis,
        categoria: book.categoria,
        adulto: book.adulto,
      });
      setImage({ current: book.portada });
    }
  }, [book]);

  return (
    <div className="flex flex-col h-screen ">
      <div className="bg-ChaptearHeader h-20 flex flex-row justify-between items-center px-4 drop-shadow-lg dark:bg-dark-darkColorNavBar _sm:py-5">
        <div className="text-white font-semibold text-lg flex items-center">
          <Link href="/">
            <FaAngleLeft className="text-2xl" />
          </Link>
          <h3 className="px-4">Agregar información del libro</h3>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-BooksCreateCancelarButton text-gray-700 py-2 px-5 rounded-lg dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
          >
            Cancelar
          </Link>
          <button
            onClick={handleSubmit}
            className={`bg-colorPrimario hover:bg-colorHoverPrimario text-white py-2 px-7 rounded-lg ${
              isLoading || loadingPortada ? "opacity-50 cursor-wait " : ""
            }`}
            disabled={isLoading || loadingPortada}
          >
            {book ? "Actualizar" : "Seguir"}
          </button>
        </div>
      </div>

      <div className="text-center py-5">
        {error && (
          <p className="text-red-500 font-semibold text-xl">
            Hubo un error al enviar el formulario. Recargue la página o
            inténtelo de nuevo.
          </p>
        )}
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        <form encType="multipart/form-data" className="group relative">
          {image.current || image.preview ? (
            <img
              className="object-cover  w-72 aspect-portada rounded-md"
              src={image.preview ?? image.current}
              alt="Portada de Libro"
            />
          ) : (
            <label className="bg-ChaptearHeader text-BooksCreateImageBackground w-72 aspect-portada flex justify-center items-center rounded-md cursor-pointer dark:bg-dark-darkColorButtons">
              <input
                type="file"
                accept="image/*"
                className="hidden cursor-pointer"
                multiple={false}
                onChange={(event) => {
                  event.target.blur();
                  handleAddImage(event.target.files[0]);
                }}
              />
              <Tooltip content="Subir Imagen" placement="top">
                <span>
                  <FaImage size={45} />
                </span>
              </Tooltip>
            </label>
          )}
          <label
            htmlFor="portada"
            className="block text-lg font-semibold mb-2 text-gray-900 my-11 text-center"
          >
            {book ? "Actualizar portada" : "Añadir una portada"}
          </label>
          {(image.current || image.preview) && (
            <Tooltip content="Eliminar Imagen">
              <div
                className="absolute -top-1 -right-1 w-8 h-8 hidden group-hover:flex justify-center items-center rounded-full cursor-pointer   "
                onClick={handleRemoveImage}
              >
                <HiXMark size={36} />
              </div>
            </Tooltip>
          )}
        </form>

        <div className="w-full md:w-4/6 mx-4 md:mx-16 my-4 md:my-14 ">
          <div className="w-full p-8 flex flex-col gap-3">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 mx-6">
              Detalle del libro
            </h1>
            <div className="mb-2 w-full px-6 md:px-16 relative">
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
                value={info.titulo}
                onChange={handleInputChange}
                disabled={isLoading}
                maxLength={70}
              />
              <span className="absolute bottom-3 right-20 text-xs text-gray-400">
                {info.titulo.length}/70
              </span>
              {errors.titulo && (
                <p className="text-red-500 font-semibold py-2 dark:text-red-500">
                  {errors.titulo}
                </p>
              )}
            </div>

            <div className="mb-2 w-full px-6 md:px-16 relative">
              <label
                htmlFor="sinopsis"
                className="block text-2xl font-semibold py-2 text-gray-900"
              >
                Sinopsis
              </label>
              <textarea
                id="sinopsis"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-gray-900 h-44"
                value={sinopsis}
                onChange={handleInputChange}
                disabled={isLoading}
                maxLength={1600}
              />
              <span className="absolute bottom-3 right-20 text-xs text-gray-400">
                {sinopsis.length}/1600
              </span>
              {errors.sinopsis && (
                <p className="text-red-500 font-semibold dark:text-red-500">
                  {errors.sinopsis}
                </p>
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
                className="border p-2 rounded focus:outline-none text-gray-500 font-semibold overflow-y-auto max-h-60"
                value={categoria}
                onChange={handleInputChange}
                disabled={isLoading}
              >
                <option value="" disabled>
                  Selecciona una categoria
                </option>
                {formatCategories()?.map((category) => (
                  <option key={category.value} value={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.categoria && (
                <p className="text-red-500 font-semibold dark:text-red-500">
                  {errors.categoria}
                </p>
              )}
            </div>

            <div className="mb-2 w-full flex items-center gap-3 px-6 md:px-16">
              <label
                htmlFor="adulto"
                className="text-2xl font-semibold text-gray-900"
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
};

export default BookForm;
