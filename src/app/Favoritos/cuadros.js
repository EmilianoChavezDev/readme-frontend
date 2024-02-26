import { useClient } from 'next/client';
import styles from "./styles/favoritos.module.css";


const cuadros = (key, imageurl, title, author) => {
  const [favorito, setFavorito] = useState(false);

  const fn_btnFavorite = () => {
    setFavorito(!favorito);
  };
  
  return (
    <>
      <div key={key} className={styles.contenedor_datos_cuadro}>
        <div className={styles.botonContainer} onClick={fn_btnFavorite}>
          <button className={styles.btnCorazonLleno}>
            <img src="/image/corazon_lleno.png" alt="Corazón lleno" />
          </button>
          <button className={styles.btnCorazonVacio} onClick={fn_btnFavorite}>
            <img src="/image/corazon_vacio.png" alt="Corazón vacio" />
          </button>
        </div>
        <div>
          <img src={imageurl}></img>
        </div>
        <div>
          <p className={styles.title}>{title}</p>
        </div>
        <div>
          <p className={styles.author}>{author}</p>
        </div>
      </div>
    </>
  );
};

export default cuadros;