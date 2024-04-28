"use client";
import NavBar from "@/components/NavBar";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsBook } from "react-icons/bs";
import useRecycle from "@/hooks/useRecycle";
import { useEffect, useState } from "react";
import { GrChapterAdd } from "react-icons/gr";
import Loader from "@/components/common/loader";
import { VscChevronRight } from "react-icons/vsc";
import Pagination from "@/components/common/Pagination";
import RecycledBookItem from "@/components/recycle/RecycledBookItem";
import RecycledChapterItem from "@/components/recycle/RecycledChapterItem";
import NotFound from "@/components/common/NotFound";

const RecycleBin = () => {
  const {
    getRecycledBooks,
    restoreBook,
    restoreChatper,
    getRecycledChapters,
    isLoading,
  } = useRecycle();
  const [recycledBooks, setRecycledBooks] = useState([]);
  const [recycledChapters, setRecycledChapters] = useState([]);

  const [currentChapter, setCurrentChapter] = useState(1);
  const [totalChapters, setTotalChapters] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBooks = async () => {
    const books = await getRecycledBooks({ page: currentPage });
    setRecycledBooks(books.data);
    setTotalPages(books.total_pages);
    window.scrollTo(0, 0);
  };
  const fetchChapters = async () => {
    const chapters = await getRecycledChapters({ page: currentChapter });
    setRecycledChapters(chapters.data);
    setTotalChapters(chapters.total_pages);
    window.scrollTo(0, 0);
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
      fetchChapters();
    } else {
      toast.error("Error al restaurar el Capitulo");
    }
  };

  const recycledBooksFiltered = recycledBooks.filter(
    (book) => book.deleted === true
  );

  useEffect(() => {
    fetchBooks();
    fetchChapters();
  }, [currentPage, currentChapter]);

  return (
    <div className="relative flex flex-col gap-3 px-20 py-9">
      <div className="flex gap-2 items-center">
        <Link href="/accounts" className="font-semibold text-gray-800">
          Cuenta
        </Link>
        <span>
          <VscChevronRight />
        </span>
        <span className="font-semibold text-gray-800">
          Papelera de reciclaje
        </span>
      </div>
      <div className="flex justify-between">
        <h1 className="font-bold text-gray-800 text-3xl leading-8">Papelera</h1>
      </div>
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
                <GrChapterAdd />
                Capitulos
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="libros">
              <div className="flex justify-center flex-col gap-5 px-10 h-full">
                {isLoading && <Loader />}
                {Boolean(recycledBooksFiltered?.length) ? (
                  recycledBooksFiltered.map((book, index) => (
                    <RecycledBookItem
                      key={index}
                      book={book}
                      onRestore={() => handleRestoreBook(book)}
                    />
                  ))
                ) : (
                  <NotFound
                    message="¡Vaya! Parece que no tienes ningún libro eliminado."
                    butMessage="Pero no te preocupes, puedes seguir navegando a través de la página."
                  />
                )}
              </div>
              <div className="flex justify-center p-3 my-4">
                <div className="transform scale-125 shadow">
                  {Boolean(recycledBooksFiltered?.length) && (
                    <Pagination
                      currentPage={currentPage ?? 1}
                      totalPages={totalPages ?? 0}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="capitulos">
              <div className="flex justify-center flex-col gap-5 px-10">
                {isLoading && <Loader />}
                {Boolean(recycledChapters?.length) ? (
                  recycledChapters.map((chapter, index) => (
                    <RecycledChapterItem
                      key={index}
                      chapter={chapter}
                      onRestore={() => handleRestoreChapter(chapter)}
                    />
                  ))
                ) : (
                  <NotFound
                    message="¡Vaya! Parece que no tienes ningún capítulo eliminado."
                    butMessage="Pero no te preocupes, puedes seguir navegando a través de la página."
                  />
                )}
              </div>
              <div className="flex justify-center p-3 my-4">
                <div className="transform scale-125 shadow">
                  {Boolean(recycledChapters?.length) && (
                    <Pagination
                      currentPage={currentChapter ?? 1}
                      totalPages={totalChapters ?? 0}
                      onPageChange={setCurrentChapter}
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
