"use client";

import NavBar from "@/components/NavBar";
import Loader from "@/components/common/loader";
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
import { useEffect } from "react";

export default function BackgroundBlogCard() {
  const { getLibros, data: libros, isLoading } = useGetLibros(); // Obtener la función para obtener libros y los datos de libros
  const { getLibrosLeidos, data: librosLeidos } = useGetLibrosLeidos(); // Obtener la función para obtener libros leidos y los datos de libros leidos
  const { token } = useUser(); // Obtener el token del usuario

  useEffect(() => {
    // Efecto para cargar libros cuando se monta el componente y se tiene un token
    if (token) {
      getLibrosLeidos({ page: 1 }); // Obtener libros leidos
      getLibros({ page: 1 }); // Obtener libros
    }
  }, [token]); // Se ejecuta cuando el token cambia

  // Una vez que se cargan los libros, renderiza el contenido del componente

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="sticky top-0 z-50">
            <NavBar />
          </div>
          <div className="container-fluid h-full">
            <div className="mb-32">
              {librosLeidos.length > 0 && (
                <>
                  <h2 className="text-3xl text-center pt-8 px-8 _sm:text-left font-bold mb-4">
                    Seguir Leyendo
                  </h2>
                  <div className="grid gap-8 grid-cols-1 _sm:grid-cols-2 _md:grid-cols-3 _lg:grid-cols-4 _xl:grid-cols-5 px-8 pb-20 shadow-lg">
                    {librosLeidos.map((libro) => (
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
                </>
              )}

              <div className="my-12"></div>
              <h2 className="text-3xl text-center px-8 _sm:text-left font-bold mb-4 ">
                Novedades
              </h2>

              <div className="grid gap-8 grid-cols-1 _sm:grid-cols-2 _md:grid-cols-3 _lg:grid-cols-4 _xl:grid-cols-5 px-8">
                {libros?.data?.slice(0, 10).map((libro) => (
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
      )}
    </>
  );
}