'use client'

import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { LuEye } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { PiStarThin } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import { FaRegImage } from 'react-icons/fa6'
import { PiWarningBold } from 'react-icons/pi'
import { GoListUnordered } from 'react-icons/go'

import { addNumberFormat } from '@/utils'
import Modal from '@/components/common/modal'
import Loader from '@/components/common/loader'
import ServiciosDeLibro from '@/services/libro'
import ServiciosDeResenha from '@/services/resenha'
import SelectorDeResenhas from '@/components/libros/selectorDeResenhas'
import SeccionDeComentarios from '@/components/libros/seccionDeComentarios'

export default function Libro({ params }) {

    const router = useRouter()

    const [libro, setLibro] = useState(null)
    const [resenha, setResenha] = useState(null)
    const [motivoReporte, setMotivoReporte] = useState('')
    const [mostrarModalDeReportarLibro, setMostrarModalDeReportarLibro] = useState(false)

    const traerLibro = async () => {
        const result = await ServiciosDeLibro.obtenerPorId(params.id)
        if (result?.error) {
            router.push('/libros') // en caso de no encontrar un libro se redirige a la lista de libros
        } else {
            setLibro(result)
        }
    }

    const traerResenha = async () => {
        const result = await ServiciosDeResenha.obtenerPorLibroYUsuario({ libro_id: params.id, user_id: localStorage?.getItem('user_id') })
        setResenha(result)
    }

    const actualizarResenha = async puntuacion => {
        const result = await ServiciosDeResenha.crearOEditar({ libro_id: params.id, puntuacion})
        setResenha(result?.resenha)
    }

    const reportarLibro = async () => {
        toast.error('Falta implementar en la API')
        setMostrarModalDeReportarLibro(false)
    }

    useEffect(() => {
        traerLibro()
        traerResenha()
    }, [params.id])

    return (
        <>
            {!Boolean(libro) && <Loader />}
            <Modal open={Boolean(mostrarModalDeReportarLibro)}
                onHide={() => setMostrarModalDeReportarLibro(false)}
                onSave={reportarLibro}
                title='Denunciar Libro'>
                <div className='flex flex-col gap-2'>
                    <span>Indícanos el motivo de tu reporte</span>
                    <textarea className='text-xs border rounded-lg p-3 flex-grow border-gray-400 outline-none' 
                        value={motivoReporte} 
                        onChange={event => setMotivoReporte(event.target.value)} 
                        rows={2} />
                </div>
            </Modal>
            <div className='flex flex-col gap-3'>
                <section className='flex flex-grow flex-wrap shadow-lg'>
                    <div className='flex justify-center items-center min-w-96 w-full lg:w-1/2'>
                        <div className='flex gap-5 p-10 flex-col sm:flex-row sm:p-3 md:p-12 xl:p-16'>
                            <div className='flex justify-center items-center'>
                                <div className='flex justify-center items-center w-44 h-42 bg-colorPrimario text-white'>
                                    {libro?.portada?
                                        <Image src={libro.portada} width={180} height={180} alt='Portada De Libro' priority={true}/> 
                                            : <FaRegImage size={35}/>
                                    }
                                </div>
                            </div>
                            <div className='flex-grow p-3 flex flex-col gap-3'>
                                <h1 className='font-extrabold text-xl'>{libro?.titulo}</h1>
                                <div className='flex'>
                                    <div className='flex flex-col items-center flex-grow pr-2'>
                                        <div className='flex gap-1 items-center text-gray-400'>
                                            <LuEye />
                                            <span className='text-sm'>Lecturas</span>
                                        </div>
                                        <span className='font-semibold'>{addNumberFormat(libro?.cantidad_lecturas)}</span>
                                    </div>
                                    <div className='flex flex-col items-center flex-grow px-2 border-r border-l border-gray-400'>
                                        <div className='flex gap-1 items-center text-gray-400'>
                                            <PiStarThin strokeWidth={10}/>
                                            <span className='text-sm'>Votos</span>
                                        </div>
                                        <span className='font-semibold'>{addNumberFormat(libro?.puntuacion_media)}</span>
                                    </div>
                                    <div className='flex flex-col items-center flex-grow pl-2'>
                                        <div className='flex gap-1 items-center text-gray-400'>
                                            <GoListUnordered />
                                            <span className='text-sm'>Partes</span>
                                        </div>
                                        <span className='font-semibold'>0</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 text-white text-xs'>
                                    <Link href={`/libros/${params.id}/leer`}>
                                        <button className='h-9 rounded-md bg-colorPrimario w-full'>
                                            Comenzar a Leer
                                        </button>
                                    </Link>
                                    <button className='h-9 rounded-md bg-gray-500' onClick={() => toast.error('Implementar en otro ticket')}>
                                        Añadir a Favoritos
                                    </button>
                                    <button className='h-9 rounded-md bg-gray-500' onClick={() => toast.error('Implementar en otro ticket')}>
                                        Descargar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative flex justify-center items-center min-w-96 w-full lg:w-1/2'>
                        <div className='flex flex-col gap-2 p-9 lg:p-16'>
                            <h2 className='font-semibold'>Sinopsis:</h2>
                            <p className='text-[10px]'>
                                {libro?.sinopsis}
                            </p>
                        </div>
                        <button className='absolute bottom-5 right-10 bg-none outline-none border-none text-red-600 flex gap-1' onClick={() => setMostrarModalDeReportarLibro(true)}>
                            <span>
                                <PiWarningBold />
                            </span>
                            <span className='text-xs whitespace-nowrap'>
                                Denunciar este libro
                            </span>
                        </button>
                        <div className='absolute top-10 right-10'>
                            <SelectorDeResenhas currentPoint={resenha?.puntuacion ?? 0} onSelect={actualizarResenha}/>
                        </div>
                    </div>
                </section>
                <SeccionDeComentarios libro_id={params.id} />
            </div>
        </>
    )

}