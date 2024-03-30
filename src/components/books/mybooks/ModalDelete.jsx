import React from "react";
import styles from "@/app/books/mybooks/styles/mybooks.module.css";
import useBook from "@/hooks/useBook";

const ModalDelete = ({ onClose = () => {}, libroId }) => {
  const { deleteBook } = useBook();
  const deleteBookHandler = async () => {
    try {
      await deleteBook(libroId);
      console.log("Libro eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
          <p>¿Estás seguro de que deseas eliminar el libro?</p>
          <div className={styles.option_content_delete}>
            <div>
              <button onClick={onClose} className={styles.btn_cancel_delete}>
                Cancelar
              </button>
            </div>
            <div>
              <button
                onClick={deleteBookHandler}
                className={styles.btn_confirm_delete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
