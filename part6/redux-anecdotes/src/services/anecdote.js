import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdotes = async (anecdote) => {
    const response = await axios.post(baseUrl,anecdote)
    return response.data
}

const vote = async (anecdote) => {
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`,anecdote)
    return response.data
}
export default {getAnecdotes, createAnecdotes, vote}