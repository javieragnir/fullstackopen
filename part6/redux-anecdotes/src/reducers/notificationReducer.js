import { createSlice } from '@reduxjs/toolkit'

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
    return async dispatch => {
        const timeout = seconds * 1000
        dispatch(addNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }
}

export default notificationSlice.reducer