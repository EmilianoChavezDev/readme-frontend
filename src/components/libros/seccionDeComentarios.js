'use client'
import 'moment/locale/es'

import moment from 'moment'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { VscKebabVertical } from 'react-icons/vsc'
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'

import Modal from '@/components/common/modal'
import { useUser } from '@/contexts/UserProvider'
import ServiciosDeComentario from '@/services/comentario'

export default function SeccionDeComentarios({ libro_id }) {

    moment.locale('es')
    const TAMANHO_DE_PAGINACION_DE_COMENTARIOS = 5
    const { username } = useUser()

    const [comentario, setComentario] = useState('')
    const [comentarios, setComentarios] = useState({ lista: [] })
    const [paginacionDeComentarios, setPaginacionDeComentarios] = useState(1)
    const [idDeComentarioAEliminar, setIdDeComentarioAEliminar] = useState(null)

    const traerComentarios = async () => {
        const data = await ServiciosDeComentario.obtenerPorLibroYUsuario({ libro_id, page: paginacionDeComentarios, size: TAMANHO_DE_PAGINACION_DE_COMENTARIOS })
        const { resultado, cant_paginas } = data ?? {}
        let copiaDeComentarios = {...comentarios}
        setComentarios({ cant_paginas, lista: [...copiaDeComentarios.lista, ...resultado] })
    }

    const agregarComentario = async () => {
        await ServiciosDeComentario.crear({ libro_id, comentario })
        const data = await ServiciosDeComentario.obtenerPorLibroYUsuario({ libro_id, page: 1, size: TAMANHO_DE_PAGINACION_DE_COMENTARIOS })
        const { resultado, cant_paginas } = data ?? {}
        setComentarios({ cant_paginas, lista: resultado })
        setComentario('')
    }

    const eliminarComentario = async () => {
        const result = await ServiciosDeComentario.eliminar(idDeComentarioAEliminar)
        if (result?.error) {
            toast.error(result?.error)
        } else {
            toast.success('Comentario eliminado correctamente')
            const indexComentario = comentarios?.lista?.findIndex(comentario => comentario.id === idDeComentarioAEliminar)
            let listaDeComentarios = [...comentarios.lista]
            listaDeComentarios.splice(indexComentario, 1)
            console.log({...comentarios, lista: listaDeComentarios })
            setComentarios({...comentarios, lista: listaDeComentarios })
        }
        setIdDeComentarioAEliminar(null)
    }

    useEffect(() => {
        traerComentarios()
    }, [paginacionDeComentarios])

    return (
        <>
            <Modal open={Boolean(idDeComentarioAEliminar)}
                onHide={() => setIdDeComentarioAEliminar(null)}
                onSave={eliminarComentario}
                title='Eliminar Comentario'>
                <span>Estas seguro de eliminar este comentario?</span>
            </Modal>
            <section className='flex flex-wrap'>
                <div className='w-full lg:w-1/2 px-9 lg:px-16 min-w-96 py-4 flex flex-col gap-3'>
                    <span className='font-extrabold text-xl'>Comentarios</span>
                    <div className='flex gap-2 flex-wrap justify-end'>
                        <div className='flex gap-2 min-w-80 flex-grow'>
                            <div className='w-8 h-8 rounded-full bg-colorPrimario text-white flex justify-center items-center'>
                                {username?.charAt(0)?.toUpperCase()}
                            </div>
                            <textarea className='text-xs border rounded-lg p-3 flex-grow border-gray-400 outline-none' 
                                placeholder='Añadir un comentario' 
                                rows={5}
                                value={comentario}
                                onChange={event => setComentario(event.target.value)}
                                onFocus={event => event.target.select()}/>
                        </div>
                        <button className='bg-colorPrimario text-white h-9 px-3 rounded-lg disabled:cursor-not-allowed' onClick={agregarComentario} disabled={!Boolean(comentario?.trim()?.length)}>
                            Añadir
                        </button>
                    </div>
                </div>
                <div className='w-full lg:w-1/2 px-9 lg:px-16 py-4'>
                    <ul>
                        {comentarios?.lista?.map((item, index) =>
                            <li key={index} className='border-b-[1px] border-gray-300 pb-2'>
                                <div className='text-xs flex flex-col gap-2'>
                                    <header className='flex justify-between flex-grow'>
                                        <div className='flex gap-2 items-center h-10'>
                                            <div className='w-8 h-8 rounded-full bg-colorPrimario text-white flex justify-center items-center'>
                                                {item.username.charAt(0).toLocaleUpperCase()}
                                            </div>
                                            <span className='text-black font-bold'>{item.username}</span>
                                            <span className='text-gray-400 whitespace-nowrap'>{moment(item.created_at).startOf('minutes').fromNow()}</span>
                                        </div>
                                        <Popover placement='left'>
                                            <PopoverHandler>
                                                <button className='h-9'>
                                                    <VscKebabVertical size={15} />
                                                </button>
                                            </PopoverHandler>
                                            <PopoverContent className='shadow-lg p-1 border-gray-400'>
                                                <div className='p-1 text-xs text-black'>
                                                    {item.username === username &&
                                                        <span className='cursor-pointer text-gray-700 hover:text-black' onClick={() => setIdDeComentarioAEliminar(item.id)}>
                                                            Eliminar
                                                        </span>
                                                    }
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </header>
                                    <p>{item?.comentario}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className='flex justify-center py-1'>
                        {paginacionDeComentarios < comentarios.cant_paginas &&
                            <button className='bg-colorPrimario text-white h-9 rounded-md px-3 text-xs' onClick={() => setPaginacionDeComentarios(paginacionDeComentarios + 1)}>
                                Ver más
                            </button>
                        }
                    </div>
                </div>
            </section>
        </>
    )

}