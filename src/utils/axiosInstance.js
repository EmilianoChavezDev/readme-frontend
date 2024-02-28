import axios from 'axios'

const AxiosInstance = axios.create({ baseURL: process.env.API_URL })

const get = async ({ path, id, params = {} }) => {
    let access_token = localStorage.getItem('token')
    const { data } = await AxiosInstance.get(id? `${path}/${id}` : path, { validateStatus: false, params, headers: { Authorization: `Bearer ${access_token}` } })
    return data
}

const post = async ({ path, params = {} }) => {
    let access_token = localStorage.getItem('token')
    const { data } = await AxiosInstance.post(path, params, { validateStatus: false,  headers: { Authorization: `Bearer ${access_token}` } })
    return data
}

const put = async ({ path, id, params = {} }) => {
    let access_token = localStorage.getItem('token')
    const { data } = await AxiosInstance.put(`${path}/${id}`, params, { validateStatus: false, headers: { Authorization: `Bearer ${access_token}` } })
    return data
}

const destroy = async ({ path, id }) => {
    let access_token = localStorage.getItem('token')
    const { data } = await AxiosInstance.delete(`${path}/${id}`, { validateStatus: false, headers: { Authorization: `Bearer ${access_token}` } })
    return data
}


export default { get, post, put, destroy }