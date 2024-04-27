import { useSortable } from "@dnd-kit/sortable";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { Tooltip } from "@material-tailwind/react";

export default function RenderCapitules({ cap, bookId }) {
  //Obtenemos los atributos, listeners, setNodeRef, transform y transition
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: cap.id,
    });

  //Estilos para el drag and drop
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "",
    transition,
  };

  return (
    <div
      className="flex justify-between items-center py-2 px-2 relative"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {/* Mostramos el titulo, si es muy largo se muestra con el Tooltip */}
      <Tooltip content={cap.titulo}>
        <Link
          href={`/books/${bookId}/chapters/write/${cap.id}`}
          className="dark:no-underline"
        >
          <p className="text-sm font-semibold w-24 truncate">{cap.titulo}</p>
        </Link>
      </Tooltip>

      {/* Agregamos un check si esta publicado */}
      {cap.publicado ? (
        <div className="flex items-center pr-4">
          <div className="bg-green-400 h-3 w-3 rounded-full"></div>
          <p className="text-xs ml-2">Publicado</p>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="bg-red-400 h-3 w-3 rounded-full"></div>
          <p className="text-xs ml-2">No publicado</p>
        </div>
      )}

      <BsThreeDotsVertical />
      <hr className="w-full border-gray-400 absolute bottom-0 left-0" />
    </div>
  );
}
