"use client";
import styles from "@/app/mybooks/styles/mybooks.module.css";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const OptionBooks = () => {
  return (
    <>
      <div className={styles.menu_container_options}>
        <div className={styles.container_option}>
          <MdModeEdit size={20}/>
          <div className={styles.container_btn_options}>
            <button className={styles.btn_edition_option}>Editar</button>
          </div>
        </div>
        <hr />
        <div className={styles.container_option}>
          <MdDelete size={20}/>
          <div className={styles.container_btn_options}>
            <button className={styles.btn_delete_option}>Eliminar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionBooks;
