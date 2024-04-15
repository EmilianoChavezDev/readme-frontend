'use client'

import axios from 'axios'
import { useState } from 'react'

const useReport = () => {

    const ANALYSIS_ENDPOINT = '/informe'
    const REPORTS_ENDPOINT = '/reportes'
    const BOOK_REPORTS_ENDPOINT = '/reportes_libros'

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
        return handleRequest(() => api.get(`${ANALYSIS_ENDPOINT}/lectura`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getUserStatistics = async (params = {}) => {
        return handleRequest(() => api.get(`${ANALYSIS_ENDPOINT}/estadisticas_usuario`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const createBookReport = async (params = {}) => {
        return handleRequest(() => api.post(BOOK_REPORTS_ENDPOINT, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getBookReportCategories = async (params = {}) => {
        return handleRequest(() => api.get(`${REPORTS_ENDPOINT}/categorias/libros`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getReports = async (params = {}) => {
        return handleRequest(() => api.get(`${REPORTS_ENDPOINT}/find_by`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    return { getDailyReadingsPerBook, getUserStatistics, createBookReport, getReports, getBookReportCategories, error, isLoading }
}

export default useReport