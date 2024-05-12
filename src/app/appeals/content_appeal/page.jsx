"use client";

import moment from "moment";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useReport from "@/hooks/useReport";
import Modal from "@/components/common/modal";
import Loader from "@/components/common/loader";
import Pagination from "@/components/common/Pagination";
import { Tooltip, Select, Option } from "@material-tailwind/react";
import useContentAppeal from "@/hooks/useContentAppeal";
import Link from "next/link";
import { VscChevronRight } from "react-icons/vsc";
import { debounce } from "lodash";

export default function Page() {
  const TIPOCONTENIDO = {
    comentario: { key: "comentario", value: "Comentario" },
    libro: { key: "libro", value: "Libro" },
  };

  const { getReportByUserId, isLoading } = useReport();
  const { postBookAppeal, postCommentAppeal, error, errorResponse } =
    useContentAppeal();

  const [isSuccess, setIsSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsData, setReportsData] = useState(null);
  const [reportSelected, setReportSelected] = useState(null);
  const [appealConclusion, setAppealConclusion] = useState("");
  const [tipoSearch, setTipoSearch] = useState("");
  const [showAppealModal, setAppealModal] = useState(false);

  const user_id = localStorage.getItem("user_id");

  const fetchData = async (defaultReportSelectedId) => {
    const result = await getReportByUserId(user_id, {
      page: currentPage,
      tipo: tipoSearch,
    });

    // Filtramos por los ultimos 30 dias
    result.data = result.data.filter(
      (report) => moment().diff(moment(report.created_at), "days") <= 30
    );

    let mappedValues = {
      ...result,
      data: result?.data?.map((report) => ({
        ...report,
        tipo: report.comentario ? "Comentario" : "Libro",
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
    if (reportSelected.tipo === "Comentario") {
      await postCommentAppeal(reportSelected.comentario.id, {
        justificacion: appealConclusion,
      });
    } else {
      await postBookAppeal(reportSelected.libro_id, {
        justificacion: appealConclusion,
      });
    }

    setIsSuccess(true);
    setAppealModal(false);
    setAppealConclusion("");
  };

  const delayedFetchData = debounce(() => {
    fetchData();
  }, 400);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [currentPage, user_id]);

  useEffect(() => {
    delayedFetchData();

    return delayedFetchData.cancel;
  }, [currentPage, tipoSearch]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !isLoading) {
      if (error) {
        toast.error(errorResponse?.error);
        setAppealModal(false);
        setAppealConclusion("");
      } else if (isSuccess) {
        toast.success("La apelación ha sido enviada correctamente");
        setAppealModal(false);
        setAppealConclusion("");
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
        <div className="flex gap-2 items-center">
          <Link href="/accounts" className="font-semibold text-gray-800">
            Cuenta
          </Link>
          <span>
            <VscChevronRight />
          </span>
          <span className="font-semibold text-gray-800">
            Bandeja de Sanciones
          </span>
        </div>
        <h1 className="font-bold text-gray-800 text-3xl leading-8">
          Bandeja de Sanciones
        </h1>

        <div className="flex gap-3 ">
          <div className="flex grow flex-col gap-3">
            <form className="flex gap-3">
              <div className="relative !max-w-32">
                <Select
                  label="Tipo Contenido"
                  className="my-react-select-container !max-w-40"
                  classNamePrefix="my-react-select"
                  containerProps={{ className: "!min-w-40 !max-w-40" }}
                  labelProps={{ className: "!max-w-40" }}
                  value={tipoSearch}
                  onChange={(value) => {
                    setTipoSearch(value);
                    setCurrentPage(1);
                  }}
                >
                  {[
                    { key: "", value: "Tipo" },
                    ...Object.values(TIPOCONTENIDO),
                  ]?.map((state, index) => (
                    <Option key={index} className="min-h-9" value={state.key}>
                      {state.value}
                    </Option>
                  ))}
                </Select>
              </div>
            </form>
            <div className="flex flex-col items-center gap-3 border border-gray-300 rounded-md py-5 px-2 ">
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
                </div>
                {!reportSelected?.solicitud_desbaneo && (
                  <div className="flex justify-between text-white">
                    <div className="flex gap-2">
                      <button
                        className="h-10 rounded-md px-2 bg-red-900 hover:brightness-90"
                        onClick={() => setAppealModal(true)}
                      >
                        Apelar sanción
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
