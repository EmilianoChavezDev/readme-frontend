'use client'
import styles from "../app/favorites/styles/favorites.module.css";

const NotFound = () =>{
    return(
        <>
            <div className={styles.notfound}>
                <img src="/image/libronoencontrado.png" alt="no encontrado" />
            </div>
        </>
    );
}

export default NotFound;