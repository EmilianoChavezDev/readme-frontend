'use client'

import moment from 'moment'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Input, Option, Select } from '@material-tailwind/react'

import useReport from '@/hooks/useReport'
import Modal from '@/components/common/modal'

export default function Page() {

    const { register, watch } = useForm()
    const { getBookReportCategories, getReports } = useReport()

    const [data, setData] = useState(null)
    const [reportConclusion, setReportConclusion] = useState('')
    const [reportSelected, setReportSelected] = useState(null)
    const [showReportRejectModal, setShowReportRejectModal] = useState(false)
    const [categorySelectedToSearch, setCategorySelectedToSearch] = useState('')
    const [showBookDeactivationModal, setShowBookDeactivationModal] = useState(false)

    const { date_from, date_to, title } = watch()

    const fetchData = async () => {
        console.log('Valores del formulario:', { date_from, date_to, title, categorySelectedToSearch })
        const result = await getReports()
        setData(result)
        if (result?.data?.length) {
            setReportSelected(result?.data[0])
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchData()
        }, 300)
        return () => clearTimeout(timeoutId)
    }, [date_from, date_to, title, categorySelectedToSearch])

    return (
        <>
            <Modal open={showReportRejectModal} 
                onHide={() => setShowReportRejectModal(false)}
                onSave={() => {}} 
                title='Confirmar Acción'>
                <p>¿Estás seguro de rechazar este reporte?</p>
            </Modal>
            <Modal open={showBookDeactivationModal} 
                variant='danger'
                onHide={() => {
                    setShowBookDeactivationModal(false)
                    setReportConclusion('')
                }}
                disableSubmit={!reportConclusion.length}
                onSave={() => {}} 
                title='Confirmar Acción'>
                <div className='flex flex-col gap-3'>
                    <p>{`¿Estás seguro de desactivar el libro ${reportSelected?.titulo_de_libro}?`}</p>
                    <div className='flex flex-col gap-1'>
                        <span>Escribe la conclusión sobre este reporte <b className='text-red-900'>*</b></span>
                        <textarea
                            className="text-md border rounded-lg p-3 flex-grow text-gray-900 border-gray-400 outline-none"
                            value={reportConclusion}
                            onChange={(event) => setReportConclusion(event.target.value)}
                            rows={2}
                        />
                    </div>
                </div>
            </Modal>
            <div className='relative flex flex-col gap-9 px-20 py-9'>
                <h1 className='font-bold text-gray-800 text-3xl leading-8'>
                    Bandeja de Reportes
                </h1>
                <div className='flex gap-3'>
                    <div className='flex grow flex-col gap-3'>
                        <div className='flex justify-between'>
                            <form className='flex gap-3'>
                                <div className='relative !max-w-32'>
                                    <Input {...register('date_from')}
                                        labelProps={{ className: '!max-w-32' }}
                                        containerProps={{ className: '!min-w-32 !max-w-32' }}
                                        type='date'
                                        label='Desde' />
                                </div>
                                <div className='relative !max-w-32'>
                                    <Input {...register('date_to')}
                                        labelProps={{ className: '!max-w-32' }}
                                        containerProps={{ className: '!min-w-32 !max-w-32' }}
                                        type='date'
                                        label='Hasta' />
                                </div>
                                <div className='relative !max-w-40'>
                                    <Input {...register('title')}
                                        label='Título' />
                                </div>
                            </form>
                        </div>
                        <div className='flex flex-col items-center gap-3 border border-gray-300 rounded-md py-5 px-2'>
                            <h1 className='text-xl font-semibold'>Lista de Reportes</h1>
                            <table className='w-full'>
                                <thead>
                                    <tr className='h-14 border-b border-gray-200'>
                                        <th className='text-start font-semibold'>Fecha</th>
                                        <th className='text-start font-semibold'>Libro</th>
                                        <th className='text-start font-semibold'>Reportado por</th>
                                        <th className='text-start font-semibold'>Categoría</th>
                                        <th className='text-start font-semibold'>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>{data?.data?.map((report, index) =>
                                    <tr key={index} className={`h-14 hover:bg-green-100 cursor-pointer ${
                                        report.id === reportSelected.id
                                        ? 'border-t border-t-gray-400 border-b-2 border-b-colorPrimario'
                                        : 'border-t border-gray-400'
                                    }`} onClick={() => setReportSelected(report)}>
                                        <td className={`text-start font-normal ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {moment(report.created_at).format('DD-MM-YYYY')}
                                        </td>
                                        <td className={`text-start font-normal ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {report.titulo_de_libro}
                                        </td>
                                        <td className={`text-start font-normal ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {report.reportado_por}
                                        </td>
                                        <td className={`text-start font-normal ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {report.categoria}
                                        </td>
                                        <td className={`text-start font-normal capitalize ${report.id === reportSelected.id? 'text-colorPrimario font-semibold' : 'text-gray-800'}`}>
                                            {report.estado}
                                        </td>
                                    </tr>
                                )}</tbody>
                            </table>
                        </div>
                    </div>
                    <div className='w-96 flex flex-col gap-6'>
                        <div className='flex items-center'>
                            <h2 className='font-bold text-gray-800 text-xl leading-7'>Detalle del Reporte</h2>
                        </div>
                        <div className='border border-gray-300 rounded-md p-3 flex flex-col gap-3'>
                            <div className='flex gap-1'>
                                <span className='font-semibold'>Título:</span>
                                <span>{reportSelected?.titulo_de_libro}</span>
                            </div>
                            <div className='flex gap-1'>
                                <span className='font-semibold'>Estado:</span>
                                <span className='capitalize'>{reportSelected?.estado}</span>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold'>Motivo:</span>
                                <p>{reportSelected?.motivo}</p>
                            </div>
                        </div>
                        <div className='flex justify-between text-white'>
                            <div className='flex gap-2'>
                                <button className='h-10 rounded-md px-2 bg-red-900 hover:brightness-90' 
                                    onClick={() => setShowBookDeactivationModal(true)}>
                                    Desactivar Libro
                                </button>
                                <button className='h-10 rounded-md px-2 bg-cyan-700 hover:brightness-90' 
                                    onClick={() => setShowReportRejectModal(true)}>
                                    Rechazar
                                </button>
                            </div>
                            <Link href={`/books/${reportSelected?.libro_id}`}>
                                <button className='h-10 bg-colorPrimario hover:bg-colorHoverPrimario rounded-md px-2'>
                                    Ver Libro
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}