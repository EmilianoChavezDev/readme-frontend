import { useEffect, useState } from "react";
import Image from "next/image";

//Renderiza la imagen del libro para ver el preview
export default function RenderImage({ inputContainerRef }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    //Si inputContainerRef es un archivo, se lee el archivo y se muestra la imagen
    if (inputContainerRef && inputContainerRef instanceof File) {
      //Se lee el archivo
      const reader = new FileReader();

      //Se muestra la imagen
      reader.onload = () => {
        setImageUrl(reader.result);
      };

      // Se lee el archivo como una URL
      reader.readAsDataURL(inputContainerRef);
    } else {
      //Si no es un archivo, se muestra la imagen por defecto
      setImageUrl("/image/portada.png");
    }
  }, [inputContainerRef]);

  //Retorna la imagen
  return (
    <>
      {imageUrl && (
        <Image
          id="gifImage"
          src={imageUrl}
          alt="Imagen del libro"
          width={400}
          height={0}
          className="max-h-96"
        />
      )}
    </>
  );
}
