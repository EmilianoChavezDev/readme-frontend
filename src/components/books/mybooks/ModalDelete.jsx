import React from "react";
import styles from "@/app/books/mybooks/styles/mybooks.module.css";
import useBook from "@/hooks/useBook";
import toast from "react-hot-toast";

const ModalDelete = ({
  onClose = () => {},
  libroId,
  setIsDeleted,
  setShowOptionMenu,
}) => {
  const { deleteBook } = useBook();
  const deleteBookHandler = async () => {
    try {
      await deleteBook(libroId);
      toast.success("Libro eliminado exitosamente");
      setIsDeleted(true);
      setShowOptionMenu(false);
    } catch (error) {
      toast.error("Lo sentimos,ocurrio un error al eliminar el libro");
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
