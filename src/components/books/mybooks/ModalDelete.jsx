import styles from "@/app/mybooks/styles/mybooks.module.css";

const ModalDelete = ({ onClose = () => {} , libroId }) => {
  
    const handleDelete = () =>{
        console.log("ID LIBRO ",libroId);
        onClose();
    }
    return (
    <>
      <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
          <p>¿Estás seguro de que deseas eliminar el libro?</p>
          <div className={styles.option_content_delete}>
            <div>
              <button onClick={onClose} className={styles.btn_cancel_delete}>Cancelar</button>
            </div>
            <div>
              <button onClick={handleDelete} className={styles.btn_confirm_delete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
