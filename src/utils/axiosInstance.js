import axios from 'axios'

const AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL, headers: { 'Content-Type': 'application/json' } })

const get = async ({ path, id, params = {} }) => {
    let access_token = localStorage.getItem('token')
    const { data, status } = await AxiosInstance.get(id? `${path}/${id}` : path, { validateStatus: false, params, headers: { Authorization: `Bearer ${access_token}` } })
    return status >= 200 && status <= 300 ? data : null
}

const post = async ({ path, params = {} }) => {
    let access_token = localStorage.getItem('token')
    const { data, status } = await AxiosInstance.post(path, params, { validateStatus: false,  headers: { Authorization: `Bearer ${access_token}` } })
    return status >= 200 && status <= 300 ? data : null
}

const put = async ({ path, id, params = {} }) => {
    let access_token = localStorage.getItem('token')
    const { data, status } = await AxiosInstance.put(`${path}/${id}`, params, { validateStatus: false, headers: { Authorization: `Bearer ${access_token}` } })
    return status >= 200 && status <= 300 ? data : null
}

const destroy = async ({ path, id }) => {
    let access_token = localStorage.getItem('token')
    const { data, status } = await AxiosInstance.delete(`${path}/${id}`, { validateStatus: false, headers: { Authorization: `Bearer ${access_token}` } })
    return status >= 200 && status <= 300 ? data : null
}


export default { get, post, put, destroy }