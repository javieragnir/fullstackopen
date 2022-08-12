import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import timeoutIdReducer from './reducers/timeoutIdReducer'
import userListReducer from './reducers/userListReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    timeoutId: timeoutIdReducer,
    user: userReducer,
    userList: userListReducer
  }
})

export default store