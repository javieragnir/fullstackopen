import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { setSuccessNotification, setErrorNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, initializeUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setSuccessNotification('logged in successfully', 5))
    } catch (exception) {
      dispatch(setErrorNotification('wrong username or password', 5))
    }
  }

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
        <h2>log in to application</h2>
        <form className="loginForm" onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="loginButton" type="submit">
            login
          </button>
        </form>
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
