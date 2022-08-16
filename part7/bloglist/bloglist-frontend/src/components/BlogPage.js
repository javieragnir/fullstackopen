import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const BlogPage = ({ blog }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateLikes = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const deleteSelf = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      dispatch(deleteBlog(blog))
    }
    navigate('/blogs')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div><a href={`//${blog.url}`}>{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <button onClick={updateLikes} className="likeButton">
            like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <p><button onClick={deleteSelf}>delete</button></p>
    </div>
  )
}

export default BlogPage