"use client";

import Loader from "@/components/common/loader";
import useGetLibros from "@/hooks/useGetLibros";
import { useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import BookCardList from "@/components/home/BookCardList";
import BookCardContinueReading from "@/components/home/BookCardContinueReading";
import BookForCategory from "@/components/home/BookForCategory";

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

  //Botones de Scroll
  const handleScrollLeft = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollTo({
        left: container.scrollLeft - 150,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollTo({
        left: container.scrollLeft + 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container-fluid h-full mx-2">
            {libros?.data?.length > 0 && (
              <>
                <div className="my-12"></div>
                <h2 className="text-3xl text-center px-4 _sm:text-left font-bold mb-4 ">
                  Novedades
                </h2>
                <div>
                  <div className="flex items-center ">
                    <div
                      id="scroll-container-1"
                      className="flex items-center overflow-x-auto p-6 h-full"
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
                        top: "380px",
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
                        top: "380px",
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
                      className="flex items-center overflow-x-auto p-6 h-full"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <BookCardContinueReading
                        libros={dataContinueReading.libros}
                      />
                    </div>
                    <button
                      onClick={() => handleScrollLeft("scroll-container-2")}
                      style={{
                        backgroundColor: "#167574",
                        position: "absolute",
                        zIndex: 10,
                        top: "850px",
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
                        top: "850px",
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
                <div>
                  <h2 className="text-3xl text-center px-4 _sm:text-left font-bold mb-4 ">
                    Categorías
                  </h2>
                </div>
                <div>
                  <BookForCategory
                    category={"Fantasia"}
                    bookData={libros.data}
                  />
                  <BookForCategory category={"Terror"} bookData={libros.data} />

                  <BookForCategory
                    category={"Infantil"}
                    bookData={libros.data}
                  />
                  <BookForCategory
                    category={"Aventura"}
                    bookData={libros.data}
                  />
                  <BookForCategory
                    category={"Juvenil"}
                    bookData={libros.data}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
