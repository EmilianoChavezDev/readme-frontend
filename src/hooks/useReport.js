'use client'

import axios from 'axios'
import { useState } from 'react'

const useReport = () => {

    const REPORT_ENDPOINT = '/informe'

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Create an axios instance with the base URL and token
    const api = axios.create({ baseURL: process.env.API_URL })

    const handleRequest = async requestFunction => {
        setIsLoading(true)
        try {
            const res = await requestFunction()
            return res.data
        } catch (error) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    // Functions to interact with the API
    const getDailyReadingsPerBook = async (params = {}) => {
        return handleRequest(() => api.get(`${REPORT_ENDPOINT}/lectura`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getUserStatistics = async (params = {}) => {
        return handleRequest(() => api.get(`${REPORT_ENDPOINT}/estadisticas_usuario`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    return { getDailyReadingsPerBook, getUserStatistics, error, isLoading }
}

export default useReport