"use client";

import useGetLibros from "@/hooks/useGetLibros";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function BackgroundBlogCard() {
  const [data, setData] = useState([]);
  const { getLibros } = useGetLibros();
  useEffect(()=>{
    getLibros({page:1})
  },[])
  

  return (
    <div className="container-fluid px-2 py-12 pb-28 m-28">
      <div className="mb-32">
        <h2 className="text-5xl font-semibold mb-4">Seguir Leyendo</h2>

        <div className="flex gap-16 overflow-x-auto">
          {[...Array(5)].map((_, index) => (
            <a
              key={index}
              href={`/libros/${index}`}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <Card
                shadow={false}
                className="relative grid h-[28rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                >
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
                <CardBody className="relative py-8 px-6 md:px-8"></CardBody>
              </Card>
            </a>
          ))}
        </div>
      </div>
      {/* Línea de sombreado */}
      <div className="border-t-2 border-gray-200 my-12"></div>
      <div>
        <h2 className="text-5xl font-semibold mb-4 ">Novedades</h2>
        <div className="flex gap-16 overflow-x-auto">
          {[...Array(5)].map((_, index) => (
            <a
              key={index + 5}
              href={`/libros/${index + 5}`}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <Card
                shadow={false}
                className="relative grid h-[28rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                >
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
                <CardBody className="relative py-8 px-6 md:px-8"></CardBody>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
