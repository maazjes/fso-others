import anecdoteService from '../services/anecdote'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

// eslint-disable-next-line no-unused-vars
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialAnecdotes = anecdotesAtStart.map(asObject)
const reducer = (state = anecdotesAtStart, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote) => (anecdote.id === action.data.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote))
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'SET_ANECDOTES':
      return action.data
    default:
      return state
  }
}

const vote = (id) => ({
  type: 'VOTE',
  data: { id }
})

const createAnecdote = (content) => ({
  type: 'NEW_ANECDOTE',
  data: content
})

const setAnecdotes = (content) => ({
  type: 'SET_ANECDOTES',
  data: content
})

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote({ content, votes: 0 })
    dispatch(createAnecdote(newAnecdote))
  }
}

const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(vote(anecdote.id))
  }
}

export default reducer
export { vote, createAnecdote, setAnecdotes, initializeAnecdotes, createNewAnecdote, voteAnecdote }
