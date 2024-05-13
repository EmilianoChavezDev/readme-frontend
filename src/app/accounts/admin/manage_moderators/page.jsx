'use client'

import moment from 'moment'
import { GrBook } from 'react-icons/gr'
import { FaRegUser } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Input } from '@material-tailwind/react'
import { MdOutlineComment } from 'react-icons/md'

import useReport from '@/hooks/useReport'
import Loader from '@/components/common/loader'
import Pagination from '@/components/common/Pagination'
import { useAccountContext } from '@/contexts/AccountProvider'
import AddModeratorModal from '@/components/accounts/addModeratorModal'

export default function Page() {

    const [data, setData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [moderatorSelected, setModeratorSelected] = useState(null)
    const [usernameToSearch, setUsernameToSearch] = useState('')

    const { getModeratorStatistics, isLoading } = useReport()
    const { showAddModeratorModal, setShowAddModeratorModal } = useAccountContext()

    const fetchModerators = async (values = {}) => {
        let params = { page: currentPage, username: usernameToSearch, ...values }
        const result = await getModeratorStatistics(params)
        setData(result)
        if (result?.moderadores?.length) {
            setModeratorSelected(result?.moderadores[0])
        }
    }

    const reloadData = () => {
        currentPage === 1? fetchModerators() : setCurrentPage(1)
    }

    useEffect(() => {
        fetchModerators()
    }, [currentPage])

    useEffect(() => {
        let isCanceled = false
        setTimeout(() => {
            if(isCanceled) return
            fetchModerators({ page: 1, username: usernameToSearch })
        }, 400)
        return () => isCanceled = true
    }, [usernameToSearch])

    return (
        <>
            <AddModeratorModal show={showAddModeratorModal} 
                onHide={() => setShowAddModeratorModal(false)}
                onSave={reloadData} />
            <div className='flex gap-3 px-20 py-9'>
                {isLoading && <Loader />}
                <div className='grow flex flex-col gap-3'>
                    <div className='flex'>
                        <Input label='Username'
                            value={usernameToSearch}
                            containerProps={{ className: '!min-w-48 !max-w-48' }}
                            labelProps={{ className: '!max-w-48' }}
                            onChange={event => setUsernameToSearch(event.target.value)} />
                    </div>
                    <div className='flex flex-col items-center gap-3 border border-gray-300 rounded-md py-5 px-2'>
                        <h1 className='text-xl font-semibold'>
                            LISTA DE MODERADORES
                        </h1>
                        <table className='w-full'>
                            <thead>
                                <tr className='h-14 border-b border-gray-200'>
                                    <th className='text-start font-semibold'>Nombre</th>
                                    <th className='text-start font-semibold'>Username</th>
                                    <th className='text-start font-semibold'>Correo Electrónico</th>
                                    <th className='text-start font-semibold'>Edad</th>
                                    <th className='text-end font-semibold'>Registrado en Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.moderadores?.map((moderator, index) =>
                                    <tr key={index}
                                        className={`h-14 hover:bg-green-100 cursor-pointer ${moderator.id === moderatorSelected?.id? 'border-t border-t-gray-400 border-b-2 border-b-colorPrimario' : 'border-t border-gray-400'}`}
                                        onClick={() => setModeratorSelected(moderator)}>
                                        <td className={`text-start font-normal ${moderator.id === moderatorSelected?.id ? 'text-colorPrimario font-semibold': 'text-gray-800'}`}>
                                            {moderator.nombre}
                                        </td>
                                        <td className={`text-start font-normal ${moderator.id === moderatorSelected?.id ? 'text-colorPrimario font-semibold': 'text-gray-800'}`}>
                                            {moderator.username}
                                        </td>
                                        <td className={`text-start font-normal ${moderator.id === moderatorSelected?.id ? 'text-colorPrimario font-semibold': 'text-gray-800'}`}>
                                            {moderator.email}
                                        </td>
                                        <td className={`text-start font-normal ${moderator.id === moderatorSelected?.id ? 'text-colorPrimario font-semibold': 'text-gray-800'}`}>
                                            {moment().diff(moment(moderator.fecha_de_nacimiento), 'years')} años
                                        </td>
                                        <td className={`text-end font-normal ${moderator.id === moderatorSelected?.id ? 'text-colorPrimario font-semibold': 'text-gray-800'}`}>
                                            {moderator?.role_updated_at? moment(moderator?.role_updated_at).format('DD-MM-YYYY') : ''}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='flex justify-center'>
                            <Pagination currentPage={currentPage}
                                totalPages={data?.total_pages}
                                onPageChange={setCurrentPage} />
                        </div>
                    </div>
                </div>
                <div className='w-96 flex flex-col gap-6'>
                    {moderatorSelected?
                        <>
                            <div className='flex items-center'>
                                <h2 className='font-bold text-gray-800 text-xl leading-7'>
                                    Detalle del Moderador
                                </h2>
                            </div>
                            <div className='border border-gray-300 rounded-md p-3 flex flex-col gap-3'>
                                <div className='flex flex-col gap-3 pb-3 border-b border-colorPrimario'>
                                    <span className='text-gray-700'>{moderatorSelected?.nombre ?? moderatorSelected?.username}</span>
                                    <div className='flex gap-1'>
                                        <span className='font-semibold'>Edad:</span>
                                        <span className='text-gray-700'>{moment().diff(moment(moderatorSelected.fecha_de_nacimiento), 'years')} años</span>
                                    </div>
                                </div>
                                {moderatorSelected?.registrado_por &&
                                    <div className='flex flex-col gap-3 pb-3 border-b border-colorPrimario'>
                                        <div className='flex gap-1'>
                                            <span className='font-semibold'>Registrado por:</span>
                                            <span className='text-gray-700'>{moderatorSelected?.registrado_por}</span>
                                        </div>
                                        <div className='flex gap-1'>
                                            <span className='font-semibold'>Registrado en Fecha:</span>
                                            <span className='text-gray-700'>{moment(moderatorSelected?.role_updated_at).format('DD-MM-YYYY')}</span>
                                        </div>
                                    </div>
                                }
                                <article className='bg-coldCanada flex flex-col gap-2 p-3'>
                                    <div className='flex gap-1 text-blueHour'>
                                        <GrBook size={22} />
                                        <span className='font-semibold'>Reportes de Libros</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-2xl font-semibold'>{moderatorSelected?.reportes_resueltos_libros}</span>
                                            <span className='text-sm text-gray-600'>Resueltos</span>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-2xl font-semibold'>{moderatorSelected?.reportes_rechazados_libros}</span>
                                            <span className='text-sm text-gray-600'>Rechazados</span>
                                        </div>
                                    </div>
                                </article>
                                <article className='bg-coldCanada flex flex-col gap-2 p-3'>
                                    <div className='flex gap-1 text-flirtyRose'>
                                        <MdOutlineComment size={22} />
                                        <span className='font-semibold'>Reportes de Comentarios</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-2xl font-semibold'>{moderatorSelected?.reportes_resueltos_comentarios}</span>
                                            <span className='text-sm text-gray-600'>Resueltos</span>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-2xl font-semibold'>{moderatorSelected?.reportes_rechazados_comentarios}</span>
                                            <span className='text-sm text-gray-600'>Rechazados</span>
                                        </div>
                                    </div>
                                </article>
                                <article className='bg-coldCanada flex flex-col gap-2 p-3'>
                                    <div className='flex gap-1 text-firecracker'>
                                        <FaRegUser size={22} />
                                        <span className='font-semibold'>Reportes de Usuarios</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-2xl font-semibold'>{moderatorSelected?.reportes_resueltos_usuarios}</span>
                                            <span className='text-sm text-gray-600'>Resueltos</span>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-2xl font-semibold'>{moderatorSelected?.reportes_rechazados_usuarios}</span>
                                            <span className='text-sm text-gray-600'>Rechazados</span>
                                        </div>
                                    </div>
                                </article>
                            </div> 
                        </> :
                        <span>No se ha seleccionado ningún moderador</span>
                    }
                </div>
            </div>
        </>
    )

}