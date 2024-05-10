import useChapter from "@/hooks/useChapter";
import { useSortable } from "@dnd-kit/sortable";
import { Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

export default function RenderCapitules({ cap, bookId, setChapterDeleted }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: cap.id,
    });

  const { deleteChapter } = useChapter();

  const [chapters, setChapters] = useState([]);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "",
    transition,
  };

  useEffect(() => {
    setChapters((prevChapters) =>
      prevChapters.filter((ch) => ch.id !== cap.id)
    );
  }, [cap]);

  useEffect(() => {}, [cap]);

  const handleDelete = async () => {
    await deleteChapter(cap.id);
    toast.success("Tu capitulo se movio a la papelera de reciclaje.");

    // Actualizar el componente con Boolean despues de eliminar el capitulo
    setChapters((prevChapters) =>
      prevChapters.filter((ch) => ch.id !== cap.id)
    );

    setChapterDeleted(true);
  };

  return (
    <div
      className="flex justify-between items-center py-2 px-2 relative"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <Tooltip content={cap.titulo}>
        <Link
          href={`/books/${bookId}/chapters/write/${cap.id}`}
          className="dark:no-underline"
        >
          <p className="text-sm font-semibold w-24 truncate">{cap.titulo}</p>
        </Link>
      </Tooltip>

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

      {/* Botón de eliminar */}
      <div>
        <button onClick={handleDelete} className="focus:outline-none">
          <BsTrash />
        </button>
      </div>

      <hr className="w-full border-gray-400 absolute bottom-0 left-0" />
    </div>
  );
}
