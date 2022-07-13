import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPersonObject => {
    const request = axios.post(baseUrl, newPersonObject)
    return request.then(response => response.data)
}

const makeDeletion = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
}

const replace = (id, newPersonObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newPersonObject)
    return request.then(response => response.data)
}

export default { getAll, create, makeDeletion, replace }