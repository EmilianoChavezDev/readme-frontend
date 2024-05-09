"use client";

import moment from "moment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import useReport from "@/hooks/useReport";
import useUnbanAccount from "@/hooks/useUnbanAccount";
import Modal from "@/components/common/modal";
import Loader from "@/components/common/loader";
import Pagination from "@/components/common/Pagination";

export default function Page() {
  const STATUS = {
    pendiente: { key: "pendiente", value: "Pendiente" },
    en_revision: { key: "en_revision", value: "En Revisión" },
    solicitado: { key: "solicitado", value: "Solicitado" },
    aceptado: { key: "aceptado", value: "Aceptado" },
    rechazado: { key: "rechazado", value: "Rechazado" },
    resuelto: { key: "resuelto", value: "Resuelto" },
  };

  const router = useRouter();
  const { getUnbanAccount, restoreAccount, rejectAppeal, error } =
    useUnbanAccount();
  const { updateBookReport, updateCommentReport, updateUserReport, isLoading } =
    useReport();

  const [currentPage, setCurrentPage] = useState(1);
  const [reportsData, setReportsData] = useState(null);
  const [statusToSearch, setStatusToSearch] = useState("");
  const [reportSelected, setReportSelected] = useState(null);
  const [reportConclusion, setReportConclusion] = useState("");
  const [showReportRejectModal, setShowReportRejectModal] = useState(false);
  const [showReportApproveModal, setShowReportApproveModal] = useState(false);

  const fetchData = async (defaultReportSelectedId) => {
    const result = await getUnbanAccount({
      page: currentPage,
      estado: statusToSearch,
    });
    let mappedValues = {
      data: result?.solicitudes_desbaneo,
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

  const handleReloadListValues = (report) => {
    let listCopy = [...reportsData.data];
    let itemIndex = listCopy.findIndex((r) => r.id === reportSelected.id);
    let itemCopy = {
      ...listCopy[itemIndex],
      estado: report?.estado,
      conclusion: report.conclusion,
    };
    listCopy[itemIndex] = { ...itemCopy };
    setReportsData({ ...reportsData, data: listCopy });
    setReportSelected(itemCopy);
  };

  const handleUpdateReportStatus = async (estado) => {
    const result =
      reportSelected.tipo === "Usuario"
        ? await updateUserReport(reportSelected.id, { reporte: { estado } })
        : reportSelected.tipo === "Comentario"
        ? await updateCommentReport(reportSelected.id, { reporte: { estado } })
        : await updateBookReport(reportSelected.id, { reporte: { estado } });
    if (result?.reporte) {
      handleReloadListValues(result?.reporte);
    } else {
      toast.error("No se pudo actualizar el estado");
    }
  };

  const handleApproveReport = async () => {
    const result = await restoreAccount(reportSelected?.id);
    if (result?.error) {
      toast.error("No se pudo aceptar la solucitud");
    } else {
      toast.success("Solicitud aceptada con éxito");
    }
    setShowReportApproveModal(false);
    fetchData(reportSelected?.id);
  };

  const handleRejectAccount = async () => {
    await rejectAppeal(reportSelected?.id);
    if (result?.error) {
      toast.error("No se pudo rechazar el reporte");
    } else {
      const userResult = await rejectAppeal(reportSelected?.id);
      !userResult && toast.error("No se pudo rezachar la solicitud");
      fetchData(reportSelected?.id);
    }
    setShowReportApproveModal(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [statusToSearch, currentPage]);

  useEffect(() => {
    if (localStorage.getItem("role") !== "administrador") {
      toast.error("Usuario no autorizado");
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="relative flex flex-col gap-9 px-20 py-9">
        {isLoading && <Loader />}
        <h1 className="font-bold text-gray-800 text-3xl leading-8">
          Bandeja de Reportes
        </h1>
        <div className="flex gap-3">
          <div className="flex grow flex-col gap-3">
            <div className="flex justify-between">
              <form className="flex gap-3">
                <div className="relative !max-w-32">
                  <Select
                    label="Estado"
                    className="my-react-select-container !max-w-40"
                    classNamePrefix="my-react-select"
                    containerProps={{ className: "!min-w-40 !max-w-40" }}
                    labelProps={{ className: "!max-w-40" }}
                    value={statusToSearch}
                    onChange={(value) => {
                      setStatusToSearch(value);
                      setCurrentPage(1);
                    }}
                  >
                    {[
                      { key: "", value: "Todos" },
                      ...Object.values(STATUS),
                    ]?.map((state, index) => (
                      <Option key={index} className="min-h-9" value={state.key}>
                        {state.value}
                      </Option>
                    ))}
                  </Select>
                </div>
              </form>
            </div>
            <div className="flex flex-col items-center gap-3 border border-gray-300 rounded-md py-5 px-2">
              <h1 className="text-xl font-semibold">Lista de Reportes</h1>
              <table className="w-full">
                <thead>
                  <tr className="h-14 border-b border-gray-200">
                    <th className="text-start font-semibold">Nombre</th>
                    <th className="text-start font-semibold">Username</th>
                    <th className="text-start font-semibold">
                      Cantidad de reportes
                    </th>
                    <th className="text-start font-semibold">Baneado por</th>
                    <th className="text-start font-semibold">Estado</th>
                    <th className="text-start font-semibold">
                      Baneado en Fecha
                    </th>
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
                        {report.nombre}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.username}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.cantidad_reportes}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.moderador_username}
                      </td>
                      <td
                        className={`text-start font-normal capitalize ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {STATUS[report.estado]?.value}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {moment(report.created_at).format("DD-MM-YYYY")}
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
                    Detalle del Reporte
                  </h2>
                </div>
                <div className="border border-gray-300 rounded-md p-3 flex flex-col gap-3">
                  {Boolean(reportSelected?.username) && (
                    <div className="flex gap-1">
                      <span className="font-semibold">Usuario Reportado:</span>
                      <span className="text-gray-700">
                        {reportSelected?.username}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-1">
                    <span className="font-semibold">Estado:</span>
                    <span className="capitalize text-gray-700">
                      {reportSelected?.estado}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-semibold">Baneado en Fecha:</span>
                    <span className="capitalize text-gray-700">
                      {moment(reportSelected?.created_at).format("DD-MM-YYYY")}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-semibold">Baneado por:</span>
                    <span className="capitalize text-gray-700">
                      {reportSelected?.moderador_username}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-colorPrimario pt-2">
                    <span className="font-semibold">Justificacion:</span>
                    <p className="text-gray-700">
                      {reportSelected?.justificacion}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-white">
                  <div className="flex gap-2">
                    {reportSelected?.estado !== "aceptado" && (
                      <button
                        className="h-10 rounded-md px-2 bg-red-900 hover:brightness-90"
                        onClick={() => setShowReportApproveModal(true)}
                      >
                        Deshacer Baneo
                      </button>
                    )}
                    {reportSelected?.estado === "pendiente" && (
                      <button
                        className="h-10 rounded-md px-2 bg-cyan-700 hover:brightness-90"
                        onClick={() => setShowReportRejectModal(true)}
                      >
                        Rechazar
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <span>No se ha seleccionado ningún reporte</span>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={showReportRejectModal}
        onHide={() => {
          setShowReportRejectModal(false);
          setReportConclusion("");
        }}
        onSave={handleRejectAccount}
        disableSubmit={!reportConclusion.length}
        title="Confirmar Acción"
      >
        <div className="flex flex-col gap-3">
          <p>¿Estás seguro de rechazar esta solicitud?</p>
          <div className="flex flex-col gap-1">
            <span>
              Escribe la conclusión sobre este reporte{" "}
              <b className="text-red-900">*</b>
            </span>
            <textarea
              className="text-md border rounded-lg p-3 flex-grow text-gray-900 border-gray-400 outline-none"
              value={reportConclusion}
              onChange={(event) => setReportConclusion(event.target.value)}
              rows={2}
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={showReportApproveModal}
        size="md"
        variant="danger"
        onHide={() => {
          setShowReportApproveModal(false);
          setReportConclusion("");
        }}
        disableSubmit={!reportConclusion.length}
        onSave={handleApproveReport}
        title="Confirmar Acción"
      >
        <div className="flex flex-col gap-3">
          <p>
            ¿Estás seguro de desbanear a{" "}
            <b className="text-colorPrimario">{reportSelected?.username}</b>?{" "}
          </p>
          <div className="flex flex-col gap-1">
            <span>
              Escribe la conclusión sobre esta solicitud{" "}
              <b className="text-red-900">*</b>
            </span>
            <textarea
              className="text-md border rounded-lg p-3 flex-grow text-gray-900 border-gray-400 outline-none"
              value={reportConclusion}
              onChange={(event) => setReportConclusion(event.target.value)}
              rows={2}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
