import { useEffect } from 'react'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

import {
  Routes,
  Route,
  // Link
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { initializeUserList } from './reducers/userListReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserList())
  }, [dispatch])

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}
      {user && <BlogList />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  )
}

export default App
