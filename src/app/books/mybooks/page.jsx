"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/mybooks.module.css";
import NavBar from "@/components/NavBar";
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

  //Para cargar la lista
  const chargeList = async (page, titulo = null, categoria = null) => {
    const params = {
      page: page,
      titulo: titulo,
      categorias: categoria,
    };
    const bookData = await getAllBooks(params);
    setDataBooks(bookData.data);
    setTotalPage(bookData.total_pages);
  };

  const fetchCategory = async () => {
    const category = await getCategory();
    setCategoryBooks(category);
  };

  useEffect(() => {
    chargeList(1, null, null);
    fetchCategory();
  }, []);

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
      setFilter("");
      chargeList(1, null, selectedCategory);
    }
  };

  //Accion al dar click al boton buscar
  const handleSearch = () => {
    if (selectOptions.length > 0) {
      setSelectBooks(selectOptions[0].value);
    }
    chargeList(1, filter, null);
  };

  //Paginacion
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    chargeList(pageNumber, filter, null);
  };

  return (
    <>
      {isLoading && <Loader />}
      <NavBar />
      <div className={styles.global_container}>
        <div className={styles.title_drafts_container}>
          <div>
            <p className={styles.title_drafts}>Mis Libros</p>
          </div>
          <div>
            <Link className={styles.btn_new_book} href="/books/create">
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
              maxMenuHeight={150}
              placeholder="Categorias"
              value={selectOptions.find(
                (option) => option.value === selectBooks
              )}
              styles={{
                ...styles,
                control: (base, state) => ({
                  ...base,
                  "&:hover": { borderColor: "#125e55" },
                  border: "1px solid lightgray",
                  boxShadow: "none",
                }),
              }}
            />
          </div>
          <div>
            <input
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
                <MyBooksContainer key={index} libroData={data} />
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
