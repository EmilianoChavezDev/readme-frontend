import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@/styles/chapters/styles.css";

const toolbarOptions = [
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike"],
  [{ align: [] }],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ direction: "rtl" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
];

const Editor = ({ chapterContent, onChange }) => {
  return (
    <div className={`editor-container mt-10 px-10 md:px-52`}>
      <ReactQuill
        value={chapterContent}
        onChange={onChange}
        placeholder="Escriba su capitulo aqui..."
        theme="snow"
        modules={{
          toolbar: toolbarOptions,
        }}
      />
    </div>
  );
};

export default Editor;
