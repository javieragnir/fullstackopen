import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, initializeUser } from './reducers/userReducer'

/* import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom' */
import LoginForm from './components/LoginForm'

const App = () => {
  const [formVisible, setFormVisible] = useState(false)

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
      <h2>create new</h2>

      <Togglable
        buttonLabel="add blog"
        visible={formVisible}
        toggleVisibility={toggleVisibility}
      >
        <BlogForm />
      </Togglable>
    </div>
  )
}

export default App
