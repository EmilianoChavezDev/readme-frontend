"use client"
import ResponsivePagination from 'react-responsive-pagination';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (<>
        <ResponsivePagination
            className='list-style-none flex'
            pageLinkClassName={`flex justify-center items-center px-3 py-1.5 text-sm font-bold min-h-full transition-all duration-300 border`}
            activeItemClassName={'bg-colorPrimario hover:bg-colorHoverPrimario text-white border-colorPrimario'}
            disabledItemClassName='hover:cursor-default bg-gray-200'
            current={currentPage}
            total={totalPages}
            nextLabel={<GrFormNext />}
            previousLabel={<GrFormPrevious />}
            onPageChange={onPageChange}
        />
    </>);
}

export default Pagination