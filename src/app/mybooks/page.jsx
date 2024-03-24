"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/mybooks.module.css";
import NavBar from "@/components/NavBar";
import MyBooksContainer from "@/components/mybooks/BooksContainer";
import useDraft from "@/hooks/useDrafts";
import Loader from "@/components/common/loader";
import Link from "next/link";
import NotFound from "@/components/common/NotFound";

const PageMyBooks = () => {
  const { getDraftsUser, error, isLoading } = useDraft();
  const [dataDrafts, setDataDrafts] = useState([]);

  useEffect(() => {
    const chargeList = async () => {
      try {
        const drafts = await getDraftsUser();
        setDataDrafts(drafts);
      } catch {
        console.error("Error al traer los borradores:", error);
      }
    };
    isLoading && chargeList();
  }, [getDraftsUser, isLoading]);

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
        {dataDrafts && dataDrafts.length > 0 ? (
          <div className={styles.drafts_container}>
            {dataDrafts.map((data, index) => (
              <MyBooksContainer key={index} data={data} />
            ))}
          </div>
        ) : (
          <NotFound
            message={"¡Vaya! Parece que no tienes ningún libro."}
            butMessage={
              "Pero no te preocupes, puedes seguir navegando a través de la página."
            }
          />
        )}
      </div>
    </>
  );
};

export default PageMyBooks;
