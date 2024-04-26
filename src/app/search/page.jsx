"use client";
import NavBar from "@/components/NavBar";
import NotFound from "@/components/common/NotFound";
import Pagination from "@/components/common/Pagination";
import Filter from "@/components/search/Filter";
import SearchItem from "@/components/search/SearchItem";
import useBook from "@/hooks/useBook";
import useCategory from "@/hooks/useCategory";
import { Spinner, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { BsBook, BsBookFill, BsPerson } from "react-icons/bs";
import useUserInfo from "@/hooks/useUser";
import { UserCard } from "@/components/users/UserCard";
import { info } from "autoprefixer";

const Search = ({}) => {
  const searchParams = useSearchParams();

  const {
    data: categories,
    loading: categoriesLoading,
    fetchCategories,
  } = useCategory();

  const {
    searchUsers,
    currentData: usuarios,
    loading: usersLoading,
  } = useUserInfo();

  const { getAllBooks, isLoading } = useBook();

  const [findedBooks, setFindedBooks] = useState(null);

  const [selectedPoints, setSelectedPoints] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")
      ? [
          {
            value: searchParams.get("category"),
            label: searchParams.get("categoryTagName"),
          },
        ]
      : []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [totalUserPages, setTotalUserPages] = useState(0);
  const [totalUserItems, setTotalUserItems] = useState(0);

  useEffect(() => {
    fetchCategories();
    handlePageChange(1);
    handleUserPageChange(1);
  }, []);

  const handlePageChange = async (page) => {
    const response = await getAllBooks({
      page,
      titulo: searchParams.get("search") ?? "",
      categorias: [
        ...new Set(
          [
            ...selectedCategories?.map((category) => category.value),
            searchParams.get("category") ?? false,
          ].filter((category) => category)
        ),
      ],
      puntuacion_media: selectedPoints ?? 0,
    });
    setCurrentPage(page);
    setTotalPages(response.total_pages);
    setFindedBooks(response.data);
    setTotalItems(response.total_items);
  };

  useEffect(() => {
    if (!usuarios) return;
    setTotalUserPages(usuarios?.total_pages);
    setTotalUserItems(usuarios?.total_items);
  }, [usuarios]);

  const handleUserPageChange = async (page) => {
    await searchUsers(searchParams.get("search"), page);
    setCurrentUserPage(page);
  };

  const formatCategories = () => {
    if (!categories) return [];
    return categories.map((category) => ({
      value: category[0],
      label: category[1],
    }));
  };

  const handleCategoriesChange = (value) => {
    setSelectedCategories(value);
  };

  const handleApplyFilters = () => {
    if (isLoading) return;
    handlePageChange(1);
    handleUserPageChange(1);
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10">
        <NavBar onSearch={handleApplyFilters} />
      </div>
      <div className="flex flex-col mt-5">
        <div>
          <Filter
            selectedPoints={selectedPoints}
            onChangePoints={(val) => setSelectedPoints(val)}
            selectedCategories={selectedCategories}
            onChangeCategory={handleCategoriesChange}
            categories={
              categoriesLoading || !categories ? [] : formatCategories()
            }
            onFilter={handleApplyFilters}
          />
        </div>

        <div>
          <Tabs value="libros">
            <TabsHeader className="sticky top-2 dark:bg-dark-darkColorNeutral">
              <Tab value="libros" className="dark:bg-dark-darkColorNeutral">
                <div className="flex items-center gap-2 ">
                  <BsBook />
                  Libros
                </div>
              </Tab>
              <Tab value="usuarios" className="dark:bg-dark-darkColorNeutral">
                <div className="flex items-center gap-2 ">
                  <BsPerson />
                  Usuarios
                </div>
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="libros">
                {findedBooks && !totalItems ? (
                  <NotFound
                    message={
                      "No hemos encontrado resultados con los parámetros de búsqueda dados."
                    }
                    butMessage={
                      "No te preocupes, sigue explorando nuestra página y descubre algo que te encante."
                    }
                  />
                ) : (
                  <>
                    <div className="flex flex-col justify-start mt-3 px-16 mb-5">
                      <Typography variant="h3" color="blue-gray">
                        {searchParams.get("search")
                          ? `Resultados de la Búsqueda "${searchParams.get(
                              "search"
                            )}"`
                          : searchParams.get("categoryTagName")
                          ? `Resultados de la Categoría "${searchParams.get(
                              "categoryTagName"
                            )}"`
                          : ""}
                      </Typography>
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="-mt-2"
                      >
                        {findedBooks && <span>{totalItems} resultados</span>}
                      </Typography>
                    </div>
                    {isLoading ? (
                      <div className="flex justify-center items-center">
                        <Spinner className="h-12 w-12" />
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center flex-col gap-5 px-10">
                          {findedBooks?.map((book, i) => (
                            <SearchItem key={i} book={book} />
                          ))}
                        </div>
                        <div className="flex justify-center p-3 my-4">
                          <div className="transform scale-125 shadow">
                            {findedBooks && (
                              <Pagination
                                currentPage={currentPage ?? 1}
                                totalPages={totalPages ?? 0}
                                onPageChange={handlePageChange}
                              />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </TabPanel>
              <TabPanel value="usuarios">
                {usuarios?.users && !totalUserItems ? (
                  <NotFound
                    message={
                      "No hemos encontrado resultados con los parámetros de búsqueda dados."
                    }
                    butMessage={
                      "No te preocupes, sigue explorando nuestra página y descubre algo que te encante."
                    }
                  />
                ) : (
                  <>
                    <div className="flex flex-col justify-start mt-3 px-16 mb-5">
                      <Typography variant="h3" color="blue-gray">
                        {`Resultados de la Búsqueda "${searchParams.get(
                          "search"
                        )}"`}
                      </Typography>
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="-mt-2"
                      >
                        {usuarios?.users && (
                          <span>{totalUserItems} resultados</span>
                        )}
                      </Typography>
                    </div>
                    {usersLoading ? (
                      <div className="flex justify-center items-center">
                        <Spinner className="h-12 w-12" />
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-12 gap-5 px-20">
                          {usuarios?.users?.map((user, i) => (
                            <div className="col-span-12 _md:col-span-4 flex justify-center">
                              <UserCard
                                username={user?.username}
                                description={user?.descripcion}
                                image={user?.profile}
                                nombre={user?.nombre}
                                canDelete={false}
                                canFollow={false}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center p-3 my-4">
                          <div className="transform scale-125 shadow">
                            {usuarios?.users && (
                              <Pagination
                                currentPage={currentUserPage ?? 1}
                                totalPages={totalUserPages ?? 0}
                                onPageChange={handleUserPageChange}
                              />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Search;
