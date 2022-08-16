import { useEffect } from 'react'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

import {
  Routes,
  Route,
  // Link,
  useMatch
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Header from './components/Header'
import { initializeUserList } from './reducers/userListReducer'
import User from './components/User'

const App = () => {
  const user = useSelector(state => state.user)
  const userList = useSelector(state => state.userList)
  const blogs = useSelector(state => state.blogs)
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

  const userMatch = useMatch('/users/:id')
  const userToView = userMatch
    ? userList.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === Number(blogMatch.params.id))
    : null

  return (
    <div>
      <Notification />
      {user && <Header />}

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users/:id" element={<User user={userToView} />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  )
}

export default App
