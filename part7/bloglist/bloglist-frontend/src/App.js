import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { useSelector, useDispatch } from 'react-redux'
import { setSuccessNotification, setErrorNotification } from './reducers/notificationReducer'

const Notification = () => {
  const { message, status } = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return <div className={status}>{message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        toggleVisibility()
        setBlogs(blogs.concat(returnedBlog))
        dispatch(setSuccessNotification('new blog added', 5))
      })
      .catch(() => {
        dispatch(setErrorNotification('error adding blog', 5))
      })
  }

  const updateLikes = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnedBlog) => {
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : returnedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
    })
  }

  const deleteBlog = (id) => {
    blogService.deleteBlog(id).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id))
    })
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
          updateBlog={updateLikes}
          deleteBlog={deleteBlog}
        />
      ))}
      <h2>create new</h2>

      <Togglable
        buttonLabel="add blog"
        visible={formVisible}
        toggleVisibility={toggleVisibility}
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )
}

export default App
