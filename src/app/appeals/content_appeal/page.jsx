"use client";

import moment from "moment";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import useReport from "@/hooks/useReport";
import Modal from "@/components/common/modal";
import Loader from "@/components/common/loader";
import Pagination from "@/components/common/Pagination";
import useUserInfo from "@/hooks/useUser";

export default function Page() {
  const { getReportByUserId, isLoading } = useReport();
  const { getUserInformation, isError, data } = useUserInfo();

  const [currentPage, setCurrentPage] = useState(1);
  const [reportsData, setReportsData] = useState(null);
  const [reportSelected, setReportSelected] = useState(null);
  const [appealConclusion, setAppealConclusion] = useState("");
  const [showAppealModal, setAppealModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  const username = localStorage.getItem("username");

  const getUserId = async () => {
    const user = await getUserInformation(username);
    setUserId(user.id);
  };

  const fetchData = async (defaultReportSelectedId) => {
    const result = await getReportByUserId(userId, {
      page: currentPage,
    });

    let mappedValues = {
      ...result,
      data: result?.data?.map((report) => ({
        ...report,
        tipo: report.comentario
          ? "Comentario"
          : report.usuario_reportado
          ? "Usuario"
          : "Libro",
      })),
    };
    setReportsData(mappedValues);
    if (defaultReportSelectedId) {
      let item = mappedValues?.data?.find(
        (r) => r.id === defaultReportSelectedId
      );
      setReportSelected(item);
    } else if (mappedValues?.data?.length) {
      setReportSelected(mappedValues?.data[0]);
    }
  };

  const handleSubmitAppeal = async () => {
    let params = {
      id: reportSelected.id,
      email: userEmail,
      justificacion: appealConclusion,
    };

    console.log(params);

    //Verificar si ya hay una apelacion en proceso, si es asi no se puede enviar otra

    setAppealModal(false);
    setAppealConclusion("");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  const emailValidation = (email) => {
    // Tiene que tener 6 caracteres antes del @ y un punto despues del @
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="relative flex flex-col gap-9 px-20 py-9">
        {isLoading && <Loader />}
        <h1 className="font-bold text-gray-800 text-3xl leading-8">
          Bandeja de Sanciones
        </h1>
        <div className="flex gap-3">
          <div className="flex grow flex-col gap-3">
            <div className="flex flex-col items-center gap-3 border border-gray-300 rounded-md py-5 px-2">
              <h1 className="text-xl font-semibold">Lista de Sanciones</h1>
              <table className="w-full">
                <thead>
                  <tr className="h-14 border-b border-gray-200">
                    <th className="text-start font-semibold">Fecha</th>
                    <th className="text-start font-semibold">
                      Tipo de Contenido
                    </th>
                    <th className="text-start font-semibold">Categoría</th>
                    <th className="text-start font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsData?.data?.map((report, index) => (
                    <tr
                      key={index}
                      className={`h-14 hover:bg-green-100 cursor-pointer ${
                        report.id === reportSelected.id
                          ? "border-t border-t-gray-400 border-b-2 border-b-colorPrimario"
                          : "border-t border-gray-400"
                      }`}
                      onClick={() => setReportSelected(report)}
                    >
                      <td
                        className={`text-start font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {moment(report.created_at).format("DD-MM-YYYY")}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.tipo}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.categoria}
                      </td>
                      <td
                        className={`text-start font-normal capitalize ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.estado}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center">
                {Boolean(reportsData?.data?.length) && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={reportsData?.total_pages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-96 flex flex-col gap-6">
            {reportSelected ? (
              <>
                <div className="flex items-center">
                  <h2 className="font-bold text-gray-800 text-xl leading-7">
                    Detalles de la sanción
                  </h2>
                </div>
                <div className="border border-gray-300 rounded-md p-3 flex flex-col gap-3">
                  <span className="font-semibold text-lg">{`Sancion de tipo ${
                    reportSelected?.tipo ?? ""
                  }`}</span>
                  {Boolean(reportSelected?.titulo_de_libro?.length) && (
                    <div className="flex gap-1">
                      <span className="font-semibold">Libro:</span>
                      <span className="text-gray-700">
                        {reportSelected?.titulo_de_libro}
                      </span>
                    </div>
                  )}
                  {Boolean(reportSelected?.comentario) && (
                    <div className="flex gap-1">
                      <span className="font-semibold">Comentario:</span>
                      <span className="text-gray-700">
                        {reportSelected?.comentario?.comentario}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-1">
                    <span className="font-semibold">Estado:</span>
                    <span className="capitalize text-gray-700">
                      {reportSelected?.estado}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-colorPrimario pt-2">
                    <span className="font-semibold">Motivo:</span>
                    <p className="text-gray-700">{reportSelected?.motivo}</p>
                  </div>
                  {reportSelected?.estado === "resuelto" && (
                    <div className="flex flex-col gap-1 border-t border-colorPrimario pt-2">
                      <span className="font-semibold">Conclusiones:</span>
                      <p className="text-gray-700">
                        {reportSelected?.conclusion}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-white">
                  <div className="flex gap-2">
                    {reportSelected?.estado === "resuelto" && (
                      <button
                        className="h-10 rounded-md px-2 bg-red-900 hover:brightness-90"
                        onClick={() => setAppealModal(true)}
                      >
                        {reportSelected?.tipo === "Comentario"
                          ? "Apelar sanción"
                          : "Apelar sanción"}
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <span>No se ha seleccionado ninguna sanción</span>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={showAppealModal}
        size="md"
        variant="danger"
        onHide={() => {
          setAppealModal(false);
          setAppealConclusion("");
        }}
        disableSubmit={!appealConclusion.length}
        onSave={handleSubmitAppeal}
        title="Enviar Apelación"
      >
        <div className="flex flex-col gap-3">
          <p>
            {reportSelected?.tipo === "Comentario"
              ? `Enviar apelación sobre este comentario \"${reportSelected?.comentario?.comentario}\" del libro ${reportSelected?.titulo_de_libro}?`
              : `Enviar apleacion de este libro \"${reportSelected?.titulo_de_libro}\"?`}
          </p>

          <div className="flex flex-col gap-1">
            <span>
              Escribe la apleacion sobre esta sanción{" "}
              <b className="text-red-900">*</b>
            </span>
            <textarea
              className="text-md border rounded-lg p-3 flex-grow text-gray-900 border-gray-400 outline-none"
              value={appealConclusion}
              onChange={(event) => setAppealConclusion(event.target.value)}
              rows={2}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
