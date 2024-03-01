"use client";

import { useEffect, useState } from "react";
import styles from "./styles/favoritos.module.css";
import Cuadros from "./cuadros.js";
import axios from 'axios';
import useFavoritos from './hooks/useFavoritos';


const pagefavoritos = () => {
  const [filtro, setFiltro] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const {traerFavoritosPorUsuario, error, isLoading } = useFavoritos();
  const [datosCuadros, setDatosCuadros] = useState([
    { titulo: "Titulo 6", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
    { titulo: "Titulo 5", autor: "Autor 5", imagenUrl: "url_imagen_5.jpg" },
  ]);

  useEffect(() => {
    const cuadrosFiltrados = datosCuadros.filter(({ titulo, autor }) => {
      const lowerCaseTitulo = titulo.toLowerCase();
      const lowerCaseAutor = autor.toLowerCase();
      const lowerCaseFiltro = filtro.toLowerCase();

      return (
        lowerCaseTitulo.includes(lowerCaseFiltro) ||
        lowerCaseAutor.includes(lowerCaseFiltro)
      );
    });

    setDatosFiltrados(cuadrosFiltrados);
  }, [filtro, datosCuadros]);

  //Metodos get post put delete ... 
  useEffect(()=>{
    const obtenerUsuario = async() =>{
      try{
        const favoritos = await traerFavoritosPorUsuario(1);
        console.log("Favoritos con ID 1: ", favoritos);
      }catch(error){
        console.log("Se ha generado un error al tratar de obtener los usuarios ", error);
      }
    };
    obtenerUsuario();
  }, []);


  return (
    <div className={styles.contenedor_global}>
      <div className={styles.contenedor_principal}>
        <div className={styles.barra_principal}>
          <div>
            <h1 className={styles.titulo_favorito}>Mis Favoritos</h1>
          </div>
          <div>
            <div>
              <input
                className={styles.buscador}
                type="text"
                placeholder="Buscar en Favoritos"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className={styles.contenedor_padre_cuadros}>
          <div className={styles.contenedor_cuadros}>
            {filtro
              ? datosFiltrados.map(({ titulo, autor, imagenUrl }, index) => (
                  <Cuadros
                    key={index}
                    imageUrl={imagenUrl}
                    title={titulo}
                    author={autor}
                  />
                ))
              : datosCuadros.map(({ titulo, autor, imagenUrl }, index) => (
                  <Cuadros
                    key={index}
                    imageUrl={imagenUrl}
                    title={titulo}
                    author={autor}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default pagefavoritos;
