"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import BookCard from "@/components/books/BookCard";
import ScrollableBookList from "@/components/books/ScrollableBookList";
import { TbRating18Plus } from "react-icons/tb";

export default function BookListPerCategory({ books, category }) {
  const MAX_SINOPSIS_LENGTH = 740;
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-semibold">{category}</h3>
      <div
        className="flex justify-center items-center py-3 px-60 cursor-pointer"
        onClick={() =>
          router.push(
            `/books/${
              books?.filter((book) => book.categoria === category)[0]?.id
            }`
          )
        }
      >
        <div className="flex gap-5 p-3 border border-gray-300 rounded-md">
          {books[0]?.portada ? (
            <div className="relative">
              <img
                src={books[0]?.portada}
                className="object-cover min-w-56 max-w-56 aspect-portada"
                alt="Portada de Libro"
              />
              {books[0].adulto && (
                <div className="absolute top-0 left-0 p-2">
                  <TbRating18Plus className="text-5xl text-red-500 dark:text-red-500" />
                </div>
              )}
            </div>
          ) : (
            <div className="min-w-56 max-w-56 aspect-portada bg-colorPrimario flex justify-center items-center">
              <Image
                src="/image/g3.png"
                width={150}
                height={150}
                alt="Portada de Libro"
              />
            </div>
          )}
          <div className="flex flex-col justify-center gap-3 min-w-96">
            <h3 className="text-xl font-bold">{books[0]?.titulo}</h3>
            <p>
              {books[0]?.sinopsis?.length > MAX_SINOPSIS_LENGTH
                ? `${books[0]?.sinopsis.substring(0, MAX_SINOPSIS_LENGTH)}...`
                : books[0]?.sinopsis}
            </p>
          </div>
        </div>
      </div>
      <ScrollableBookList>
        {books?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </ScrollableBookList>
    </div>
  );
}
