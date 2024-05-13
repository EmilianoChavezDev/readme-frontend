'use client'

import { useEffect, useState } from 'react'

import useReport from '@/hooks/useReport'
import { useAccountContext } from '@/contexts/AccountProvider'
import AddModeratorModal from '@/components/accounts/addModeratorModal'

export default function Page() {

    const [currentPage, setCurrentPage] = useState(1)

    const { getModeratorStatistics } = useReport()
    const { showAddModeratorModal, setShowAddModeratorModal } = useAccountContext()

    const fetchModerators = async () => {
        let params = { page: currentPage}
        const result = await getModeratorStatistics(params)
        console.log(result)
    }

    const reloadData = () => {
        currentPage === 1? fetchModerators() : setCurrentPage(1)
    }

    useEffect(() => {
        fetchModerators()
    }, [currentPage])

    return (
        <>
            <AddModeratorModal show={showAddModeratorModal} 
                onHide={() => setShowAddModeratorModal(false)}
                onSave={reloadData} />
            <div className='flex flex-col gap-2'>
                <h1>Admin de Moderadores</h1>
            </div>
        </>
    )

}