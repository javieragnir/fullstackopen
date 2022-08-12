import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { setUser } from '../reducers/userReducer'

const BlogList = () => {
  const [formVisible, setFormVisible] = useState(false)

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }

  return (
    <div>
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

export default BlogList

