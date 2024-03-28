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

const PageMyBooks = () => {
  const { getAllBooks, isLoading } = useBook();
  const [dataBooks, setDataBooks] = useState([]);
  const [filter, setFilter] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  //Para cargar la lista
  const chargeList = async (page, titulo = null, categoria = null) => {
    const params = {
      page: page,
      titulo: titulo,
      categoria: categoria,
    };
    const bookData = await getAllBooks(params);
    setDataBooks(bookData.data);
    setTotalPage(bookData.total_pages);
  };

  useEffect(() => {
    chargeList(1, null, null);
  }, []);

  //Extraer categorías únicas utilizando un conjunto (Set)
  const uniqueCategories = [
    ...new Set(dataBooks.map((book) => book.categoria)),
  ];

  //Crear opciones para el select basadas en las categorías únicas
  const selectOptions = uniqueCategories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ));

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory == "") {
      chargeList(1, filter, null);
    } else {
      chargeList(1, null, selectedCategory);
    }
  };

  //Accion al dar click al boton buscar
  const handleSearch = () => {
    document.getElementById("category").selectedIndex = 0;
    chargeList(1, filter, null);
  };

  //Paginacion
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    chargeList(currentPage, filter, null);
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
            <select
              id="category"
              onChange={handleCategoryChange}
              className={styles.select_category}
            >
              <option value="">Categoria</option>
              <option value="">Todos</option>
              {selectOptions}
            </select>
          </div>
          <div>
            <input
              className={styles.search}
              type="text"
              placeholder="Buscar por Titulo"
              onBlur={(e) => setFilter(e.target.value)}
            />
          </div>
          <div>
            <button
              className={styles.btn_search}
              onClick={() => handleSearch()}
            >
              <CiSearch
                size={25}
                className="hover:text-colorHoverPrimario ml-2"
              />
            </button>
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
        ) : filter !== "" ? (
          <BookNotFound
            message={
              "Lo sentimos, el libro que estas buscando no se encuentra dentro de tus libros"
            }
          />
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
