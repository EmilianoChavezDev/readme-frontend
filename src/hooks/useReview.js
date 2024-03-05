'use client'

import axios from 'axios'
import { useState } from 'react'

const useReview = () => {
    
    const REVIEWS_ENDPOINT = '/resenhas'

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Create an axios instance with the base URL
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
    const createOrUpdateReview = async params => {
        return handleRequest(() => api.post(REVIEWS_ENDPOINT, params, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getAllReviews = async params => {
        return handleRequest(() => api.get(REVIEWS_ENDPOINT, { params , headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}))
    }

    const getReviewByUserAndBook = async params => {
        return handleRequest(() => api.get(`${REVIEWS_ENDPOINT}/find_by`, { params, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const getReviewByID = async id => {
        return handleRequest(() => api.get(`${REVIEWS_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    const deleteReview = async id => {
        return handleRequest(() => api.delete(`${REVIEWS_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
    }

    return { createOrUpdateReview, getAllReviews, getReviewByID, deleteReview, getReviewByUserAndBook, error, isLoading }
}

export default useReview