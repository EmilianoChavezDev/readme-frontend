import Axios from '@/utils/axiosInstance'

const BASE_PATH = '/comentarios'

const obtener = params => Axios.get({ path: BASE_PATH, params }) 
const obtenerPorId = id => Axios.get({ path: BASE_PATH, id })
const obtenerPorLibroYUsuario = params => Axios.get({ path: `${BASE_PATH}/find_by`, params })
const crear = params => Axios.post({ path: BASE_PATH, params })
const editar = (id, params) => Axios.put({ path: BASE_PATH, params, id })
const eliminar = id => Axios.destroy({ path: BASE_PATH, id })

export default { obtener, obtenerPorId, obtenerPorLibroYUsuario, crear, editar, eliminar }