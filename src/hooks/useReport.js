'use client'

import axios from 'axios'
import { useState } from 'react'

const useReport = () => {

    const ANALYSIS_ENDPOINT = '/informe'
    const REPORTS_ENDPOINT = '/reportes'
    const BOOK_REPORTS_ENDPOINT = '/reportes_libros'
    const COMMENT_REPORTS_ENDPOINT = '/reportes_comentarios'
    const USER_REPORTS_ENDPOINT = '/reportes_usuarios'

    // post 'reportes_comentarios/update_all', to: 'reportes_comentarios#actualizar_muchos_reportes'
    // post 'reportes_libros/update_all', to: 'reportes_libros#actualizar_muchos_reportes'
    // post 'reportes_usuarios/update_all', to: 'reportes_usuarios#actualizar_muchos_reportes'

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

    const getReports = async (params = {}) => {
        return handleRequest(() => api.get(`${REPORTS_ENDPOINT}/find_by`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getReportByUserId = async (id,params ={}) =>{
        console.log(id,params)
        return handleRequest(() => api.get(`${REPORTS_ENDPOINT}/user/${id}`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateBookReport = async (id, params = {}) => {
        return handleRequest(() => api.put(`${BOOK_REPORTS_ENDPOINT}/${id}`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateCommentReport = async (id, params = {}) => {
        return handleRequest(() => api.put(`${COMMENT_REPORTS_ENDPOINT}/${id}`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateUserReport = async (id, params = {}) => {
        return handleRequest(() => api.put(`${USER_REPORTS_ENDPOINT}/${id}`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateAllBookReport = async (params = {}) => {
        return handleRequest(() => api.post(`${BOOK_REPORTS_ENDPOINT}/update_all`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateAllCommentReport = async (params = {}) => {
        return handleRequest(() => api.post(`${COMMENT_REPORTS_ENDPOINT}/update_all`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateAllUserReport = async (params = {}) => {
        return handleRequest(() => api.post(`${USER_REPORTS_ENDPOINT}/update_all`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    

    return { getDailyReadingsPerBook, getUserStatistics,getReportByUserId, getReports, updateBookReport, updateCommentReport, updateUserReport, updateAllBookReport,updateAllCommentReport, updateAllUserReport, error, isLoading }
}

export default useReport