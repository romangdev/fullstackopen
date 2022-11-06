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

const update = (updatedPerson, originalPerson) => {
  console.log('udpating')
  const request = axios.put(`${baseUrl}/${originalPerson.id}`, updatedPerson)
  return request.then(response => response.data).catch(error => {
    console.log('ERROR')
    return true
  })
}

const contactService = { getAll, create, destroy, update }

export default contactService