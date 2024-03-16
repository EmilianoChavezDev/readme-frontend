"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/drafts.module.css";
import NavBar from "@/components/NavBar";
import DraftsContainer from "@/components/DraftsContainer";
import useDraft from "@/hooks/useDrafts";

const PageDrafts = () => {
  const { getDraftsUser, error, isLoading } = useDraft();
  const [dataDrafts, setDataDrafts] = useState([]);

  useEffect(() => {
    const chargeList = async () => {
      try {
        const drafts = await getDraftsUser();
        setDataDrafts(drafts);
        console.log(drafts);
      } catch {
        console.error("Error al traer los borradores:", error);
      }
    };

    if (isLoading) {
      chargeList();
    }
  }, [getDraftsUser, isLoading]);

  return (
    <>
      <NavBar />
      <div className={styles.global_container}>
        <div className={styles.title_drafts_container}>
          <div>
            <p className={styles.title_drafts}>Mis borradores</p>
          </div>
          <div>
            <button className={styles.btn_new_book} disabled>+ Nuevo Libro</button>
          </div>
        </div>
        <div className={styles.drafts_container}>
          {dataDrafts?.map((data, index) => (
            <DraftsContainer key={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PageDrafts;
