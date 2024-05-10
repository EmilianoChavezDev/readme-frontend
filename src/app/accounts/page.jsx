'use client'

import Link from 'next/link'
import { ImBin2 } from 'react-icons/im'
import { FaChartBar, FaUser } from 'react-icons/fa'
import { MdAdminPanelSettings, MdPrivacyTip } from 'react-icons/md'

import { useUser } from '@/contexts/UserProvider'

const Page = () => {

    const { username } = useUser()

    return (
        <div className='flex p-6 sm:py-8 sm:px-20 flex-col gap-3 sm:gap-10'>
            <h1 className='font-bold text-2xl text-textHeaderColorGray dark:text-white'>Mi cuenta</h1>
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
                <Link href={`/accounts/edit/${username}`} 
                    className='cursor-pointer rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 hover:scale-105 w-full'>
                    <div className='flex flex-row sm:flex-col items-center sm:items-start p-3 gap-4'>
                        <span className='w-8 h-8'>
                            <FaUser className='size-10'/>
                        </span>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold'>Información personal</h2>
                            <p className='text-sm text-gray-700'>Proporcionar o cambiar datos personales, actualiza tu contraseña</p>
                        </div>
                    </div>
                </Link>
                <Link href='/accounts/statistics'
                    className='cursor-pointer rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 hover:scale-105 w-full'>
                    <div className='flex flex-row sm:flex-col items-center sm:items-start p-3 gap-4'>
                        <span className='w-8 h-8'>
                            <FaChartBar className='size-10'/>
                        </span>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold'>Estadísticas</h2>
                            <p className='text-sm text-gray-700'>Obtener un informe de las interacciones de los usuarios con los libros publicados</p>
                        </div>
                    </div>
                </Link>
                <Link href='/books/recycle' 
                    className='cursor-pointer rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 hover:scale-105 w-full'>
                    <div className='flex flex-row sm:flex-col items-center sm:items-start p-3 gap-4'>
                        <span className='w-8 h-8'>                        
                            <ImBin2 className='size-9'/>
                        </span>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold'>Papelera</h2>
                            <p className='text-sm text-gray-700'>Explora tu historial de eliminaciones para recuperar tus libros y capítulos</p>
                        </div>
                    </div>
                </Link>
                <Link href='/about/privacy_policy'
                    className='cursor-pointer rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 hover:scale-105 w-full'>
                    <div className='flex flex-row sm:flex-col items-center sm:items-start p-3 gap-4'>
                        <span className='w-8 h-8'>
                            <MdPrivacyTip className='size-10'/>                        
                        </span>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold'>Políticas de Privacidad</h2>
                            <p className='text-sm text-gray-700'>Mira nuestras políticas de Privacidad</p>
                        </div>
                    </div>              
                </Link>
                <Link href='/accounts/admin/banned_books' 
                    className='cursor-pointer rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 hover:scale-105 w-full'>
                    <div className='flex flex-row sm:flex-col items-center sm:items-start p-3 gap-4'>
                        <span className='w-8 h-8'>
                            <MdAdminPanelSettings className='size-11'/>                        
                        </span>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold'>Administración</h2>
                            <p className='text-sm text-gray-700'>Gestiona las cuentas, comentarios y libros baneados por moderadores</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )

}

export default Page
