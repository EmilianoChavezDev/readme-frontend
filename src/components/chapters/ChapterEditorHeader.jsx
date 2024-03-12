import Link from "next/link";
import { FaAngleLeft, FaChevronDown } from "react-icons/fa6";


const ChapterEditorHeader = ({ bookId, onSubmitPDF, onSave, onPublish, chapterTitle}) => {
    return (
        <div className="bg-ChaptearHeader h-20 flex flex-row justify-between items-center px-4 drop-shadow-lg sticky top-0 z-50">
            <div className="text-white font-semibold text-lg flex items-center">
                <Link href={`/books/${bookId}`}>
                    <FaAngleLeft className="text-2xl" />
                </Link>
                <h3 className="px-4 truncate max-w-96">{chapterTitle}</h3>
                <FaChevronDown className="text-2xl hover:cursor-pointer" />
            </div>
            <div className="flex gap-4">
                <button
                    onClick={onSubmitPDF}
                    className={`bg-gray-600 text-white py-2 px-7 rounded-lg`}
                >
                    Subir PDF
                </button>
                <button
                    onClick={onSave}
                    className={`bg-gray-600 text-white py-2 px-7 rounded-lg `}
                >
                    Guardar
                </button>
                <button
                    onClick={onPublish}
                    className={`bg-cyan-800 text-white py-2 px-7 rounded-lg`}
                >
                    Publicar
                </button>

            </div>
        </div>
    )
}

export default ChapterEditorHeader