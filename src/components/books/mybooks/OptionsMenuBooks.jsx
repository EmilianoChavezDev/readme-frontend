import styles from "@/app/books/mybooks/styles/mybooks.module.css";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import ModalDelete from "./ModalDelete";
import { useState } from "react";

const OptionBooks = ({
  libroId,
  isDeleted,
  setIsDeleted,
  setShowOptionMenu,
}) => {
  const router = useRouter();
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleEdit = () => {
    router.push(`/books/edit/${libroId}`);
  };

  const handleDelete = () => {
    setShowModalDelete(true);
  };

  const handleCloseModal = () => {
    setShowModalDelete(false);
  };

  return (
    <>
      <div className={styles.menu_container_options}>
        <div className={styles.container_option}>
          <MdModeEdit size={20} onClick={handleEdit} />
          <div className={styles.container_btn_options}>
            <button
              className={styles.btn_edition_option}
              onClick={() => handleEdit(libroId)}
            >
              Editar
            </button>
          </div>
        </div>
        <hr />
        <div className={styles.container_option}>
          <MdDelete size={20} onClick={handleDelete} />
          <div className={styles.container_btn_options}>
            <button className={styles.btn_delete_option} onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
      {showModalDelete && (
        <ModalDelete
          onClose={handleCloseModal}
          libroId={libroId}
          isDeleted={isDeleted}
          setIsDeleted={setIsDeleted}
          setShowOptionMenu={setShowOptionMenu}
        />
      )}
    </>
  );
};

export default OptionBooks;
