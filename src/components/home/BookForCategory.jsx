"use client";
import { useState, useEffect } from "react";
import BookCardContinueReading from "./BookCardContinueReading";
import BookNotFound from "@/components/home/BookNotFound";
import Link from "next/link";
import Image from "next/image";
const BookForCategory = ({ category, bookData }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const filtered = bookData?.filter((libro) => libro.categoria === category);
    setFilteredBooks(filtered);
  }, [category, bookData]);

  return (
    <div class="py-4">
      {filteredBooks?.length === 0 || filteredBooks === undefined ? (
        <></>
      ) : (
        <div>
          <h2 className="text-2xl text-center px-4 _sm:text-left font-bold mb-4 ">
            {category}
          </h2>
          <div className={`flex justify-center`}>
            <Link
              href={`/books/${filteredBooks[0]?.id}`}
              className="flex justify-center w-auto h-auto"
            >
              <div className="p-10">
                <div className="container mx-auto px-4 py-8 max-w-screen-xl bg-white rounded-lg shadow-sm border-2 w-[1000px] h-[300px]">
                  <div className="flex">
                    <div className="relative w-64">
                      <div>
                        <Image
                          src={
                            filteredBooks[0]?.portada
                              ? filteredBooks[0]?.portada
                              : "/image/template_libro.png"
                          }
                          alt="imgbook"
                          width={150}
                          height={300}
                          className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center transition-transform duration-300 transform-gpu group-hover:scale-105 shadow-lg"
                          style={{
                            height: "250px",
                            width: "200px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="ml-8 mt-2">
                      <h3
                        className="text-3xl font-bold mb-2 truncate"
                        style={{ maxWidth: "auto" }}
                      >
                        {filteredBooks[0]?.titulo}
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
                        <p className="text-sm">{filteredBooks[0]?.sinopsis}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="p-10">
            <div
              id="scroll-container-3"
              className="grid gap-6 md:gap-6 lg:gap-8 xl:gap-10 md:grid-cols-5 grid-cols-1 justify-items-center place-content-center"
              style={{
                gridAutoRows: "minmax(0, 1fr)",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <BookCardContinueReading libros={filteredBooks?.slice(0, 5)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookForCategory;
