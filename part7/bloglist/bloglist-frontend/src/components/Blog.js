import { useState } from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const dispatch = useDispatch()

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleBlogVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updateLikes = () => {
    console.log('blog id is', blog.id)
    dispatch(likeBlog(blog))
  }

  const deleteSelf = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button
        className="viewButton"
        onClick={toggleBlogVisibility}
        style={hideWhenVisible}
      >
        view
      </button>
      <button
        className="hideButton"
        onClick={toggleBlogVisibility}
        style={showWhenVisible}
      >
        hide
      </button>
      <div style={showWhenVisible} className="togglableContent">
        <div className="url">{blog.url}</div>
        <div className="likes">
          likes {blog.likes}{' '}
          <button onClick={updateLikes} className="likeButton">
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
      </div>
      <button onClick={deleteSelf}>delete</button>
    </div>
  )
}

export default Blog
