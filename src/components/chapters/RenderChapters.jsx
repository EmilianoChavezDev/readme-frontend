import useChapter from "@/hooks/useChapter";
import { useSortable } from "@dnd-kit/sortable";
import { Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

export default function RenderCapitules({ cap, bookId }) {
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
    // Cargar los capítulos inicialmente
    loadChapters();
  }, []);

  const loadChapters = async () => {
    // Cargar los capítulos desde la fuente de datos
    try {
      const loadedChapters = await fetchChaptersFromAPI();
      setChapters(loadedChapters);
    } catch (error) {
      console.error("Error al cargar los capítulos:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteChapter(cap.id);
      toast.success("Tu capítulo se movió a la papelera de reciclaje.");
      loadChapters();
    } catch (error) {
      toast.error("Ocurrió un error al eliminar el capítulo.");
    }
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
        <Link href={`/books/${bookId}/chapters/write/${cap.id}`}>
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
