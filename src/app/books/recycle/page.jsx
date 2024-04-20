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
import useBook from "@/hooks/useBook";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import Pagination from "@/components/common/Pagination";
import RecycledBookItem from "@/components/recycle/RecycledBookItem";

const RecycleBin = () => {
  const { getAllBooks, isLoading } = useBook();
  const [recycledBooks, setRecycledBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getAllBooks({ page: currentPage });
        setRecycledBooks(books.data);
        setTotalPages(books.total_pages);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };
    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
                  recycledBooks.map((book, index) => (
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
            {/*logica para mostrar capitulos*/}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default RecycleBin;
