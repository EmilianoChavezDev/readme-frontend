import useDenuncias from "@/hooks/useDenuncias";
import { Button } from "@material-tailwind/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { SlFlag, SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import Modal from "../common/modal";

const UserOption = ({
  isFollow,
  selectedOption,
  onSelectOption,
  username,
  handleFollow,
  handleUnfollow,
  id,
}) => {
  const [usernameLs, setUsernameLs] = useState(null);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [categoryReportUser, setCategoryReportUser] = useState([]);
  const [categorySelectReportUser, setCategorySelectReportUser] =
    useState(null);
  const { getReportUserCategory, createReportUser } = useDenuncias();
  const [reasonForReporting, setReasonForReporting] = useState(null);
  const [errorMotive, setErrorMotive] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setUsernameLs(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    if (!searchParams) return;
    setSearch(searchParams.get("user"));
  }, [searchParams]);

  const fetchCategoryReportUser = async () => {
    const result = await getReportUserCategory();
    setCategoryReportUser(result);
  };

  const fnCreateReportUser = async () => {
    try {
      await createReportUser({
        usuario_reportado_id: id,
        reporte: {
          motivo: reasonForReporting,
          estado: "pendiente",
          categoria: categorySelectReportUser,
        },
      });
    } catch (error) {
      console.error("Error report create:", error);
    }
  };

  const handleCancelReportUser = () => {
    setCategorySelectReportUser("");
    setReasonForReporting("");
    setErrorMotive(false);
    setShowReportModal(false);
  };

  const handleShowModal = () => {
    fetchCategoryReportUser();
    setShowReportModal(true);
  };

  const reportUser = () => {
    if (!reasonForReporting || !categorySelectReportUser) {
      setErrorMotive(true);
      return;
    }
    toast.success("Usuario Reportado");
    fnCreateReportUser();
    setCategorySelectReportUser("");
    setReasonForReporting("");
    setErrorMotive(false);
    setShowReportModal(false);
  };

  const isOwner = useMemo(() => {
    return username === usernameLs;
  });

  return (
    <div className="dark:bg-dark-darkColorNeutral">
      <Modal
        open={Boolean(showReportModal)}
        onHide={handleCancelReportUser}
        onSave={reportUser}
        title="Denunciar Usuario"
      >
        <div className="flex flex-col gap-2">
          <span>Indícanos el motivo de tu reporte</span>
          <textarea
            className="text-xs border rounded-lg p-3 pr-16 flex-grow border-gray-400 outline-none"
            value={reasonForReporting}
            onChange={(event) => {
              const inputValue = event.target.value.slice(0, 500); // Limitar a 500 caracteres
              setReasonForReporting(inputValue);
            }}
            maxLength={500} // Establecer el límite máximo de caracteres
            rows={2}
          />
          <span className="absolute top-16 right-6 text-xs text-gray-400">
            {reasonForReporting ? reasonForReporting.length : 0}/500
          </span>

          <select
            className="text-xs border rounded-lg p-2 border-gray-400 outline-none"
            value={categorySelectReportUser}
            onChange={(e) => setCategorySelectReportUser(e.target.value)}
          >
            <option value="">Selecciona el motivo del reporte</option>
            {categoryReportUser?.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errorMotive && (
            <div className="text-red-500">
              Por favor, describe y selecciona un motivo.
            </div>
          )}
        </div>
      </Modal>
      <div className="flex _sm:justify-between justify-center items-center _sm:w-5/6 mx-auto pt-3">
        <div className="flex _sm:text-xl text-sm text-nowrap gap-x-4 font-semibold">
          <span
            className={`hover:cursor-pointer transition-all transform duration-200 border-b-2 hover:border-colorPrimario dark:hover:border-dark-darkColorButtons
              ${
                selectedOption === "misLibros"
                  ? "border-colorPrimario dark:border-dark-darkColorButtons"
                  : "border-transparent"
              }`}
            onClick={() => onSelectOption("misLibros")}
          >
            {isOwner ? "Mis libros" : "Libros"}
          </span>
          <span
            className={`hover:cursor-pointer transition-all transform duration-200 border-b-2 hover:border-colorPrimario dark:hover:border-dark-darkColorButtons
              ${
                selectedOption === "listaLectura"
                  ? "border-colorPrimario dark:border-dark-darkColorButtons"
                  : "border-transparent"
              }`}
            onClick={() => onSelectOption("listaLectura")}
          >
            Lista de lectura
          </span>
          {usernameLs === username && (
            <span
              className={`hover:cursor-pointer transition-all transform duration-200 border-b-2 pb-2 hover:border-colorPrimario dark:hover:border-dark-darkColorButtons
                ${
                  selectedOption === "seguidos"
                    ? "border-colorPrimario dark:border-dark-darkColorButtons"
                    : "border-transparent"
                }`}
              onClick={() => onSelectOption("seguidos")}
            >
              Seguidos
            </span>
          )}
          <span
            className={`hover:cursor-pointer transition-all transform duration-200 border-b-2 pb-2 hover:border-colorPrimario dark:hover:border-dark-darkColorButtons
              ${
                selectedOption === "seguidores"
                  ? "border-colorPrimario dark:border-dark-darkColorButtons"
                  : "border-transparent"
              }`}
            onClick={() => onSelectOption("seguidores")}
          >
            Seguidores
          </span>
        </div>
        {usernameLs !== username && (
          <div className="hover:cursor-pointer pb-2 text-xl hidden _sm:block">
            {isFollow ? (
              <div className="flex gap-4">
                <Button
                  className="px-2 py-2 flex text-colorPrimario border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white dark:bg-dark-darkColorButtons dark:border-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
                  onClick={() => handleUnfollow(id)}
                >
                  <span className="flex items-center ">
                    <SlUserUnfollow className="inline-block align-middle mr-1  _md:w-4 _md:h-4" />
                    Dejar de seguir
                  </span>
                </Button>
                {usernameLs !== username && (
                  <Button
                    onClick={handleShowModal}
                    className="flex items-center px-2 py-2 text-red-500 border border-red-500 bg-white hover:bg-red-500 hover:text-white dark:bg-red-500 dark:hover:bg-red-300 dark:text-white"
                  >
                    <span className="mr-1 _md:w-4 _md:h-4">
                      <SlFlag />
                    </span>
                    Reportar
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <Button
                  onClick={() => handleFollow(id)}
                  className="flex items-center px-2 py-2 text-colorPrimario border border-colorPrimario bg-white hover:bg-colorHoverPrimario hover:text-white dark:bg-dark-darkColorButtons dark:border-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
                >
                  <span className="flex items-center gap-1">
                    <SlUserFollow />
                    Seguir
                  </span>
                </Button>

                {usernameLs !== username && (
                  <Button
                    onClick={handleShowModal}
                    className="flex items-center px-2 py-2 text-red-500 border border-red-500 bg-white hover:bg-red-500 hover:text-white dark:bg-red-500 dark:hover:bg-red-300 dark:text-white"
                  >
                    <span className="mr-1 _md:w-4 _md:h-4">
                      <SlFlag />
                    </span>
                    Reportar
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/*linea */}
      <div className=" border-b-2 border-BooksCreateImageBackground dark:border-dark-darkColorNeutral"></div>
    </div>
  );
};

export default UserOption;
