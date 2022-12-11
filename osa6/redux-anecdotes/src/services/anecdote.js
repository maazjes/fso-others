import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

const createAnecdote = async (data) => {
    const response = await axios.post(baseUrl, data)
    return response.data
}

const update = async (id, content) => {
    const response = await axios.put(`${baseUrl}/${id}`, content)
    return response.data
}

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}
export default { getAll, createAnecdote, update, getById }