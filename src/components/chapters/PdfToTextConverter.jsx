import { PdfReader } from "pdfreader";

const convertirPDFaTexto = async (archivoPDF) => {
  const buffer = await archivoPDF.arrayBuffer();
  const texto = [];
  const reader = new PdfReader();
  reader.parseBuffer(buffer, function (err, item) {
    if (err) {
      console.error(err);
    } else if (!item) {
      console.log("Fin del archivo");
    } else if (item.text) {
      texto.push(item.text);
    }
  });
  return texto.join("\n");
};

export default convertirPDFaTexto;
