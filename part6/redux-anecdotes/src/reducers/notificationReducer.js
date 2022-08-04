import { createSlice } from '@reduxjs/toolkit'
import { setTimeoutId } from './timeoutIdReducer'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return dispatch => {
        const timeout = seconds * 1000
        dispatch(addNotification(message))
        const newTimeoutId = setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
        dispatch(setTimeoutId(newTimeoutId))
    }
}

export default notificationSlice.reducer