"use client";

import moment from "moment";
import Link from "next/link";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import { Line } from "react-chartjs-2";
import { pdf } from "@react-pdf/renderer";
import { BsDownload } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { VscChevronRight } from "react-icons/vsc";
import { LuCalendar, LuEye } from "react-icons/lu";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import { Input, Option, Select } from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import useBook from "@/hooks/useBook";
import useReport from "@/hooks/useReport";
import useCategory from "@/hooks/useCategory";
import Loader from "@/components/common/loader";
import Pagination from "@/components/common/Pagination";
import StatisticPdf from "@/components/accounts/StatisticPdf";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Page() {
  moment.locale("es");

  const { getAllBooks, isLoading: booksLoading } = useBook();
  const { fetchCategories, data: categoriesArray } = useCategory();
  const { getUserStatistics, getDailyReadingsPerBook, isLoading } = useReport();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [booksData, setBooksData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statistics, setStatistics] = useState(null);
  const [titleToSearch, setTitleToSearch] = useState("");
  const [bookSelected, setBookSelected] = useState(null);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [dailyReadingsPerBook, setDailyReadingsPerBook] = useState({});
  const [categorySelectedToSearch, setCategorySelectedToSearch] = useState("");

  const getPdfData = async () => {
    try {
      const result = await getAllBooks({ user_id: localStorage.getItem("user_id") });
      const books_list = [...result];
      for (let index = 0; index < books_list.length; index++) {
        const book = books_list[index];
        const params = {
          fecha_inicio: moment().subtract(7, "days").format("YYYY-MM-DD"),
          fecha_fin: moment().format("YYYY-MM-DD"),
          libro_id: book?.id
        };
        const readingsResult = await getDailyReadingsPerBook(params);
        const startDate = moment().subtract(7, "days");
        const endDate = moment();
        const values = {};
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate, "day")) {
          const formattedDate = currentDate.format("YYYY-MM-DD");
          values[formattedDate] = readingsResult?.[formattedDate] || 0;
          currentDate = currentDate.add(1, "day");
        }
        books_list[index] = { ...book, statistics: values };
      }
      return books_list;
    } catch (error) {
      throw new Error('Error al obtener los libros y las estadísticas de lectura.');
    }
  };
  
  const generatePdf = async () => {
    try {
      setStatisticsLoading(true)
      const pdfDataPromise = getPdfData();
      toast.promise(
        pdfDataPromise,
        {
          loading: 'Generando Informe...',
          success: 'Informe generado exitosamente',
          error: 'El informe no se pudo entregar',
        }
      );
      const result = await pdfDataPromise;
      setStatisticsLoading(false);

      const doc = StatisticPdf({statistics, list: result, cardPercentages: getCardPercentages()})

      const pdfBlob = await pdf(doc).toBlob();
      saveAs(pdfBlob, `Informe ${localStorage.getItem("username")}-${moment().format('DD-MM-YY')}.pdf`);
    } catch (error) {
      toast.error('Error al descargar el informe.');
    }
  };

  const fetchStatistics = async () => {
    const result = await getUserStatistics();
    setStatistics(result);
  };

  const fetchDailyReadingsPerBook = async () => {
    let params = {
      fecha_inicio: moment().subtract(7, "days").format("YYYY-MM-DD"),
      fecha_fin: moment().format("YYYY-MM-DD"),
      libro_id: bookSelected?.id,
    };
    const result = await getDailyReadingsPerBook(params);

    const startDate = moment().subtract(7, "days");
    const endDate = moment();

    const values = {};
    const currentDate = moment(startDate);
    while (currentDate.isSameOrBefore(endDate, "day")) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      if (!result.hasOwnProperty(formattedDate)) {
        values[formattedDate] = 0;
      } else {
        values[formattedDate] = result[formattedDate];
      }
      currentDate.add(1, "day");
    }
    setDailyReadingsPerBook(values);
  };

  const fetchBooks = async (values = {}) => {
    let params = {
      page: currentPage,
      titulo: titleToSearch,
      categorias: categorySelectedToSearch,
      user_id: localStorage.getItem("user_id"),
      ...values,
    }; 
    const result = await getAllBooks(params);
    setBooksData(result);
    if (result?.data?.length) {
      setBookSelected(result?.data[0]);
    }
  };

  const handleSelectBook = (book) => {
    book.id !== bookSelected.id && setBookSelected(book);
  };

  const cleanSearchValues = () => {
    setCategorySelectedToSearch("");
    setTitleToSearch("");
    fetchBooks({ titulo: "", categorias: "" });
  };

  const getCardPercentages = () => {
    let comments =
      (statistics?.cantidad_comentarios_ultima_semana * 100) /
      (statistics?.cantidad_total_comentarios -
        statistics?.cantidad_comentarios_ultima_semana);
    let favorites =
      (statistics?.cantidad_favoritos_ultima_semana * 100) /
      (statistics?.cantidad_total_favoritos -
        statistics?.cantidad_favoritos_ultima_semana);
    let views =
      (statistics?.cantidad_vistas_ultima_semana * 100) /
      (statistics?.cantidad_vistas_totales -
        statistics?.cantidad_vistas_ultima_semana);
    return {
      comments: isFinite(comments) ? Number(comments.toFixed(1)) : 100,
      favorites: isFinite(favorites) ? Number(favorites.toFixed(1)) : 100,
      views: isFinite(views) ? Number(views.toFixed(1)) : 100,
    };
  };

  useEffect(() => {
    fetchStatistics();
    fetchCategories();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  useEffect(() => {
    if (bookSelected) {
      fetchDailyReadingsPerBook();
    }
  }, [bookSelected]);

  useEffect(() => {
    if (categoriesArray?.length) {
      setCategories(categoriesArray?.map((c) => ({ id: c[0], name: c[1] })));
    }
  }, [categoriesArray]);

  const chartData = useMemo(() => {
    return {
      labels: Object.keys(dailyReadingsPerBook)?.map((date) =>
        moment(date).format("DD-MM")
      ),
      datasets: [
        {
          label: "Lecturas",
          data: Object.values(dailyReadingsPerBook),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  }, [dailyReadingsPerBook]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          stepSize: 1,
        },
      },
      y1: {
        type: "linear",
        display: false,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <>
      {((isLoading && !statisticsLoading) || loading) && <Loader />}
      <div className="relative flex flex-col gap-3 px-20 py-9">
        <div className="flex gap-2 items-center">
          <Link href="/accounts" className="font-semibold text-gray-800">
            Cuenta
          </Link>
          <span>
            <VscChevronRight />
          </span>
          <span className="font-semibold text-gray-800">
            Estadísticas sobre mi cuenta
          </span>
        </div>
        <div className="flex justify-between">
          <h1 className="font-bold text-gray-800 text-3xl leading-8">
            Estadísticas
          </h1>
          <button className="flex items-center text-sm gap-1 h-9 px-3 rounded-md bg-colorPrimario hover:bg-colorHoverPrimario text-white" onClick={generatePdf}>
            <span>
              <BsDownload size={18} />
            </span>
            <span>Descargar informe</span>
          </button>
        </div>
        <div className="flex gap-3">
          <div className="relative !max-w-40">
            {categories.length && (
              <Select
                label="Categoría"
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                containerProps={{ className: "!min-w-40 !max-w-40" }}
                labelProps={{ className: "!max-w-40" }}
                value={categorySelectedToSearch}
                onChange={(value) => setCategorySelectedToSearch(value)}
              >
                {categories?.map((category, index) => (
                  <Option key={index} className="min-h-9" value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            )}
          </div>
          <div>
            <Input
              label="Título"
              value={titleToSearch}
              onChange={(event) => setTitleToSearch(event.target.value)}
            />
          </div>
          <button
            className="h-10 px-3 rounded-md bg-gray-400 hover:bg-gray-500 text-black"
            disabled={booksLoading}
            onClick={cleanSearchValues}
          >
            Limpiar
          </button>
          <button
            className="h-10 px-3 rounded-md bg-colorPrimario hover:bg-colorHoverPrimario text-white"
            disabled={booksLoading}
            onClick={() => fetchBooks()}
          >
            Buscar
          </button>
        </div>
        <div className="flex gap-3 h-full">
          <div className="grow flex flex-col gap-3">
            <div className="border rounded-md border-gray-300 w-full flex flex-col gap-6 items-center p-5">
              <h1 className="text-xl font-semibold">Mis Libros</h1>
              <table className="w-full">
                <thead>
                  <tr className="h-14">
                    <th className="text-start font-semibold">N°</th>
                    <th className="text-start font-semibold">Título</th>
                    <th className="text-start font-semibold whitespace-nowrap">
                      Cap. Publicados
                    </th>
                    <th className="text-start font-semibold">Categoría</th>
                    <th className="text-end font-semibold whitespace-nowrap">
                      Lectores
                    </th>
                    <th className="text-end font-semibold">Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  {booksData?.data?.map((book, index) => (
                    <tr
                      key={index}
                      className={`h-14 hover:bg-green-100 cursor-pointer ${
                        book.id === bookSelected.id
                          ? "border-t border-t-gray-400 border-b-2 border-b-colorPrimario"
                          : "border-t border-gray-400"
                      }`}
                      onClick={() => handleSelectBook(book)}
                    >
                      <td
                        className={`text-start font-normal ${
                          book.id === bookSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          book.id === bookSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {book?.titulo}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          book.id === bookSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {`${book?.cantidad_capitulos_publicados}/${book?.cantidad_capitulos}`}
                      </td>
                      <td
                        className={`text-start font-normal ${
                          book.id === bookSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {book?.categoria}
                      </td>
                      <td
                        className={`text-end font-normal ${
                          book.id === bookSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {`${book?.cantidad_usuarios_terminaron}/${book?.cantidad_usuarios_leyeron}`}
                      </td>
                      <td
                        className={`text-end font-normal ${
                          book.id === bookSelected.id
                            ? "text-colorPrimario font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {Number(book?.puntuacion_media.toFixed(1))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={booksData?.total_pages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 !max-w-2/5">
            <div className="flex gap-3">
              <div className="border rounded-md border-gray-300 p-3 w-1/2 flex flex-col">
                <div className="flex justify-between">
                  <span className="text-xl font-bold">
                    {statistics?.cantidad_total_comentarios}
                  </span>
                  <span className="text-cyan-400">
                    <FaRegComment size={18} />
                  </span>
                </div>
                <span>Comentarios</span>
                <div className="flex gap-1 items-center">
                  <span className="rotate-45 text-green-600">
                    <IoIosArrowRoundUp size={25} />
                  </span>
                  <span className="text-gray-500 text-sm">
                    {`${statistics?.cantidad_comentarios_ultima_semana} / ${
                      getCardPercentages().comments
                    }% esta semana`}
                  </span>
                </div>
              </div>
              <div className="border rounded-md border-gray-300 p-3 w-1/2 flex flex-col">
                <div className="flex justify-between">
                  <span className="text-xl font-bold">
                    {statistics?.cantidad_total_favoritos}
                  </span>
                  <span className="text-yellow-600">
                    <AiOutlineStar size={22} />
                  </span>
                </div>
                <span>Favoritos</span>
                <div className="flex gap-1 items-center">
                  <span className="rotate-45 text-green-600">
                    <IoIosArrowRoundUp size={25} />
                  </span>
                  <span className="text-gray-500 text-sm">
                    {`${statistics?.cantidad_favoritos_ultima_semana} / ${
                      getCardPercentages().favorites
                    }% esta semana`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="border rounded-md border-gray-300 p-3 w-1/2 flex flex-col">
                <div className="flex justify-between">
                  <span className="text-xl font-bold">
                    {statistics?.cantidad_vistas_totales}
                  </span>
                  <span className="text-purple-500">
                    <LuEye size={22} />
                  </span>
                </div>
                <span>Vistas</span>
                <div className="flex gap-1 items-center">
                  <span className="rotate-45 text-green-600">
                    <IoIosArrowRoundUp size={25} />
                  </span>
                  <span className="text-gray-500 text-sm">
                    {`${statistics?.cantidad_vistas_ultima_semana} / ${
                      getCardPercentages().views
                    }% esta semana`}
                  </span>
                </div>
              </div>
              <div className="border rounded-md border-gray-300 p-3 w-1/2 flex flex-col">
                <div className="flex justify-between">
                  <span className="text-xl font-bold">
                    {statistics?.edad_promedio
                      ? `${statistics?.edad_promedio} años`
                      : "Sin Datos"}
                  </span>
                  <span className="text-pink-500">
                    <LuCalendar size={18} />
                  </span>
                </div>
                <span>Edad Promedio de Lectores</span>
              </div>
            </div>
            <div className="border rounded-md border-gray-300 p-5 pb-8 relative !max-h-72">
              <h1 className="text-xl font-semibold">Estadísticas de lectura</h1>
              <Line options={options} data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
