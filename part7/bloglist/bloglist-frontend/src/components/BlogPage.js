import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogPage = ({ blog }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

  const updateLikes = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
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
    </div>
  )
}

export default BlogPage