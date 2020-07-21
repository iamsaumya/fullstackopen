import axios from 'axios'
const baseURL = "/api/persons"

const getPersons = async () => {
     const request = axios.get(baseURL)
     const response = await request
    return response.data
}

const postPerson = async (person) => {
    const request = axios.post(baseURL,person)
    const response = await request
    return response.data
}

const deletePerson = async (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    const response = await request
    return response.data
}

const putPerson = async (newPhonebook,id) => {
    const request = axios.put(`${baseURL}/${id}`,newPhonebook)
    const response = await request
    return response.data
}
export default {
    getPersons,
    postPerson,
    deletePerson,
    putPerson
}