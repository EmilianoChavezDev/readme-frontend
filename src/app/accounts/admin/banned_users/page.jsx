"use client";

import moment from "moment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Option, Select, Input } from "@material-tailwind/react";
import useUnbanAccount from "@/hooks/useUnbanAccount";
import Modal from "@/components/common/modal";
import Loader from "@/components/common/loader";
import Pagination from "@/components/common/Pagination";
import { debounce } from "lodash";

export default function Page() {
  const STATUS = {
    solicitado: { key: "solicitado", value: "Solicitado" },
    aceptado: { key: "aceptado", value: "Aceptado" },
    rechazado: { key: "rechazado", value: "Rechazado" },
  };

  const router = useRouter();
  const { getUnbanAccount, restoreAccount, rejectAppeal, isLoading } =
    useUnbanAccount();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reportsData, setReportsData] = useState(null);
  const [statusToSearch, setStatusToSearch] = useState("");
  const [usernameToSearch, setUsernameToSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reportSelected, setReportSelected] = useState(null);
  const [showReportRejectModal, setShowReportRejectModal] = useState(false);
  const [showReportApproveModal, setShowReportApproveModal] = useState(false);

  const fetchData = async (defaultReportSelectedId) => {
    const result = await getUnbanAccount({
      page: currentPage,
      estado: statusToSearch,
      username: usernameToSearch,
      fecha_desde: dateFrom ? moment(dateFrom).toISOString("YYYY-MM-DD") : null,
      fecha_hasta: dateTo
        ? moment(dateTo).endOf("day").toISOString("YYYY-MM-DD")
        : null,
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
    setTotalPages(result?.total_pages);
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
    const result = await rejectAppeal(reportSelected?.id);
    if (result?.error) {
      toast.error("No se pudo rechazar la solucitud");
    } else {
      toast.success("Solicitud rechazada con éxito");
    }
    setShowReportRejectModal(false);
    fetchData(reportSelected?.id);
  };

  const delayedFetchData = debounce(() => {
    fetchData();
  }, 400);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [statusToSearch, currentPage, usernameToSearch, dateFrom, dateTo]);

  useEffect(() => {
    delayedFetchData();

    return delayedFetchData.cancel;
  }, [currentPage, statusToSearch, usernameToSearch]);

  let userRole = localStorage.getItem("role");
  useEffect(() => {
    if (userRole === "usuario") {
      toast.error("Usuario no autorizado");
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="relative flex flex-col gap-9 px-20 py-9">
        {isLoading && <Loader />}
        <div className="flex gap-3">
          <div className="flex grow flex-col gap-3">
            <div className="flex flex-row gap-3">
              <form className="flex gap-3 pr-8">
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

              <form className="flex gap-3">
                <div className="relative">
                  {/* Buscar usuario con matherial tailwind input */}
                  <Input
                    type="text"
                    placeholder="Buscar por usuario"
                    value={usernameToSearch}
                    onChange={(e) => setUsernameToSearch(e.target.value)}
                    containerProps={{ className: "!min-w-40 !max-w-40" }}
                    labelProps={{ className: "!max-w-40" }}
                    label="Username"
                  />
                </div>
              </form>

              <form className="flex gap-3">
                {/* Feche desde */}
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Fecha desde"
                    value={dateFrom}
                    containerProps={{ className: "!min-w-40 !max-w-40" }}
                    labelProps={{ className: "!max-w-40" }}
                    label="Fecha desde"
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
              </form>

              <form className="flex gap-3">
                {/* Feche hastas */}
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Fecha hasta"
                    value={dateTo}
                    containerProps={{ className: "!min-w-40 !max-w-40" }}
                    labelProps={{ className: "!max-w-40" }}
                    label="Fecha hasta"
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col items-center gap-3 border border-gray-300 rounded-md py-5 px-2">
              <h1 className="text-xl font-semibold">
                Lista de Usuarios baneados
              </h1>
              <table className="w-full">
                <thead>
                  <tr className="h-14 border-b border-gray-200">
                    <th className="text-start font-semibold">Email</th>
                    <th className="text-start font-semibold">Username</th>
                    <th className="text-start font-semibold">
                      Cantidad de reportes
                    </th>
                    <th className="text-center font-semibold">Baneado por</th>
                    <th className="text-start font-semibold">Estado</th>
                    <th className="text-start font-semibold">
                      Baneado en Fecha
                    </th>
                    <th className="text-center font-semibold">
                      Creado en Fecha
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
                        {report.email}
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
                        className={`text-center font-normal ${
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

                      <td
                        className={`text-center font-normal ${
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
                    totalPages={totalPages}
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
                  <div className="flex gap-1">
                    <span className="font-semibold">Justificación:</span>
                    <span className="text-gray-700">
                      {reportSelected?.justificacion}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-colorPrimario pt-2">
                    <span className="font-semibold">Conclusion:</span>
                    <p className="text-gray-700">
                      {reportSelected?.conclusion}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-white">
                  <div className="flex gap-2">
                    {reportSelected?.estado === "solicitado" && (
                      <button
                        className="h-10 rounded-md px-2 bg-red-900 hover:brightness-90"
                        onClick={() => setShowReportRejectModal(true)}
                      >
                        Rechazar
                      </button>
                    )}
                    {reportSelected?.estado !== "aceptado" && (
                      <button
                        className="h-10 rounded-md px-2 bg-cyan-700 hover:brightness-90"
                        onClick={() => setShowReportApproveModal(true)}
                      >
                        Deshacer Baneo
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
        size="md"
        variant="danger"
        onHide={() => {
          setShowReportRejectModal(false);
        }}
        onSave={handleRejectAccount}
        title="Confirmar Acción"
      >
        <div className="flex flex-col gap-3">
          <p>
            ¿Estás seguro de rechazar la solicitud de{" "}
            <b className="text-colorPrimario">{reportSelected?.username}</b>?{" "}
          </p>
        </div>
      </Modal>
      <Modal
        open={showReportApproveModal}
        onHide={() => {
          setShowReportApproveModal(false);
        }}
        onSave={handleApproveReport}
        title="Confirmar Acción"
      >
        <div className="flex flex-col gap-3">
          <p>
            ¿Estás seguro de desbanear a{" "}
            <b className="text-colorPrimario">{reportSelected?.username}</b>?{" "}
          </p>
        </div>
      </Modal>
    </>
  );
}
