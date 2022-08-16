import { useState } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const [formVisible, setFormVisible] = useState(false)

  const blogs = useSelector(state => state.blogs)

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  return (
    <div>
      <h2>blogs</h2>
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

