import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const login = async credentials => {
  const request = await axios.post("/api/login",credentials)
  return request.data

}

const createBlog = async blog => {
  const header = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl,blog,header)
  return response.data
}

export default { getAll, login, setToken, createBlog }