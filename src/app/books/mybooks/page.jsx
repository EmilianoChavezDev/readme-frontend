"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/mybooks.module.css";
import MyBooksContainer from "@/components/books/mybooks/BooksContainer";
import Loader from "@/components/common/loader";
import Link from "next/link";
import NotFound from "@/components/common/NotFound";
import useBook from "@/hooks/useBook";
import { CiSearch } from "react-icons/ci";
import BookNotFound from "@/components/favorites/BookNotFound";
import Pagination from "@/components/common/Pagination";
import Select from "react-select";

const PageMyBooks = () => {
  const { getAllBooks, getCategory, isLoading } = useBook();
  const [dataBooks, setDataBooks] = useState([]);
  const [filter, setFilter] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [selectBooks, setSelectBooks] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  //Para cargar la lista
  const chargeList = async (page, titulo = null, categoria = null) => {
    const params = {
      page: page,
      titulo: titulo,
      categorias: categoria,
      user_id: localStorage.getItem("user_id"),
    };
    const bookData = await getAllBooks(params);
    setDataBooks(bookData.data);
    setTotalPage(bookData.total_pages);
    setIsDeleted(false);
  };

  const fetchCategory = async () => {
    const category = await getCategory();
    setCategoryBooks(category);
  };

  useEffect(() => {
    chargeList(1, null, null);
    fetchCategory();
  }, []);

  useEffect(() => {
    if (!isDeleted) return;
    chargeList(currentPage, null, null);
    fetchCategory();
  }, [isDeleted]);

  const selectOptions = [
    { value: "", label: "Todas las categorías" },
    ...categoryBooks?.map((category) => ({
      value: category[0],
      label: category[1],
    })),
  ];

  const handleCategoryChange = (selectedOption) => {
    const selectedCategory = selectedOption.value;
    setSelectBooks(selectedCategory);
    if (selectedCategory === "") {
      chargeList(1, filter, null);
    } else {
      setCurrentPage(1);
      setFilter("");
      chargeList(1, null, selectedCategory);
    }
  };

  //Accion al dar click al boton buscar
  const handleSearch = () => {
    if (selectOptions.length > 0) {
      setSelectBooks(selectOptions[0].value);
    }
    setCurrentPage(1);
    chargeList(1, filter, null);
  };

  //Paginacion
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    chargeList(pageNumber, filter, null);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.global_container}>
        <div className={styles.title_drafts_container}>
          <div>
            <p className={styles.title_drafts}>Mis Libros</p>
          </div>
          <div>
            <Link
              id="new-book"
              className={styles.btn_new_book}
              href="/books/create"
            >
              + Nuevo Libro
            </Link>
          </div>
        </div>
        <div className={styles.filters_container}>
          <div className={styles.select_container}>
            <Select
              id="category"
              options={selectOptions}
              onChange={handleCategoryChange}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              maxMenuHeight={150}
              placeholder="Categorias"
              value={selectOptions.find(
                (option) => option.value === selectBooks
              )}
            />
          </div>
          <div>
            <input
              id="input-mybooks"
              className={styles.search}
              type="search"
              placeholder="Buscar por Titulo"
              onBlur={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className={styles.search_content}>
            <button
              className={styles.btn_search}
              onClick={() => handleSearch()}
            >
              <CiSearch size={25} className="hover:text-colorHoverPrimario" />
            </button>
            <span className={styles.search_label}>Buscar</span>
          </div>
        </div>
        {dataBooks && dataBooks.length > 0 ? (
          <div>
            <div className={styles.drafts_container}>
              {dataBooks.map((data, index) => (
                <MyBooksContainer
                  key={index}
                  libroData={data}
                  isDeleted={isDeleted}
                  setIsDeleted={setIsDeleted}
                />
              ))}
            </div>
            <div className={styles.pagination}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        ) : filter !== "" || selectBooks !== "" ? (
          <div>
            <BookNotFound
              message={
                "Lo sentimos, el libro que estas buscando no se encuentra dentro de tus libros"
              }
            />
          </div>
        ) : (
          <div>
            <NotFound
              message={"¡Vaya! Parece que no tienes ningún libro."}
              butMessage={
                "Pero no te preocupes, puedes seguir navegando a través de la página."
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PageMyBooks;
