import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const changedAnecdote = action.payload
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id === id ? changedAnecdote : anecdote
      )
      .sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const intializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteOn = anecdote => {
  return async dispatch => {
    const id = anecdote.id
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const newAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer