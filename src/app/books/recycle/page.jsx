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

const RecycleBin = () => {
  const { getRecycledBooks, isLoading } = useRecycle();
  const [recycledBooks, setRecycledBooks] = useState([]);
  const [recycledChapters, setRecycledChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchBooks = async () => {
    const books = await getRecycledBooks({ page: currentPage });
    setRecycledBooks(books.data);
    setRecycledChapters(
      books.data.flatMap((book) => book.capitulos_eliminados)
    );
    setTotalPages(books.total_pages);
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
              <div className="flex justify-center flex-col gap-5 px-10">
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner className="h-12 w-12" />
                  </div>
                ) : (
                  recycledBooksFiltered.map((book, index) => (
                    <RecycledBookItem key={index} book={book} />
                  ))
                )}
              </div>
              <div className="flex justify-center p-3 my-4">
                <div className="transform scale-125 shadow">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel value="capitulos">
              <div className="flex justify-center flex-col gap-5 px-10">
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner className="h-12 w-12" />
                  </div>
                ) : (
                  recycledChapters.map((chapters, index) => (
                    <RecycledChapterItem key={index} chapters={chapters} />
                  ))
                )}
              </div>
              <div className="flex justify-center p-3 my-4">
                <div className="transform scale-125 shadow">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
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
