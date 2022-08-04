import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import timeoutIdReducer from "./reducers/timeoutIdReducer";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer,
        timeoutId: timeoutIdReducer
    }
})

export default store