"use client";

import NavBar from "@/components/NavBar";
import { useUser } from "@/contexts/UserProvider";
import useGetLibros from "@/hooks/useGetLibros";
import useGetLibrosLeidos from "@/hooks/useGetLibrosLeidos";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BackgroundBlogCard() {
  const { getLibros, data: libros } = useGetLibros(); // Obtener la función para obtener libros y los datos de libros
  const { getLibrosLeidos, data: librosLeidos } = useGetLibrosLeidos(); // Obtener la función para obtener libros leidos y los datos de libros leidos
  const { token } = useUser(); // Obtener el token del usuario
  const [loading, setLoading] = useState(true); // Estado para controlar si se está cargando

  useEffect(() => {
    // Efecto para cargar libros cuando se monta el componente y se tiene un token
    if (token) {
      getLibrosLeidos({ page: 1 }); // Obtener libros leidos
      getLibros({ page: 1 }); // Obtener libros
      setLoading(false); // Establecer loading en false cuando se obtienen los libros
    }
  }, [token]); // Se ejecuta cuando el token cambia

  if (loading) {
    // Si aún se está cargando, muestra un indicador de carga
    return <div>Cargando...</div>;
  }

  // Una vez que se cargan los libros, renderiza el contenido del componente

  return (
    <>
      <NavBar />
      <div className="container-fluid p-12 h-full">
        <div className="mb-32">
          <h2 className="text-4xl font-semibold mb-4">Seguir Leyendo</h2>
          <div>
            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-20 shadow-[0_19px_10px_-19px_rgba(0,0,0,0.3)]">
              {librosLeidos.slice(0, 6).map((libro) => (
                <div key={libro.id} className="flex justify-center">
                  <Link
                    href={`/books/${libro.id}`}
                    className="flex justify-center w-auto h-auto"
                  >
                    <Card
                      shadow={false}
                      className="relative grid w-customWidth h-customHeight items-end justify-center overflow-hidden text-center"
                    >
                      <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                      >
                        <Image
                          src={
                            libro?.portada.length
                              ? libro.portada
                              : "/image/template_libro.png"
                          }
                          alt={`Portada del libro "${libro.titulo}"`}
                          width={250}
                          height={350}
                          className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                        />
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                      </CardHeader>
                      <CardBody className="relative py-8 px-6 md:px-8">
                        <Typography
                          variant="h5"
                          color="white"
                          className="mb-6 font-medium leading-[1.5]"
                        >
                          {libro.titulo}
                        </Typography>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="my-12"></div>
          <h2 className="text-4xl font-semibold mb-4 ">Novedades</h2>

          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {libros?.data?.slice(0, 6).map((libro) => (
              <div key={libro.id} className="flex justify-center">
                <Link
                  href={`/books/${libro.id}`}
                  className="flex justify-center w-auto h-auto"
                >
                  <Card
                    shadow={false}
                    className="relative grid w-customWidth h-customHeight items-end justify-center overflow-hidden text-center"
                  >
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
                    >
                      <Image
                        src={
                          libro?.portada.length
                            ? libro.portada
                            : "/image/template_libro.png"
                        }
                        alt={`Portada del libro "${libro.titulo}"`}
                        width={200}
                        height={350}
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                      />
                      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative py-8 px-6 md:px-8">
                      <Typography
                        variant="h5"
                        color="white"
                        className="mb-6 font-medium leading-[1.5]"
                      >
                        {libro.titulo}
                      </Typography>
                    </CardBody>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
