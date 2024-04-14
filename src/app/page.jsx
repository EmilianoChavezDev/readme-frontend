<<<<<<< Updated upstream
"use client";

import NavBar from "@/components/NavBar";
import Loader from "@/components/common/loader";
import useGetLibros from "@/hooks/useGetLibros";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function BackgroundBlogCard() {
  const {
    getBooks,
    data: libros,
    loading,
    getContinueReading,
    dataContinueReading,
  } = useGetLibros();

  useEffect(() => {
    getContinueReading({ page: 1 });
    getBooks({ page: 1 });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container-fluid h-full">
            <div className="mb-32">
              {dataContinueReading?.libros?.length > 0 && (
                <>
                  <h2 className="text-3xl text-center pt-8 px-8 _sm:text-left font-bold mb-4">
                    Seguir Leyendo
                  </h2>
                  <div className="grid gap-8 grid-cols-1 _sm:grid-cols-2 _md:grid-cols-3 _lg:grid-cols-4 _xl:grid-cols-5 px-8 pb-20 shadow-lg">
                    {dataContinueReading.libros.map((libro) => (
                      <div key={libro.id} className="flex justify-center">
                        <Link
                          href={`/books/${libro.id}`}
                          className="flex justify-center w-auto h-auto"
                        >
                          <Card
                            shadow={false}
                            className="relative grid w-customWidth h-customHeight items-end justify-center overflow-hidden text-center"
                          >
                            <CardHeader
                              floated={false}
                              shadow={false}
                              color="transparent"
                              className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                            >
                              <Image
                                src={
                                  libro?.portada.length
                                    ? libro.portada
                                    : "/image/template_libro.png"
                                }
                                alt={`Portada del libro "${libro.titulo}"`}
                                width={250}
                                height={350}
                                className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                              />
                              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                            </CardHeader>
                            <CardBody className="relative py-8 px-6 md:px-8">
                              <Typography
                                variant="h5"
                                color="white"
                                className="mb-6 font-medium leading-[1.5]"
                              >
                                {libro.titulo}
                              </Typography>
                            </CardBody>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="my-12"></div>
              <h2 className="text-3xl text-center px-8 _sm:text-left font-bold mb-4 ">
                Novedades
              </h2>

              <div className="grid gap-8 grid-cols-1 _sm:grid-cols-2 _md:grid-cols-3 _lg:grid-cols-4 _xl:grid-cols-5 px-8">
                {libros?.data?.slice(0, 10).map((libro) => (
                  <div key={libro.id} className="flex justify-center">
                    <Link
                      href={`/books/${libro.id}`}
                      className="flex justify-center w-auto h-auto"
                    >
                      <Card
                        shadow={false}
                        className="relative grid w-customWidth h-customHeight items-end justify-center overflow-hidden text-center"
                      >
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
                        >
                          <Image
                            src={
                              libro?.portada.length
                                ? libro.portada
                                : "/image/template_libro.png"
                            }
                            alt={`Portada del libro "${libro.titulo}"`}
                            width={200}
                            height={350}
                            className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                          />
                          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                        </CardHeader>
                        <CardBody className="relative py-8 px-6 md:px-8">
                          <Typography
                            variant="h5"
                            color="white"
                            className="mb-6 font-medium leading-[1.5]"
                          >
                            {libro.titulo}
                          </Typography>
                        </CardBody>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
=======
"use client";

import Loader from "@/components/common/loader";
import useGetLibros from "@/hooks/useGetLibros";
import { Option, Select } from "@material-tailwind/react";
import useCategory from "@/hooks/useCategory";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import useBook from "@/hooks/useBook";
import BookNotFound from "@/components/home/BookNotFound";
import BookCardList from "@/components/home/BookCardList";
import BookCards from "@/components/home/BookCards";

export default function BackgroundBlogCard() {
  const { getAllBooks } = useBook();
  const {
    getBooks,
    data: libros,
    loading,
    getContinueReading,
    dataContinueReading,
  } = useGetLibros();
  const [categories, setCategories] = useState([]);
  const { fetchCategories, data: categoriesArray } = useCategory();
  const [categorySelectedToSearch, setCategorySelectedToSearch] = useState("");
  const [bookData, setBooksData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    getContinueReading({ page: 1 });
    getBooks({ page: 1 });
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoriesArray?.length) {
      setCategories(categoriesArray?.map((c) => ({ id: c[0], name: c[1] })));
    }
  }, [categoriesArray]);

  const fetchBooks = async (values = {}) => {
    let params = {
      page: 1,
      categorias: categorySelectedToSearch,
      user_id: localStorage.getItem("user_id"),
    };
    const result = await getAllBooks(params);
    setBooksData(result.data);
    setCategory(categorySelectedToSearch);
  };

  //Botones de Scroll
  const handleScrollLeft = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollLeft -= 150;
    }
  };

  const handleScrollRight = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollLeft += 150;
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container-fluid h-full mx-2">
            {dataContinueReading?.libros?.length > 0 && (
              <>
                <div className="my-12"></div>
                <h2 className="text-3xl text-center px-4 _sm:text-left font-bold mb-4 ">
                  Novedades
                </h2>
                <div style={{ width: "100%", overflowX: "hidden" }}>
                  <div className="flex items-center">
                    <div
                      id="scroll-container-1"
                      className="flex items-center overflow-x-auto"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <BookCardList books={libros.data} />
                    </div>
                    <button
                      onClick={() => handleScrollLeft("scroll-container-1")}
                      style={{
                        backgroundColor: "#167574",
                        position: "absolute",
                        zIndex: 10,
                        top: "300px",
                        left: "5px",
                      }}
                    >
                      <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full bg-transparent"
                        style={{ backgroundColor: "#167574" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </IconButton>
                    </button>
                    <button
                      onClick={() => handleScrollRight("scroll-container-1")}
                      className="!absolute !right-4 -translate-y-2/4 rounded-full bg-transparent"
                      style={{
                        backgroundColor: "#167574",
                        position: "absolute",
                        zIndex: 10,
                        top: "300px",
                      }}
                    >
                      <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        className="rounded-full bg-transparent"
                        style={{ backgroundColor: "#167574" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </IconButton>
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="mb-32">
              {dataContinueReading?.libros?.length > 0 && (
                <>
                  <h2 className="text-2xl text-center pt-8 px-4 _sm:text-left font-bold mb-4">
                    Seguir Leyendo
                  </h2>

                  <div style={{ width: "100%", overflowX: "hidden" }}>
                    <div
                      id="scroll-container-2"
                      className="h-full w-screen m-2 flex-shrink-0 cursor-pointer relative flex items-center overflow-x-auto"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <BookCards libros={dataContinueReading.libros} />
                    </div>
                    <button
                      onClick={() => handleScrollLeft("scroll-container-2")}
                      style={{
                        backgroundColor: "#167574",
                        position: "absolute",
                        zIndex: 10,
                        top: "680px",
                        left: "5px",
                      }}
                    >
                      <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        className="!absolute top-3 left-4 -translate-y-2/4 rounded-full bg-transparent"
                        style={{ backgroundColor: "#167574" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </IconButton>
                    </button>

                    <button
                      onClick={() => handleScrollRight("scroll-container-2")}
                      className="!absolute !right-4 -translate-y-2/4 rounded-full bg-transparent"
                      style={{
                        backgroundColor: "#167574",
                        position: "absolute",
                        zIndex: 10,
                        top: "690px",
                      }}
                    >
                      <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        className="rounded-full bg-transparent"
                        style={{ backgroundColor: "#167574" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </IconButton>
                    </button>
                  </div>
                </>
              )}

              <div className="mb-32">
                <div className="my-12"></div>

                <div className="flex ...">
                  <div>
                    <h2 className="text-3xl text-center px-4 _sm:text-left font-bold mb-4 ">
                      Categorías
                    </h2>
                  </div>
                  <div className="grow h-10 ..."></div>
                  <div className="ml-4">
                    {categories.length && (
                      <Select
                        label="Categoría"
                        className="!max-w-40"
                        containerProps={{ className: "!min-w-40 !max-w-40" }}
                        labelProps={{ className: "!max-w-40" }}
                        value={categorySelectedToSearch}
                        onChange={(value) => setCategorySelectedToSearch(value)}
                      >
                        {categories?.map((category, index) => (
                          <Option
                            key={index}
                            className="min-h-9"
                            value={category.id}
                          >
                            {category.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </div>
                  <div className="ml-4">
                    <button
                      className="h-10 px-3 rounded-md bg-colorPrimario hover:bg-colorHoverPrimario text-white"
                      onClick={() => fetchBooks()}
                    >
                      Buscar
                    </button>
                  </div>
                </div>

                {!bookData || bookData.length <= 0 ? (
                  category === "" ? (
                    <>
                      <div>
                        <h2 className="text-2xl text-center px-4 _sm:text-left font-bold mb-4 ">
                          Todas las Categorías
                        </h2>
                      </div>

                      <Carousel
                        className="navbar overflow-hidden"
                        prevArrow={({ handlePrev }) => (
                          <IconButton
                            variant="text"
                            color="white"
                            size="lg"
                            onClick={handlePrev}
                            className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full bg-transparent"
                            style={{ backgroundColor: "#167574" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="white"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </IconButton>
                        )}
                        nextArrow={({ handleNext }) => (
                          <IconButton
                            variant="text"
                            color="white"
                            size="lg"
                            onClick={handleNext}
                            className="!absolute top-2/4 !right-4 -translate-y-2/4 rounded-full bg-transparent"
                            style={{ backgroundColor: "#167574" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </IconButton>
                        )}
                      >
                        {libros?.data?.map((libro, index) => (
                          <div
                            key={libro.id}
                            className={`flex justify-center ${
                              index > 0 ? "ml-4" : ""
                            }`}
                          >
                            <Link
                              href={`/books/${libro.id}`}
                              className="flex justify-center w-auto h-auto"
                            >
                              <div className="p-10">
                                <div className="container mx-auto px-4 py-8 max-w-screen-xl bg-white rounded-lg shadow-md w-[1000px] h-[300px]">
                                  <div className="flex">
                                    <div
                                      className="relative w-64 h-80 overflow-hidden rounded-t-lg rounded-b-md"
                                      style={{ marginBottom: "-70px" }}
                                    >
                                      <div className="absolute inset-0 overflow-hidden -mb-4 rounded-t-lg rounded-b-md">
                                        <Image
                                          src={
                                            libro?.portada.length
                                              ? libro.portada
                                              : "/image/template_libro.png"
                                          }
                                          alt="imgbook"
                                          width={150}
                                          height={300}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    </div>
                                    <div className="ml-28 mt-2">
                                      <h3
                                        className="text-3xl font-bold mb-2 truncate"
                                        style={{ maxWidth: "auto" }}
                                      >
                                        {libro.titulo}
                                      </h3>
                                      <div
                                        style={{
                                          maxWidth: "500px",
                                          maxHeight: "300px",
                                          overflow: "hidden",
                                          display: "nowrap",
                                          lineHeight: "1.5em",
                                        }}
                                      >
                                        <p className="text-base">
                                          {libro.sinopsis}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </Carousel>
                    </>
                  ) : (
                    <>
                      <div>
                        <h2 className="text-2xl text-center px-4 _sm:text-left font-bold mb-4 ">
                          {category}
                        </h2>
                      </div>
                      <BookNotFound
                        message={
                          "Lo siento, no hay libros disponibles en esta categoría en este momento."
                        }
                      />
                    </>
                  )
                ) : (
                  <>
                    <div>
                      <h2 className="text-2xl text-center px-4 _sm:text-left font-bold mb-4 ">
                        {category}
                      </h2>
                    </div>
                    <Carousel
                      className="navbar overflow-hidden"
                      prevArrow={({ handlePrev }) => (
                        <IconButton
                          variant="text"
                          color="white"
                          size="lg"
                          onClick={handlePrev}
                          className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full bg-transparent"
                          style={{ backgroundColor: "#167574" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="white"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </IconButton>
                      )}
                      nextArrow={({ handleNext }) => (
                        <IconButton
                          variant="text"
                          color="white"
                          size="lg"
                          onClick={handleNext}
                          className="!absolute top-2/4 !right-4 -translate-y-2/4 rounded-full bg-transparent"
                          style={{ backgroundColor: "#167574" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </IconButton>
                      )}
                    >
                      {bookData?.map((libro, index) => (
                        <div
                          key={libro.id}
                          className={`flex justify-center ${
                            index > 0 ? "ml-4" : ""
                          }`}
                        >
                          <Link
                            href={`/books/${libro.id}`}
                            className="flex justify-center w-auto h-auto"
                          >
                            <div className="p-10">
                              <div className="container mx-auto px-4 py-8 max-w-screen-xl bg-white rounded-lg shadow-md w-[1000px] h-[300px]">
                                <div className="flex">
                                  <div
                                    className="relative w-64 h-80 overflow-hidden rounded-t-lg rounded-b-md"
                                    style={{ marginBottom: "-70px" }}
                                  >
                                    <div className="absolute inset-0 overflow-hidden -mb-4 rounded-t-lg rounded-b-md">
                                      <Image
                                        src={
                                          libro.portada
                                            ? libro.portada
                                            : "/image/template_libro.png"
                                        }
                                        alt="imgbook"
                                        width={150}
                                        height={300}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>
                                  <div className="ml-28 mt-2">
                                    <h3
                                      className="text-3xl font-bold mb-2 truncate"
                                      style={{ maxWidth: "auto" }}
                                    >
                                      {libro.titulo}
                                    </h3>
                                    <div
                                      style={{
                                        maxWidth: "500px",
                                        maxHeight: "300px",
                                        overflow: "hidden",
                                        display: "nowrap",
                                        lineHeight: "1.5em",
                                      }}
                                    >
                                      <p className="text-base">
                                        {libro.sinopsis}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </Carousel>

                    <div className="pt-10">
                      <div style={{ width: "100%", overflowX: "hidden" }}>
                        <div
                          id="scroll-container-3"
                          className="h-full w-screen m-2 flex-shrink-0 cursor-pointer relative flex items-center overflow-x-auto"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          <BookCards libros={bookData} />
                        </div>
                        <button
                          onClick={() => handleScrollLeft("scroll-container-3")}
                          style={{
                            backgroundColor: "#167574",
                            position: "absolute",
                            zIndex: 10,
                            top: "1600px",
                            left: "5px",
                          }}
                        >
                          <IconButton
                            variant="text"
                            color="white"
                            size="lg"
                            className="!absolute top-3 left-4 -translate-y-2/4 rounded-full bg-transparent"
                            style={{ backgroundColor: "#167574" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </IconButton>
                        </button>

                        <button
                          onClick={() =>
                            handleScrollRight("scroll-container-3")
                          }
                          className="!absolute !right-4 -translate-y-2/4 rounded-full bg-transparent"
                          style={{
                            backgroundColor: "#167574",
                            position: "absolute",
                            zIndex: 10,
                            top: "1600px",
                          }}
                        >
                          <IconButton
                            variant="text"
                            color="white"
                            size="lg"
                            className="rounded-full bg-transparent"
                            style={{ backgroundColor: "#167574" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </IconButton>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
>>>>>>> Stashed changes
