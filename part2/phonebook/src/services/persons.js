import axios from 'axios'
// const baseURL = "https://stark-woodland-44857.herokuapp.com/api/persons"
const baseURL = "http://localhost:3001/api/persons"

const getPersons = () => {
     const request = axios.get(baseURL)
     return request.then(response => response.data)
}

const postPerson = (person) => {
    const request =  axios.post(baseURL,person)
    return request.then( response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then( response => response.data)
}

const putPerson = (newPhonebook,id) => {
    const request = axios.put(`${baseURL}/${id}`,newPhonebook)
    return request.then(response => response.data)
}
export default {
    getPersons,
    postPerson,
    deletePerson,
    putPerson
}