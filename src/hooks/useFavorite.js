'use client'

import axios from 'axios'
import { useState } from 'react'

const useFavorite = () => {

    const FAVORITES_ENDPOINT = '/favoritos'

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
    const createFavorite = async params => {
        return handleRequest(() => api.post(FAVORITES_ENDPOINT, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getAllFavorites = async params => {
        return handleRequest(() => api.get(FAVORITES_ENDPOINT, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getFavoriteByUserAndBook = async params => {
        return handleRequest(() => api.get(`${FAVORITES_ENDPOINT}/find_by`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getFavoriteByUser = async params => {
        return handleRequest(() => api.get(`${FAVORITES_ENDPOINT}/user`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getFavoriteByID = async id => {
        return handleRequest(() => api.get(`${FAVORITES_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const updateFavorite = async (id, params) => {
        return handleRequest(() => api.put(`${FAVORITES_ENDPOINT}/${id}`, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const deleteFavorite = async id => {
        return handleRequest(() => api.delete(`${FAVORITES_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    return { createFavorite, getAllFavorites, getFavoriteByID, updateFavorite, deleteFavorite, getFavoriteByUserAndBook, getFavoriteByUser, error, isLoading }
}

export default useFavorite