import { createSlice } from "@reduxjs/toolkit";

const timeoutIdSlice = createSlice({
    name: 'timeoutId',
    initialState: null,
    reducers: {
        setTimeoutId(state, action) {
            if(state) {
                clearTimeout(state)
            }
            return action.payload
        }
    }
})

export const { setTimeoutId } = timeoutIdSlice.actions

export default timeoutIdSlice.reducer