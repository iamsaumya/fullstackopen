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
  const request = await axios.post('/api/login',credentials)
  return request.data

}

const createBlog = async blog => {
  const header = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl,blog,header)
  return response.data
}

const updateBlog = async blog => {
  const header = {
    headers: { Authorization: token }
  }

  const response = await axios.patch(`${baseUrl}/${blog.id}`,{ likes: blog.likes },header)
  return response.data
}

const removeBlog = async blog => {
  const header  = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`,header)
}

export default { getAll, login, setToken, createBlog, updateBlog, removeBlog }