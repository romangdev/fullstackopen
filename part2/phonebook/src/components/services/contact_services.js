import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newPersonObject) => {
  const request = axios.post(baseUrl, newPersonObject)
  return request.then(response => response.data)
}

const destroy = id => {
  axios.delete(`${baseUrl}/${id}`)
}

const contactService = { getAll, create, destroy }

export default contactService