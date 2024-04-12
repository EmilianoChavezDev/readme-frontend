"use client"
import NavBar from "@/components/NavBar";
import NotFound from "@/components/common/NotFound";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/loader";
import Filter from "@/components/search/Filter";
import SearchItem from "@/components/search/SearchItem";
import useBook from "@/hooks/useBook";
import useCategory from "@/hooks/useCategory";
import useGetLibros from "@/hooks/useGetLibros";
import { Spinner, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = ({ }) => {
    const searchParams = useSearchParams()

    const {
        data: categories,
        loading: categoriesLoading,
        fetchCategories
    } = useCategory()

    const {
        getAllBooks,
        isLoading
    } = useBook()

    const [findedBooks, setFindedBooks] = useState(null)

    const [selectedPoints, setSelectedPoints] = useState(0)
    const [selectedCategories, setSelectedCategories] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        fetchCategories()
        handlePageChange(1)
    }, [])

    const handlePageChange = async (page) => {
        const response = await getAllBooks({
            page,
            titulo: searchParams.get("search") ?? "",
            categorias: selectedCategories?.map(category => category.value) ?? [],
            puntuacion_media: selectedPoints ?? 0
        })
        setCurrentPage(page)
        setTotalPages(response.total_pages)
        setFindedBooks(response.data)
        setTotalItems(response.total_items)
    }


    const formatCategories = () => {
        if (!categories) return []
        return categories.map(category => ({ value: category[0], label: category[1] }))
    }

    const handleCategoriesChange = (value) => {
        setSelectedCategories(value)
    }

    const handleApplyFilters = () => {
        if(isLoading) return
        handlePageChange(currentPage)
    }

    return (
        <div className="flex flex-col">
            <div className="sticky top-0 z-10">
                <NavBar onSearch={handleApplyFilters}/>
            </div>
            <div className="flex flex-col mt-5">
                <div>
                    <Filter
                        selectedPoints={selectedPoints}
                        onChangePoints={(val) => setSelectedPoints(val)}
                        selectedCategories={selectedCategories}
                        onChangeCategory={handleCategoriesChange}
                        categories={categoriesLoading || !categories ? [] : formatCategories()}
                        onFilter={handleApplyFilters}
                    />
                </div>
                {findedBooks && !totalItems ?
                    <NotFound
                        message={
                            "No hemos encontrado resultados con los parámetros de búsqueda dados."
                        }
                        butMessage={
                            "No te preocupes, sigue explorando nuestra página y descubre algo que te encante."
                        }
                    />
                    : <>
                        <div className="flex flex-col justify-start mt-3 px-16 mb-5">
                            <Typography variant="h3" color="blue-gray">
                                Resultados de la Busqueda "{searchParams.get("search") ?? ""}"
                            </Typography>
                            <Typography variant="lead" color="blue-gray" className="-mt-2">
                               { findedBooks && <span>{totalItems} resultados</span>}
                            </Typography>
                        </div>
                        {isLoading ?
                            <div className="flex justify-center items-center">
                                <Spinner className="h-12 w-12" />
                            </div>
                            :
                            <>
                                <div className="flex justify-center flex-col gap-5 px-10">
                                {findedBooks?.map((book, i) => <SearchItem key={i} book={book} />)}
                                </div>
                                <div className="flex justify-center p-3 my-4">
                                    <div className="transform scale-125 shadow">
                                       {findedBooks && <Pagination currentPage={currentPage ?? 1} totalPages={totalPages ?? 0} onPageChange={handlePageChange} />} 
                                    </div>
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    );
    
}

export default Search;