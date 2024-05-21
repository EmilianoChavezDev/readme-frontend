"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

import useBook from "@/hooks/useBook";
import useGetLibros from "@/hooks/useGetLibros";
import BookCard from "@/components/books/BookCard";
import ScrollableBookList from "@/components/books/ScrollableBookList";
import BookListPerCategory from "@/components/books/BookListPerCategory";
import useCategory from "@/hooks/useCategory";
import Loader from "@/components/common/loader";

const ColoredDivsList = () => {
  const { getAllBooks, getBookIntereses } = useBook();
  const { getContinueReading, dataContinueReading } = useGetLibros();
  const {
    data: categories,
    fetchCategories,
    loading: categoriesLoading,
  } = useCategory();

  const [books, setBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState({});

  const fetchNews = async () => {
    const result = await getAllBooks({ page: 1, cantidad_minima_capitulos: 1 });
    setBooks(result?.data);
  };

  const fetchBooksForCategory = async () => {
    const result = await getBookIntereses();
    setCategoryBooks(result);
  };

  useEffect(() => {
    fetchNews();
    getContinueReading();
    fetchCategories();
    fetchBooksForCategory();
  }, []);

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className={`${books?.length ? "flex" : "hidden"} flex-col`}>
        <h2 className="text-3xl leading-7 font-bold pl-9">Novedades</h2>
        <ScrollableBookList>
          {books?.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </ScrollableBookList>
      </div>
      <div
        className={`${
          dataContinueReading?.libros?.length ? "flex" : "hidden"
        } flex-col`}
      >
        <h2 className="text-3xl leading-7 font-bold pl-9">Seguir Leyendo</h2>
        <ScrollableBookList>
          {dataContinueReading?.libros?.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </ScrollableBookList>
      </div>
      {!categoriesLoading ? (
        <div
          className={`${categories?.length ? "flex" : "hidden"} flex-col gap-3`}
        >
          <h2 className="text-3xl leading-7 font-bold pl-9">
            Navega por nuestras categorías
          </h2>
          <div className="flex flex-col gap-3 pl-12">
            {categories
              ?.filter((c) => {
                return Object.keys(categoryBooks).includes(c[1]);
              })
              .map((category, index) => (
                <BookListPerCategory
                  key={index}
                  category={category[1]}
                  books={categoryBooks[category[1]]}
                />
              ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ColoredDivsList;
