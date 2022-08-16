import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

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

  const onSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (comment) {
      dispatch(addComment(comment, blog))
      event.target.comment.value = ''
    }
  }

  const randomId = () => {
    return Math.random()*1000000
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div><a href={`//${blog.url}`}>{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <Button variant="primary" onClick={updateLikes} className="likeButton">
            like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      <p><Button variant="danger" onClick={deleteSelf}>delete blog</Button></p>
      <h3>comments</h3>
      <form onSubmit={onSubmit}>
        <input name="comment" />
        <Button variant="primary" type="submit">add comment</Button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={randomId()}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage