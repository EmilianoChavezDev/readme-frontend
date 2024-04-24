"use client";
import NavBar from "@/components/NavBar";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { BsBook, BsPerson } from "react-icons/bs";
import RecycledBookItem from "@/components/recycle/RecycledBookItem";
import useRecycle from "@/hooks/useRecycle";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import Pagination from "@/components/common/Pagination";
import RecycledChapterItem from "@/components/recycle/RecycledChapterItem";
import RecycledBookItem from "@/components/recycle/RecycledBookItem";
import toast from "react-hot-toast";
import Loader from "@/components/common/loader";

const RecycleBin = () => {
  const { getRecycledBooks, restoreBook, restoreChatper, isLoading } =
    useRecycle();
  const [recycledBooks, setRecycledBooks] = useState([]);
  const [recycledChapters, setRecycledChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchBooks = async () => {
    const books = await getRecycledBooks({ page: currentPage });
    setRecycledBooks(books.data);
    setRecycledChapters(
      books.data.flatMap((book) =>
        book.capitulos_eliminados.map((chapter) => ({
          ...chapter,
          tituloLibro: book.titulo,
          libroPortada: book.portada,
        }))
      )
    );
    setTotalPages(books.total_pages);
  };
  const handleRestoreBook = async (book) => {
    const result = await restoreBook(book.id);
    if (result) {
      toast.success("Libro restaurado con éxito");
      fetchBooks();
    } else {
      toast.error("Error al restaurar el libro");
    }
  };
  const handleRestoreChapter = async (chapter) => {
    const result = await restoreChatper(chapter.id);
    if (result) {
      toast.success("Capitulo restaurado con éxito");
      fetchBooks();
    } else {
      toast.error("Error al restaurar el Capitulo");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const recycledBooksFiltered = recycledBooks.filter(
    (book) => book.deleted === true
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-5">
        <Tabs value="libros">
          <TabsHeader className="sticky top-2">
            <Tab value="libros">
              <div className="flex items-center gap-2">
                <BsBook />
                Libros
              </div>
            </Tab>
            <Tab value="capitulos">
              <div className="flex items-center gap-2">
                <BsPerson />
                Capitulos
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="libros">
              <div className="flex justify-center flex-col gap-5 px-10 h-full">
                {isLoading && <Loader />}
                {recycledBooksFiltered.map((book, index) => (
                  <RecycledBookItem
                    key={index}
                    book={book}
                    onRestore={() => handleRestoreBook(book)}
                    disableButton={isLoading}
                  />
                ))}
              </div>
              <div className="flex justify-center p-3 my-4">
                <div className="transform scale-125 shadow">
                  {Boolean(recycledBooksFiltered?.length) && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="capitulos">
              <div className="flex justify-center flex-col gap-5 px-10">
                {isLoading && <Loader />}
                {recycledChapters.map((chapter, index) => (
                  <RecycledChapterItem
                    key={index}
                    chapter={chapter}
                    onRestore={() => handleRestoreChapter(chapter)}
                    disableButton={isLoading}
                  />
                ))}
              </div>
              <div className="flex justify-center p-3 my-4">
                <div className="transform scale-125 shadow">
                  {Boolean(recycledChapters?.length) && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default RecycleBin;
