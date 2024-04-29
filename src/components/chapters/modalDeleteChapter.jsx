import React from "react";
import styles from "@/app/books/mybooks/styles/mybooks.module.css";
import useChapter from "@/hooks/useChapter";
import toast from "react-hot-toast";

const modalDeleteChapter = ({
  onClose = () => {},
  chapterId,
  setIsDeleted,
  setShowOptionMenu,
}) => {
  const { deleteChapter } = useChapter();
  const deleteChapterHandler = async () => {
    try {
      await deleteChapter(chapterId);
      toast.success("Capitulo eliminado exitosamente");
      setIsDeleted(true);
      setShowOptionMenu(false);
    } catch (error) {
      toast.error("Lo sentimos,ocurrio un error al eliminar el capitulo");
    } finally {
      onClose();
    }
  };

  return (
    <>
      <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
          <p>¿Estás seguro de que deseas eliminar el capitulo?</p>
          <div className={styles.option_content_delete}>
            <div>
              <button onClick={onClose} className={styles.btn_cancel_delete}>
                Cancelar
              </button>
            </div>
            <div>
              <button
                onClick={deleteChapterHandler}
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

export default modalDeleteChapter;
