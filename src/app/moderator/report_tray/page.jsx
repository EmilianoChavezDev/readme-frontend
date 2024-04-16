'use client'

import moment from 'moment'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Option, Select } from '@material-tailwind/react'

import useBook from '@/hooks/useBook'
import useReport from '@/hooks/useReport'
import useUserInfo from '@/hooks/useUser'
import useComment from '@/hooks/useComment'
import Modal from '@/components/common/modal'
import Pagination from '@/components/common/Pagination'
import Loader from '@/components/common/loader'

export default function Page() {

    const STATUS = {
        pendiente: { key: 'pendiente', value: 'Pendiente' },
        en_revision: { key: 'en_revision', value: 'En Revisión' },
        aceptado: { key: 'aceptado', value: 'Aceptado' },
        rechazado: { key: 'rechazado', value: 'Rechazado' },
        resuelto: { key: 'resuelto', value: 'Resuelto' }
    }

    const router = useRouter()
    const { deleteBook } = useBook()
    const { deleteUser } = useUserInfo()
    const { deleteComment } = useComment()
    const { getReports, updateBookReport, updateCommentReport, updateUserReport, isLoading } = useReport()

    const [currentPage, setCurrentPage] = useState(1)
    const [reportsData, setReportsData] = useState(null)
    const [statusToSearch, setStatusToSearch] = useState('')
    const [reportSelected, setReportSelected] = useState(null)
    const [reportConclusion, setReportConclusion] = useState('')
    const [showReportRejectModal, setShowReportRejectModal] = useState(false)
    const [showReportApproveModal, setShowReportApproveModal] = useState(false)

    const fetchData = async () => {
        const result = await getReports({ page: currentPage, estado: statusToSearch })
        let mappedValues = {
            ...result, 
            data: result?.data?.map(report => ({...report, tipo: report.comentario? 'Comentario' : report.usuario_reportado? 'Usuario' : 'Libro' }))
        }
        setReportsData(mappedValues)
        if (mappedValues?.data?.length) {
            setReportSelected(mappedValues?.data[0])
        }
    }

    const handleReloadListValues = (report) => {
        let listCopy = [...reportsData.data]
        let itemIndex = listCopy.findIndex(r => r.id === reportSelected.id)
        let itemCopy = {...listCopy[itemIndex], estado: report?.estado, conclusion: report.conclusion}
        listCopy[itemIndex] = {...itemCopy}
        setReportsData({...reportsData, data: listCopy})
        setReportSelected(itemCopy)
    }

    const handleUpdateReportStatus = async estado => {
        const result = reportSelected.tipo === 'Usuario'? await updateUserReport(reportSelected.id, { estado }) :
            reportSelected.tipo === 'Comentario'? await updateCommentReport(reportSelected.id, { estado }) : 
                await updateBookReport(reportSelected.id, { estado })
        if (result?.reporte) {
            handleReloadListValues(result?.reporte)
        } else {
            toast.error('No se pudo actualizar el estado')
        }
    }

    const handleApproveReport = async () => {
        let params = { estado: 'resuelto', conclusion: reportConclusion }
        const result = reportSelected.tipo === 'Usuario'? await updateUserReport(reportSelected.id, params) :
            reportSelected.tipo === 'Comentario'? await updateCommentReport(reportSelected.id, params) : 
                await updateBookReport(reportSelected.id, params)
        if (result?.reporte) {
            handleReloadListValues(result?.reporte)
            if (reportSelected.tipo === 'Usuario') {
                const userResult = await deleteUser(reportSelected?.usuario_reportado?.id)
                !userResult && toast.error('EL usuario no pudo ser desactivado')
            } else if (reportSelected.tipo === 'Comentario') {
                const commentResult = await deleteComment(reportSelected?.comentario?.id)
                !commentResult && toast.error('El comentario no pudo ser eliminado')
            } else {
                const bookResult = await deleteBook(reportSelected?.libro_id)
                !bookResult && toast.error('EL libro no pudo ser desactivado')
            }
        } else {
            toast.error('No se pudo aprobar el reporte')
        }
        setShowReportApproveModal(false)
        setReportConclusion('')
    }

    const handleRejectReport = async () => {
        let params = { estado: 'rechazado', conclusion: reportConclusion }
        const result = reportSelected.tipo === 'Usuario'? await updateUserReport(reportSelected.id, params) :
            reportSelected.tipo === 'Comentario'? await updateCommentReport(reportSelected.id, params) : 
                await updateBookReport(reportSelected.id, params)
        if (result?.reporte) {
            handleReloadListValues(result?.reporte)
        } else {
            toast.error('No se pudo rechazar el reporte')
        }
        setShowReportRejectModal(false)
        setReportConclusion('')
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchData()
        }, 300)
        return () => clearTimeout(timeoutId)
    }, [statusToSearch, currentPage])

    useEffect(() => {
        if (localStorage.getItem('role') !== 'moderador') {
            toast.error('Usuario no autorizado')
            router.push('/')
        }
    }, [])

    return (
        <>
            <div className='relative flex flex-col gap-9 px-20 py-9'>
                {isLoading && <Loader />}
                <h1 className='font-bold text-gray-800 text-3xl leading-8'>
                    Bandeja de Reportes
                </h1>
                <div className='flex gap-3'>
                    <div className='flex grow flex-col gap-3'>
                        <div className='flex justify-between'>
                            <form className='flex gap-3'>
                                <div className='relative !max-w-32'>
                                <Select
                                    label='Estado'
                                    className='!max-w-40'
                                    containerProps={{ className: '!min-w-40 !max-w-40' }}
                                    labelProps={{ className: '!max-w-40' }}
                                    value={statusToSearch}
                                    onChange={(value) => {
                                        setStatusToSearch(value)
                                        setCurrentPage(1)
                                    }} >
                                    {[{key: '', value: 'Todos'}, ...Object.values(STATUS)]?.map((state, index) => (
                                    <Option key={index} className='min-h-9' value={state.key}>
                                        {state.value}
                                    </Option>
                                    ))}
                                </Select>
                                </div>
                            </form>
                        </div>
                        <div className='flex flex-col items-center gap-3 border border-gray-300 rounded-md py-5 px-2'>
                            <h1 className='text-xl font-semibold'>Lista de Reportes</h1>
                            <table className='w-full'>
                                <thead>
                                    <tr className='h-14 border-b border-gray-200'>
                                        <th className='text-start font-semibold'>Fecha</th>
                                        <th className='text-start font-semibold'>Tipo de Reporte</th>
                                        <th className='text-start font-semibold'>Reportado por</th>
                                        <th className='text-start font-semibold'>Categoría</th>
                                        <th className='text-start font-semibold'>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>{reportsData?.data?.map((report, index) =>
                                    <tr key={index} className={`h-14 hover:bg-green-100 cursor-pointer ${
                                        report.id === reportSelected.id
                                        ? 'border-t border-t-gray-400 border-b-2 border-b-colorPrimario'
                                        : 'border-t border-gray-400'
                                    }`} onClick={() => setReportSelected(report)}>
                                        <td className={`text-start font-normal ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {moment(report.created_at).format('DD-MM-YYYY')}
                                        </td>
                                        <td className={`text-start font-normal ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {report.tipo}
                                        </td>
                                        <td className={`text-start font-normal ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {report.reportado_por}
                                        </td>
                                        <td className={`text-start font-normal ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {report.categoria}
                                        </td>
                                        <td className={`text-start font-normal capitalize ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {STATUS[report.estado]?.value}
                                        </td>
                                    </tr>
                                )}</tbody>
                            </table>
                            <div className='flex justify-center'>
                                <Pagination currentPage={currentPage}
                                    totalPages={reportsData?.total_pages}
                                    onPageChange={setCurrentPage} />
                            </div>
                        </div>
                    </div>
                    <div className='w-96 flex flex-col gap-6'>
                        <div className='flex items-center'>
                            <h2 className='font-bold text-gray-800 text-xl leading-7'>Detalle del Reporte</h2>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <span className='font-semibold'>Estado:</span>
                            {reportSelected?.estado === 'rechazado'?
                                <span className='h-9 px-2 rounded-2xl flex items-center bg-cyan-700 text-white'>
                                    Rechazado
                                </span> :
                                reportSelected?.estado === 'resuelto'?
                                    <span className='h-9 px-2 rounded-2xl flex items-center bg-red-900 text-white'>
                                        Resuelto
                                    </span> :
                                    <>
                                        <button onClick={() => handleUpdateReportStatus('pendiente')}
                                            className={`h-9 px-2 rounded-2xl flex items-center hover:brightness-90 ${reportSelected?.estado === 'pendiente'? 'bg-colorPrimario text-white' : 'border border-colorPrimario text-colorPrimario'}`}>
                                            Pendiente
                                        </button>
                                        <button onClick={() => handleUpdateReportStatus('en_revision')}
                                            className={`h-9 px-2 rounded-2xl flex items-center hover:brightness-90 ${reportSelected?.estado === 'en_revision'? 'bg-colorPrimario text-white' : 'border border-colorPrimario text-colorPrimario'}`}>
                                            En Revisión
                                        </button>
                                        <button onClick={() => handleUpdateReportStatus('aceptado')}
                                            className={`h-9 px-2 rounded-2xl flex items-center hover:brightness-90 ${reportSelected?.estado === 'aceptado'? 'bg-colorPrimario text-white' : 'border border-colorPrimario text-colorPrimario'}`}>
                                            Aceptado
                                        </button>
                                    </>
                            }
                        </div>
                        <div className='border border-gray-300 rounded-md p-3 flex flex-col gap-3'>
                            <span className='font-semibold text-lg'>{`Reporte de ${reportSelected?.tipo ?? ''}`}</span>
                            {Boolean(reportSelected?.titulo_de_libro?.length) &&
                                <div className='flex gap-1'>
                                    <span className='font-semibold'>Libro:</span>
                                    <span className='text-gray-700'>{reportSelected?.titulo_de_libro}</span>
                                </div>
                            }
                            {Boolean(reportSelected?.comentario) &&
                                <div className='flex gap-1'>
                                    <span className='font-semibold'>Comentario:</span>
                                    <span className='text-gray-700'>{reportSelected?.comentario?.comentario}</span>
                                </div>
                            }
                            {Boolean(reportSelected?.usuario_reportado) &&
                                <div className='flex gap-1'>
                                    <span className='font-semibold'>Usuario Reportado:</span>
                                    <span className='text-gray-700'>{reportSelected?.usuario_reportado?.username}</span>
                                </div>
                            }
                            <div className='flex gap-1'>
                                <span className='font-semibold'>Estado:</span>
                                <span className='capitalize text-gray-700'>{reportSelected?.estado}</span>
                            </div>
                            <div className='flex flex-col gap-1 border-t border-colorPrimario pt-2'>
                                <span className='font-semibold'>Motivo:</span>
                                <p className='text-gray-700'>{reportSelected?.motivo}</p>
                            </div>
                            {(reportSelected?.estado === 'rechazado' || reportSelected?.estado === 'resuelto') &&
                                <div className='flex flex-col gap-1 border-t border-colorPrimario pt-2'>
                                    <span className='font-semibold'>Conclusiones:</span>
                                    <p className='text-gray-700'>{reportSelected?.conclusion}</p>
                                </div>
                            }
                        </div>
                        <div className='flex justify-between text-white'>
                            <div className='flex gap-2'>
                                {(reportSelected?.estado !== 'rechazado' && reportSelected?.estado !== 'resuelto') &&
                                    <button className='h-10 rounded-md px-2 bg-red-900 hover:brightness-90' 
                                        onClick={() => setShowReportApproveModal(true)}>
                                        {reportSelected?.tipo === 'Comentario'? 'Eliminar Comentario' :
                                            reportSelected?.tipo === 'Usuario'? 'Desactivar Perfil' :
                                                'Desactivar Libro'
                                        }
                                    </button>
                                }
                                {(reportSelected?.estado !== 'rechazado' && reportSelected?.estado !== 'resuelto') &&
                                    <button className='h-10 rounded-md px-2 bg-cyan-700 hover:brightness-90' 
                                        onClick={() => setShowReportRejectModal(true)}>
                                        Rechazar
                                    </button>
                                }
                            </div>
                            {reportSelected?.tipo === 'Usuario'?
                                <Link href={`/user/${reportSelected?.usuario_reportado?.username}`}>
                                    <button className='h-10 bg-colorPrimario hover:bg-colorHoverPrimario rounded-md px-2'>
                                        Ver Perfil
                                    </button>
                                </Link> :
                                <Link href={`/books/${reportSelected?.libro_id}`}>
                                    <button className='h-10 bg-colorPrimario hover:bg-colorHoverPrimario rounded-md px-2'>
                                        Ver Libro
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={showReportRejectModal} 
                onHide={() => {
                    setShowReportRejectModal(false)
                    setReportConclusion('')
                }}
                onSave={handleRejectReport}
                disableSubmit={!reportConclusion.length}
                title='Confirmar Acción'>
                <div className='flex flex-col gap-3'>
                <p>¿Estás seguro de rechazar este reporte?</p>
                    <div className='flex flex-col gap-1'>
                        <span>Escribe la conclusión sobre este reporte <b className='text-red-900'>*</b></span>
                        <textarea
                            className='text-md border rounded-lg p-3 flex-grow text-gray-900 border-gray-400 outline-none'
                            value={reportConclusion}
                            onChange={(event) => setReportConclusion(event.target.value)}
                            rows={2}
                        />
                    </div>
                </div>
            </Modal>
            <Modal open={showReportApproveModal}
                size='md'
                variant='danger'
                onHide={() => {
                    setShowReportApproveModal(false)
                    setReportConclusion('')
                }}
                disableSubmit={!reportConclusion.length}
                onSave={handleApproveReport} 
                title='Confirmar Acción'>
                <div className='flex flex-col gap-3'>
                    <p>{
                        reportSelected?.tipo === 'Usuario'? `¿Estás seguro de desactivar el perfil de ${reportSelected?.usuario_reportado?.username}?` :
                            reportSelected?.tipo === 'Comentario'? `¿Estás seguro de eliminar el comentario \"${reportSelected?.comentario?.comentario}\" del libro ${reportSelected?.titulo_de_libro}?` :
                                `¿Estás seguro de desactivar el libro \"${reportSelected?.titulo_de_libro}\"?`
                    }</p>
                    <div className='flex flex-col gap-1'>
                        <span>Escribe la conclusión sobre este reporte <b className='text-red-900'>*</b></span>
                        <textarea
                            className='text-md border rounded-lg p-3 flex-grow text-gray-900 border-gray-400 outline-none'
                            value={reportConclusion}
                            onChange={(event) => setReportConclusion(event.target.value)}
                            rows={2}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )

}