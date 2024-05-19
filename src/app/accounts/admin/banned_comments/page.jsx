"use client";

import moment from "moment";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Modal from "@/components/common/modal";
import Loader from "@/components/common/loader";
import Pagination from "@/components/common/Pagination";
import { Tooltip, Option, Select, Input } from "@material-tailwind/react";
import useContentAppeal from "@/hooks/useContentAppeal";
import { debounce } from "lodash";

export default function Page() {
  const STATUS = {
    solicidato: { key: "solicitado", value: "Solicitado" },
    aceptado: { key: "aceptado", value: "Aceptado" },
    rechazado: { key: "rechazado", value: "Rechazado" },
  };

  const {
    getAllAppeals,
    postAcceptAppeal,
    postRejectAppeal,
    error,
    errorResponse,
    isLoading,
  } = useContentAppeal();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isRejectSuccess, setIsRejectSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsData, setReportsData] = useState(null);
  const [reportSelected, setReportSelected] = useState(null);
  const [showAppealModal, setAppealModal] = useState(false);
  const [showRejectModal, setRejectModal] = useState(false);

  // Filtros
  const [statusToSearch, setStatusToSearch] = useState("");
  const [usernameToSearch, setUsernameToSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const user_id = localStorage.getItem("user_id");

  const fetchData = async (defaultReportSelectedId) => {
    const result = await getAllAppeals({
      page: currentPage,
      estado: statusToSearch,
      username: usernameToSearch,
      fecha_desde: dateFrom ? moment(dateFrom).toISOString() : null,
      fecha_hasta: dateTo ? moment(dateTo).toISOString() : null,
      tipo: "comentario",
    });

    let mappedValues = {
      total_pages: result.total_pages,
      data: result.solicitudes.map((report) => ({
        ...report,
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

  // Recargamos ese reporte seleccionado para actualizar su estado
  const handleReloadListValues = (report) => {
    let listCopy = [...reportsData.data];
    let itemIndex = listCopy.findIndex((r) => r.id === reportSelected.id);

    let itemCopy = {
      ...listCopy[itemIndex],
      estado: report,
    };

    listCopy[itemIndex] = { ...itemCopy };
    setReportsData({ ...reportsData, data: listCopy });

    setReportSelected({ ...itemCopy });
  };

  const handleSubmitAppeal = async () => {
    await postAcceptAppeal(reportSelected.id);

    setIsSuccess(true);
    setAppealModal(false);
  };

  const handleRejectAppeal = async () => {
    await postRejectAppeal(reportSelected.id);

    setIsRejectSuccess(true);
    setAppealModal(false);
  };

  const delayedFetchData = debounce(() => {
    fetchData();
  }, 400);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [currentPage, user_id]);

  useEffect(() => {
    delayedFetchData();

    return delayedFetchData.cancel;
  }, [currentPage, user_id, statusToSearch, usernameToSearch]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !isLoading) {
      if (error) {
        toast.error(errorResponse?.error);
        setAppealModal(false);
        setRejectModal(false);
      } else if (isSuccess) {
        toast.success("Sanción revocada con éxito");
        handleReloadListValues("aceptado");
        setAppealModal(false);
        setIsSuccess(false);
      } else if (isRejectSuccess) {
        toast.success("Apelación rechazada con éxito");
        handleReloadListValues("rechazado");
        setIsRejectSuccess(false);
        setRejectModal(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [error, errorResponse, isLoading, isSuccess]);

  return (
    <>
      <div className="relative flex flex-col gap-9 px-20 py-9">
        {isLoading && <Loader />}

        <div className="flex gap-3">
          <div className="flex grow flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-3">
                <form className="flex gap-3 pr-8">
                  <div className="relative !max-w-32">
                    <Select
                      label="Estado"
                      className="my-react-select-container !max-w-40"
                      classnameprefix="my-react-select"
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
                        <Option
                          key={index}
                          className="min-h-9"
                          value={state.key}
                        >
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
                      onChange={(e) =>
                        setDateFrom(moment(e.target.value).toISOString())
                      }
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
                      onChange={(e) =>
                        setDateTo(moment(e.target.value).toISOString())
                      }
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 border border-gray-300 rounded-md py-5 px-2">
              <h1 className="text-xl font-semibold">
                LISTA DE COMENTARIOS BANEADOS
              </h1>
              <table className="w-full">
                <thead>
                  <tr className="h-14 border-b border-gray-200">
                    <th className="text-center font-semibold">
                      Nombre del Libro
                    </th>
                    <th className="text-center font-semibold">
                      Autor del comentario
                    </th>
                    <th className="text-center font-semibold">
                      Cantidad de Reportes
                    </th>
                    <th className="text-center font-semibold">Baneado Por</th>
                    <th className="text-center font-semibold">Estado</th>
                    <th className="text-center font-semibold">
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
                      } `}
                      onClick={() => setReportSelected(report)}
                    >
                      <td
                        className={`text-start font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.libro}
                      </td>

                      <td
                        className={`text-center font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.username}
                      </td>

                      <td
                        className={`font-normal text-center  ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.cantidad_reportes}
                      </td>

                      <td
                        className={`text-center font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.baneado_por}
                      </td>

                      <td
                        className={`text-center font-normal capitalize ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {report.estado}
                      </td>

                      <td
                        className={`text-center font-normal ${
                          report.id === reportSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {moment(report.fecha_de_baneo).format("DD-MM-YYYY")}
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
                    DETALLES DEL REPORTE
                  </h2>
                </div>
                <div className="border border-gray-300 rounded-md p-3 flex flex-col gap-3 py-5">
                  {Boolean(reportSelected?.libro?.length) && (
                    <div className="flex gap-1">
                      <span className="text-colorPrimario font-bold truncate">
                        <Tooltip content={reportSelected.libro}>
                          {reportSelected?.libro}
                        </Tooltip>
                      </span>
                    </div>
                  )}
                  <div className="flex gap-1">
                    <span className="font-semibold">Autor del Comentario:</span>
                    <span className="capitalize text-gray-700">
                      {reportSelected?.username}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    <span className="font-semibold">Baneado en Fecha:</span>
                    <span className="capitalize text-gray-700">
                      {moment(reportSelected?.fecha_de_baneo).format(
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    <span className="font-semibold">Baneado por:</span>
                    <span className="capitalize text-gray-700">
                      {reportSelected?.baneado_por}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-colorPrimario pt-2">
                    <span className="font-semibold">Comentario:</span>
                    <p className="text-gray-700">
                      {reportSelected?.comentario}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-colorPrimario pt-2">
                    <span className="font-semibold">Motivo del reporte:</span>
                    <p className="text-gray-700 truncate">
                      <Tooltip content={reportSelected.motivo}>
                        {reportSelected?.motivo}
                      </Tooltip>
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-colorPrimario pt-2">
                    <span className="font-semibold">Conclusiones:</span>
                    <p className="text-gray-700">
                      {reportSelected?.conclusion}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-colorPrimario pt-2">
                    <span className="font-semibold">
                      Justificacion de la apelacion:
                    </span>
                    <p className="text-gray-700 truncate">
                      <Tooltip content={reportSelected.justificacion}>
                        {reportSelected?.justificacion}
                      </Tooltip>
                    </p>
                  </div>
                </div>
                {reportSelected?.estado !== "aceptado" &&
                  reportSelected?.estado !== "rechazado" && (
                    <div className="flex justify-between text-white">
                      <div className="flex gap-2 _md:px-2">
                        <button
                          className="h-10 _md:h-12 rounded-md px-2 bg-colorPrimario hover:brightness-90"
                          onClick={() => setAppealModal(true)}
                        >
                          Deshacer Baneo
                        </button>
                      </div>
                      <div>
                        <button
                          className="h-10 _md:h-12 rounded-md px-2 bg-red-900 hover:brightness-90"
                          onClick={() => setRejectModal(true)}
                        >
                          Rechazar apelación
                        </button>
                      </div>
                    </div>
                  )}
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
        }}
        onSave={handleSubmitAppeal}
        title="Deshacer Baneo"
      >
        <div className="flex flex-col gap-3">
          <p>
            {`Aceptar apleacion de este comentario \"${reportSelected?.comentario}\", del libro  \"${reportSelected?.libro}\" ?`}
          </p>
        </div>
      </Modal>

      <Modal
        open={showRejectModal}
        size="md"
        variant="danger"
        onHide={() => {
          setRejectModal(false);
        }}
        onSave={handleRejectAppeal}
        title="Rechazar Apelación"
      >
        <div className="flex flex-col gap-3">
          <p>
            {`Rechazar la apleacion de este libro \"${reportSelected?.comentario}\", del libro  \"${reportSelected?.libro}\" ?`}
          </p>
        </div>
      </Modal>
    </>
  );
}
