import { createSlice } from '@reduxjs/toolkit'
import { setTimeoutId } from './timeoutIdReducer'

const initialState = {
  messsage: '',
  status: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addSuccessNotification(state, action) {
      return {
        message: action.payload,
        status: 'success'
      }
    },
    addErrorNotification(state, action) {
      return {
        message: action.payload,
        status: 'error'
      }
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

export const { addSuccessNotification, addErrorNotification, clearNotification } = notificationSlice.actions

export const setSuccessNotification = (message, seconds) => {
  return dispatch => {
    const timeout = seconds * 1000
    dispatch(addSuccessNotification(message))
    const newTimeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
    dispatch(setTimeoutId(newTimeoutId))
  }
}

export const setErrorNotification = (message, seconds) => {
  return dispatch => {
    const timeout = seconds * 1000
    dispatch(addErrorNotification(message))
    const newTimeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
    dispatch(setTimeoutId(newTimeoutId))
  }
}

export default notificationSlice.reducer