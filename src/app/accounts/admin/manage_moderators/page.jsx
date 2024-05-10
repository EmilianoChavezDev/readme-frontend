'use client'

import { useAccountContext } from '@/contexts/AccountProvider'

export default function Page() {

    const { showAddModeratorModal } = useAccountContext()

    return (
        <div className='flex flex-col gap-2'>
            <h1>Admin de Moderadores</h1>
            <span>{showAddModeratorModal && 'Boton activado'}</span>
        </div>
    )

}