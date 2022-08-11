import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import timeoutIdReducer from './reducers/timeoutIdReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    timeoutId: timeoutIdReducer
  }
})

export default store