"use client";

import BookForm from "@/components/books/BookForm";
import useBook from "@/hooks/useBook";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { getBookByID, isLoading, error } = useBook();

  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    const result = await getBookByID(params.id);
    setBook(result);
  };

  useEffect(() => {
    fetchBook();
  }, [params.id]);

  return <BookForm book={book} />;
}
