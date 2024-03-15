import { useSortable } from "@dnd-kit/sortable";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";

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
      <Link href={`/books/${bookId}/chapters/write/${cap.id}`}>
        <p className="text-sm font-semibold">{cap.titulo}</p>
      </Link>
      <BsThreeDotsVertical />
      <hr className="w-full border-gray-400 absolute bottom-0 left-0" />
    </div>
  );
}
